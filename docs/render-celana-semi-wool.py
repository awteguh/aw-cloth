"""Render product images for 'Celana Pendek Semi Wool' (navy herringbone).

Output:
  public/images/celana-semi-wool-v3.jpg        -> 1200x1500 (4:5) flat-lay of shorts
  public/images/celana-semi-wool-kain-v3.jpg   -> 1200x1500 (4:5) fabric close-up
"""
import math
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageChops

OUT_DIR = r"D:\Project\Aw Cloth\public\images"
W, H = 1200, 1500
rng = np.random.default_rng(7)


# ----------------------------------------------------------------- texture
def herringbone(w, h, scale=1.0):
    """Navy herringbone with heathered light-grey twill lines (like the ref)."""
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    col_w = 60 * scale           # width of each chevron column
    col = np.floor(x / col_w)
    xin = x - col * col_w
    # alternate diagonal direction each column
    d = np.where(col % 2 == 0, xin + y, xin - y)
    pitch = 6.0 * scale          # twill line pitch
    line = (np.sin(d / pitch * 2 * math.pi) * 0.5 + 0.5)   # 0..1
    line = np.clip((line - 0.30) / 0.55, 0, 1) ** 1.1        # heathered twill lines

    # yarn heather: multiplicative noise + per-line brightness variation
    noise = rng.normal(0, 1, (h, w)).astype(np.float32)
    noise = np.asarray(Image.fromarray(((noise * 40) + 128).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)), np.float32)
    noise = (noise - 128) / 40
    slub = rng.normal(0, 1, (h, w)).astype(np.float32)
    slub = np.asarray(Image.fromarray(((slub * 40) + 128).clip(0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(6)), np.float32)
    slub = (slub - 128) / 40

    # column seam: slight dark line where the chevrons meet
    seam = np.exp(-((xin - 0) ** 2) / (2 * (1.2 * scale) ** 2))

    base = np.array([38, 47, 66], np.float32)      # navy
    light = np.array([168, 176, 190], np.float32)  # heathered grey-blue
    # fibre-level speckle so lines break up like melange yarn
    fibre = rng.random((h, w)).astype(np.float32)
    fibre = np.asarray(Image.fromarray((fibre * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.5)), np.float32) / 255
    mix = line * (0.35 + 0.65 * np.clip(noise * 0.6 + 0.5, 0, 1)) * (0.75 + 0.25 * slub) * (0.55 + 0.6 * fibre)
    mix = np.clip(mix, 0, 1)[..., None]
    img = base * (1 - mix) + light * mix
    img *= (1 + 0.10 * noise)[..., None]
    img *= (1 - 0.22 * seam)[..., None]
    return np.clip(img, 0, 255).astype(np.uint8)


def texture_image(w, h, scale=1.0, angle=0.0):
    big = int(math.hypot(w, h)) + 20
    tex = Image.fromarray(herringbone(big, big, scale))
    tex = tex.rotate(angle, resample=Image.BICUBIC)
    l = (big - w) // 2
    t = (big - h) // 2
    return tex.crop((l, t, l + w, t + h))


# ----------------------------------------------------------------- helpers
def bg_studio(w, h):
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    cx, cy = w * 0.5, h * 0.42
    r = np.sqrt(((x - cx) / w) ** 2 + ((y - cy) / h) ** 2)
    v = 244 - 26 * np.clip(r * 1.5, 0, 1) ** 1.4
    col = np.stack([v + 1, v, v - 3], -1)
    n = rng.normal(0, 1.2, (h, w, 1))
    return Image.fromarray(np.clip(col + n, 0, 255).astype(np.uint8))


def soft_mask(polys, w, h, blur=1.2):
    m = Image.new("L", (w * 2, h * 2), 0)
    d = ImageDraw.Draw(m)
    for p in polys:
        d.polygon([(px * 2, py * 2) for px, py in p], fill=255)
    m = m.resize((w, h), Image.LANCZOS)
    return m.filter(ImageFilter.GaussianBlur(blur))


def shade_layer(mask, w, h):
    """Fabric shading: soft folds + edge darkening, returns float multiplier."""
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    # gentle vertical folds
    folds = 0.06 * np.sin(x / 95.0 + 0.6 * np.sin(y / 180.0)) * np.sin(y / 260.0 + 1.0)
    folds += 0.03 * np.sin(x / 33.0 + y / 400.0)
    # large light from top-left
    light = 1.0 + 0.10 * ((-(x - w * 0.35) / w) - (y - h * 0.3) / h)
    # edge darkening (ambient occlusion) from mask distance
    m = np.asarray(mask, np.float32) / 255
    inner = np.asarray(mask.filter(ImageFilter.GaussianBlur(18)), np.float32) / 255
    ao = 1.0 - 0.28 * np.clip(1 - inner, 0, 1) * m
    return np.clip((1 + folds) * light * ao, 0.5, 1.3)


def stitch(draw, pts, color=(78, 90, 114), width=2, dash=7, gap=6):
    """Dashed stitch line through points."""
    for (x1, y1), (x2, y2) in zip(pts[:-1], pts[1:]):
        L = math.hypot(x2 - x1, y2 - y1)
        if L == 0:
            continue
        ux, uy = (x2 - x1) / L, (y2 - y1) / L
        s = 0.0
        while s < L:
            e = min(s + dash, L)
            draw.line([(x1 + ux * s, y1 + uy * s), (x1 + ux * e, y1 + uy * e)], fill=color, width=width)
            s += dash + gap


def seam(draw, pts, width=3, shadow=(20, 26, 40), hi=(70, 80, 100)):
    draw.line(pts, fill=shadow, width=width + 2)
    draw.line([(x, y - 1) for x, y in pts], fill=hi, width=1)


# ----------------------------------------------------------------- shorts
def render_shorts():
    canvas = bg_studio(W, H)

    # geometry: relaxed straight-leg shorts, front flat-lay
    top = 330
    band_h = 64
    waist_l, waist_r = 330, 870
    hip_y = 560
    hip_l, hip_r = 312, 888
    crotch_y = 760
    hem_y = 1090
    cx = 600
    gap = 22
    leg_l_out = (338, hem_y)
    leg_l_in = (cx - gap, hem_y)
    leg_r_out = (862, hem_y)
    leg_r_in = (cx + gap, hem_y)

    left_leg = [
        (waist_l, top), (cx, top), (cx, crotch_y - 40),
        (cx - 6, crotch_y), leg_l_in, leg_l_out,
        (hip_l, hip_y),
    ]
    right_leg = [
        (cx, top), (waist_r, top), (hip_r, hip_y), leg_r_out,
        leg_r_in, (cx + 6, crotch_y), (cx, crotch_y - 40),
    ]
    # extended waistband tab (overlaps to the left of centre, like the reference)
    tab_w = 58
    tab = [(cx - tab_w, top), (cx + 4, top), (cx + 4, top + band_h), (cx - tab_w + 8, top + band_h)]
    body_mask = soft_mask([left_leg, right_leg], W, H)

    # drop shadow
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sh = body_mask.filter(ImageFilter.GaussianBlur(28))
    shadow.putalpha(ImageChops.multiply(sh, Image.new("L", (W, H), 110)))
    shadow = ImageChops.offset(shadow, 14, 26)
    canvas = Image.alpha_composite(canvas.convert("RGBA"), shadow).convert("RGB")

    # fabric panels, slight different weave angle per leg
    tex = texture_image(W, H, scale=1.0, angle=0)
    tex_r = texture_image(W, H, scale=1.0, angle=2.5)
    left_mask = soft_mask([left_leg], W, H)
    fabric = Image.composite(tex, tex_r, left_mask)

    # shading (a bit more rumpled than a pressed garment)
    shade = shade_layer(body_mask, W, H)
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    rumple = 1 + 0.05 * np.sin(x / 70.0 + np.sin(y / 120.0) * 1.5) * np.sin(y / 150.0 + x / 300.0)
    fab = np.asarray(fabric, np.float32) * (shade * rumple)[..., None]
    fabric = Image.fromarray(np.clip(fab, 0, 255).astype(np.uint8))

    # waistband: separate band with horizontal weave, slightly darker
    band_tex = texture_image(W, band_h + 4, scale=0.8, angle=90)
    band_tex = Image.fromarray((np.asarray(band_tex, np.float32) * 0.92).astype(np.uint8))
    band = Image.new("RGB", (W, H))
    band.paste(fabric)
    band.paste(band_tex, (0, top))
    band_mask = soft_mask([[(waist_l - 2, top), (waist_r + 2, top), (waist_r - 2, top + band_h), (waist_l + 2, top + band_h)]], W, H)
    fabric = Image.composite(band, fabric, band_mask)

    detail = fabric.copy()
    d = ImageDraw.Draw(detail)

    # waistband edge stitching
    stitch(d, [(waist_l + 12, top + 9), (waist_r - 12, top + 9)])
    stitch(d, [(waist_l + 10, top + band_h - 8), (waist_r - 10, top + band_h - 8)])
    # waistband seam to body
    seam(d, [(waist_l + 2, top + band_h), (waist_r - 2, top + band_h)], width=2)

    # side seams with straight side-seam pockets
    seam(d, [(waist_l, top + band_h), (hip_l, hip_y), leg_l_out])
    seam(d, [(waist_r, top + band_h), (hip_r, hip_y), leg_r_out])
    for sgn, wx, hx in ((1, waist_l, hip_l), (-1, waist_r, hip_r)):
        # pocket opening runs along the side seam from just under the band to hip
        p0 = (wx + sgn * 2, top + band_h + 26)
        p1 = (hx + sgn * 8, hip_y + 10)
        d.line([p0, p1], fill=(18, 24, 36), width=5)
        stitch(d, [(p0[0] + sgn * 12, p0[1]), (p1[0] + sgn * 12, p1[1])])
        for q in (p0, p1):   # bartacks
            d.line([(q[0], q[1] - 1), (q[0] + sgn * 16, q[1] - 1)], fill=(78, 90, 114), width=4)

    # inseams
    seam(d, [(cx - 6, crotch_y), leg_l_in])
    seam(d, [(cx + 6, crotch_y), leg_r_in])
    # hem stitching
    stitch(d, [(leg_l_out[0] + 6, hem_y - 28), (leg_l_in[0] - 4, hem_y - 28)])
    stitch(d, [(leg_r_in[0] + 4, hem_y - 28), (leg_r_out[0] - 6, hem_y - 28)])

    # centre front seam below fly, and J-shaped fly topstitch
    fly_len = 150
    seam(d, [(cx, top + band_h + fly_len - 10), (cx, crotch_y - 40)])
    seam(d, [(cx, top + band_h), (cx, top + band_h + fly_len)], width=2)
    j = []
    for i in range(0, fly_len - 20, 6):
        j.append((cx - 34, top + band_h + 4 + i))
    for t in range(0, 11):   # curve into the centre seam
        a = math.pi / 2 * t / 10
        j.append((cx - 34 + 34 * (1 - math.cos(a)), top + band_h + fly_len - 20 + 34 * math.sin(a) - 12))
    stitch(d, j, color=(78, 90, 114))
    # inner placket edge peeking (like the reference photo)
    d.line([(cx + 2, top + band_h + 2), (cx + 2, top + band_h + fly_len - 30)], fill=(70, 80, 100), width=1)

    # extended waistband tab with button
    tab_tex = Image.new("RGB", (W, H))
    tab_tex.paste(Image.fromarray((np.asarray(texture_image(W, band_h + 4, scale=0.8, angle=90), np.float32) * 0.96).astype(np.uint8)), (0, top))
    tab_mask = soft_mask([tab], W, H, blur=0.8)
    detail = Image.composite(tab_tex, detail, tab_mask)
    d = ImageDraw.Draw(detail)
    d.line([(cx - tab_w, top + 1), (cx - tab_w + 8, top + band_h - 1)], fill=(22, 28, 42), width=3)
    d.line([(cx - tab_w + 2, top + 1), (cx - tab_w + 10, top + band_h - 1)], fill=(80, 90, 110), width=1)
    stitch(d, [(cx - tab_w + 10, top + 9), (cx + 0, top + 9)])
    stitch(d, [(cx - tab_w + 12, top + band_h - 8), (cx, top + band_h - 8)])
    stitch(d, [(cx - tab_w + 10, top + 9), (cx - tab_w + 14, top + band_h - 8)])
    bx, by = cx - tab_w + 34, top + band_h // 2
    d.ellipse([bx - 13, by - 13, bx + 13, by + 13], fill=(26, 28, 32), outline=(95, 97, 100))
    d.ellipse([bx - 8, by - 8, bx + 8, by + 8], outline=(70, 72, 76))
    for ox, oy in ((-4, -4), (4, -4), (-4, 4), (4, 4)):
        d.ellipse([bx + ox - 2, by + oy - 2, bx + ox + 2, by + oy + 2], fill=(110, 112, 116))

    # belt loops (front view: two beside the fly, one over each side seam, plus two mid)
    loop_w, loop_h = 18, band_h + 14
    loop_xs = [waist_l + 26, cx - 165, cx - 96, cx + 82, cx + 152, waist_r - 44]
    loop_tex = Image.fromarray((np.asarray(texture_image(loop_w, loop_h, scale=0.7, angle=0), np.float32) * 0.95).astype(np.uint8))
    for lx in loop_xs:
        ly = top - 7
        sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(sh).rectangle([lx - 3, ly + 2, lx + loop_w + 5, ly + loop_h + 4], fill=(0, 0, 0, 90))
        sh = sh.filter(ImageFilter.GaussianBlur(3))
        detail = Image.alpha_composite(detail.convert("RGBA"), sh).convert("RGB")
        detail.paste(loop_tex, (lx, ly))
        d = ImageDraw.Draw(detail)
        d.rectangle([lx, ly, lx + loop_w, ly + loop_h], outline=(22, 28, 42), width=1)
        d.line([(lx + 1, ly + 1), (lx + loop_w - 1, ly + 1)], fill=(90, 100, 120), width=1)
        d.line([(lx + 3, ly + 8), (lx + loop_w - 3, ly + 8)], fill=(78, 90, 114), width=3)
        d.line([(lx + 3, ly + loop_h - 8), (lx + loop_w - 3, ly + loop_h - 8)], fill=(78, 90, 114), width=3)

    # brand label on waistband (small woven tag), right of centre
    lx, ly = cx + 172, top + 15
    d.rounded_rectangle([lx, ly, lx + 84, ly + 34], radius=3, fill=(245, 243, 238), outline=(200, 195, 185))
    d.text((lx + 12, ly + 9), "AW", fill=(255, 92, 0))
    d.text((lx + 36, ly + 9), "CLOTH", fill=(20, 20, 20))

    fabric = detail
    loops_mask = soft_mask([[(lx2, top - 7), (lx2 + loop_w, top - 7), (lx2 + loop_w, top + 2), (lx2, top + 2)] for lx2 in loop_xs], W, H, blur=0.6)
    full_mask = ImageChops.lighter(body_mask, loops_mask)
    out = Image.composite(fabric, canvas, full_mask)

    # subtle vignette
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    v = 1 - 0.18 * np.clip(np.sqrt(((x - W / 2) / W) ** 2 + ((y - H / 2) / H) ** 2) * 1.6, 0, 1) ** 2
    out = Image.fromarray(np.clip(np.asarray(out, np.float32) * v[..., None], 0, 255).astype(np.uint8))
    return out


# ----------------------------------------------------------------- fabric close-up
def render_fabric():
    # large-scale weave, slightly rotated, with a soft draped fold and lighting
    tex = texture_image(W, H, scale=1.7, angle=-12)
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    fold = 1 + 0.16 * np.sin((x * 0.6 + y) / 260.0) - 0.08 * np.cos((x - y * 0.4) / 420.0)
    light = 1.32 + 0.22 * (-(x - W * 0.3) / W - (y - H * 0.2) / H)
    edge = 1 - 0.25 * np.clip(np.sqrt(((x - W / 2) / W) ** 2 + ((y - H / 2) / H) ** 2) * 1.5, 0, 1) ** 2
    arr = np.asarray(tex, np.float32) * (fold * light * edge)[..., None]
    img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    # shallow depth of field: blur toward bottom-right
    blurred = img.filter(ImageFilter.GaussianBlur(3.5))
    dof = np.clip(((x / W) + (y / H) - 0.9) / 0.9, 0, 1)
    dof_mask = Image.fromarray((dof * 255).astype(np.uint8))
    return Image.composite(blurred, img, dof_mask)


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    render_shorts().save(os.path.join(OUT_DIR, "celana-semi-wool-v3.jpg"), quality=86, optimize=True, progressive=True)
    render_fabric().save(os.path.join(OUT_DIR, "celana-semi-wool-kain-v3.jpg"), quality=86, optimize=True, progressive=True)
    print("done")
