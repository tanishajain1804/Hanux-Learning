import sys
import subprocess
import os

def install_and_import(package, pip_name=None):
    if pip_name is None:
        pip_name = package
    try:
        __import__(package)
    except ImportError:
        print(f"Installing {pip_name}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", pip_name])

install_and_import("PIL", "Pillow")
install_and_import("cv2", "opencv-python-headless")

import cv2
from PIL import Image

video_path = r"C:\Users\user\Videos\Captures\Clay _ Build systems to grow revenue - Google Chrome 2026-06-25 12-15-50.mp4"
output_dir = r"C:\Users\user\.gemini\antigravity\scratch\hanux-tech\public\images"

os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error opening video file")
    sys.exit(1)

fps = cap.get(cv2.CAP_PROP_FPS)
# Duration of each frame in milliseconds
frame_duration = int(1000 / fps)

segments = [
    ("discovery_showcase", 270, 360),     # Blue Radar (Discovery)
    ("design_showcase", 650, 715),        # Beige Monitor (Design / Agents)
    ("engineering_showcase", 360, 420),   # Green Cube (Engineering / Orchestrate)
    ("launch_showcase", 460, 540)         # Pink Balance Scale (Launch / Execution)
]

for name, start, end in segments:
    print(f"Processing {name} from frame {start} to {end}...")
    frames_pil = []
    
    for f in range(start, end + 1):
        cap.set(cv2.CAP_PROP_POS_FRAMES, f)
        ret, frame = cap.read()
        if ret:
            # Crop the card graphic region: y: 250->830, x: 980->1820
            crop = frame[250:830, 980:1820]
            # Convert BGR (OpenCV) to RGB (PIL)
            crop_rgb = cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)
            pil_img = Image.fromarray(crop_rgb)
            frames_pil.append(pil_img)
        else:
            print(f"Failed to read frame {f} for {name}")
            break
            
    if frames_pil:
        out_webp_path = os.path.join(output_dir, f"{name}.webp")
        # Save as animated WebP
        frames_pil[0].save(
            out_webp_path,
            save_all=True,
            append_images=frames_pil[1:],
            duration=frame_duration,
            loop=0,
            quality=85,
            method=4
        )
        print(f"Saved animated WebP to {out_webp_path}, frames count: {len(frames_pil)}")
        
        # GIF generation removed to optimize speed and quality (WebP is high-quality 24-bit)

cap.release()
print("All segments processed successfully!")
