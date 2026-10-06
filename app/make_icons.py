#!/usr/bin/env python3
"""Generates the PWA icons (no dependencies). Run: python3 make_icons.py"""
import zlib, struct, math

BG = (10, 14, 20); RED = (232, 52, 66); WHITE = (255, 255, 255)

def seg_dist(px, py, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    t = max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))

def render(size, scale):
    """scale = fraction of canvas the plus symbol spans (smaller for maskable safe zone)."""
    ss = 3
    N = size * ss
    half = 0.5
    arm_len = scale / 2          # half length of each plus arm from center
    arm_w = scale * 0.17         # half thickness
    r = arm_w * 0.55             # corner rounding
    line_w = scale * 0.028
    pts = [(-0.5, 0), (-0.26, 0), (-0.14, -0.20), (0.0, 0.26), (0.13, -0.08), (0.22, 0), (0.5, 0)]
    pts = [(half + x * scale, half + y * scale) for x, y in pts]
    rows = []
    for y in range(size):
        row = bytearray([0])
        for x in range(size):
            acc = [0, 0, 0]
            for sy in range(ss):
                for sx in range(ss):
                    px = (x * ss + sx + 0.5) / N
                    py = (y * ss + sy + 0.5) / N
                    col = BG
                    # rounded plus = union of two rounded rects
                    inside = False
                    for (hx, hy) in ((arm_len, arm_w), (arm_w, arm_len)):
                        qx = abs(px - half) - (hx - r)
                        qy = abs(py - half) - (hy - r)
                        d = math.hypot(max(qx, 0), max(qy, 0)) + min(max(qx, qy), 0) - r
                        if d <= 0:
                            inside = True
                    if inside:
                        col = RED
                        for i in range(len(pts) - 1):
                            if seg_dist(px, py, *pts[i], *pts[i + 1]) < line_w:
                                col = WHITE; break
                    acc[0] += col[0]; acc[1] += col[1]; acc[2] += col[2]
            n = ss * ss
            row += bytes((acc[0] // n, acc[1] // n, acc[2] // n))
        rows.append(bytes(row))
    return b''.join(rows)

def png(path, size, scale):
    raw = render(size, scale)
    def chunk(t, d):
        c = struct.pack('>I', len(d)) + t + d
        return c + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)
    data = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0)) + chunk(b'IDAT', zlib.compress(raw, 9)) + chunk(b'IEND', b'')
    open(path, 'wb').write(data)
    print('wrote', path)

png('icons/icon-192.png', 192, 0.78)
png('icons/icon-512.png', 512, 0.78)
png('icons/icon-maskable-512.png', 512, 0.56)   # symbol inside the 80% safe zone
png('icons/apple-touch-icon.png', 180, 0.72)
