from PIL import Image, ImageDraw
import os, random, math

# ── CONFIG ────────────────────────────────────────────────
IMAGE_FOLDER  = "emoticons/"          # folder with your PNGs/JPGs
OUTPUT_FILE   = "output.png"
BG_COLOR      = "#1a1a2e"            # your custom background hex
CIRCLE_COLORS = [
    "#FF4C6E", "#FFD600", "#00C2FF",
    "#7B2FFF", "#FF6B35", "#00E676",
]
COLS          = 8
ROWS          = 5
CELL_SIZE     = 110                  # px per grid slot
JITTER        = 10                   # max px position offset
ROTATION      = 8                    # max degrees of tilt
ICON_SCALE    = 0.75                 # icon size relative to circle
# ─────────────────────────────────────────────────────────

def load_images(folder):
    exts = {".png", ".jpg", ".jpeg", ".webp"}
    paths = [
        os.path.join(folder, f)
        for f in os.listdir(folder)
        if os.path.splitext(f)[1].lower() in exts
    ]
    if not paths:
        raise FileNotFoundError(f"No images found in '{folder}'")
    return [Image.open(p).convert("RGBA") for p in paths]

def make_circle(color_hex, size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.ellipse([0, 0, size - 1, size - 1], fill=color_hex)
    return img

def fit_icon(icon, diameter, scale):
    max_px = int(diameter * scale)
    icon.thumbnail((max_px, max_px), Image.LANCZOS)
    return icon

def paste_centered(base, layer, cx, cy):
    x = cx - layer.width  // 2
    y = cy - layer.height // 2
    base.paste(layer, (x, y), layer)

def main():
    icons = load_images(IMAGE_FOLDER)
    random.shuffle(icons)

    diameter = int(CELL_SIZE * 0.92)
    w = COLS * CELL_SIZE
    h = ROWS * CELL_SIZE
    canvas = Image.new("RGBA", (w, h), BG_COLOR)

    used = 0
    for row in range(ROWS):
        for col in range(COLS):
            cx = col * CELL_SIZE + CELL_SIZE // 2 + random.randint(-JITTER, JITTER)
            cy = row * CELL_SIZE + CELL_SIZE // 2 + random.randint(-JITTER, JITTER)
            angle = random.uniform(-ROTATION, ROTATION)
            color = random.choice(CIRCLE_COLORS)

            icon = icons[used % len(icons)].copy()
            used += 1

            circle = make_circle(color, diameter)

            # fit icon inside circle
            icon_sized = fit_icon(icon, diameter, ICON_SCALE)

            # composite icon onto circle
            ix = (diameter - icon_sized.width)  // 2
            iy = (diameter - icon_sized.height) // 2
            circle.paste(icon_sized, (ix, iy), icon_sized)

            # rotate the whole slot
            slot = circle.rotate(angle, expand=True, resample=Image.BICUBIC)
            paste_centered(canvas, slot, cx, cy)

    canvas.convert("RGB").save(OUTPUT_FILE, quality=95)
    print(f"Saved → {OUTPUT_FILE}  ({w}×{h}px)")

if __name__ == "__main__":
    main()