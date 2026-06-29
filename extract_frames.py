import sys
import subprocess
import os

def install_and_import(package):
    try:
        __import__(package)
    except ImportError:
        print(f"Installing {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

# Ensure opencv-python is installed
install_and_import("cv2")

import cv2

video_path = r"C:\Users\user\Videos\Captures\Jellyfish_ Software Engineering Intelligence Platform - Google Chrome 2026-06-24 10-53-17.mp4"
output_dir = r"C:\Users\user\.gemini\antigravity\scratch\hanux-tech"

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error opening video file")
    sys.exit(1)

total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
fps = cap.get(cv2.CAP_PROP_FPS)
duration = total_frames / fps
print(f"Total frames: {total_frames}, FPS: {fps}, Duration: {duration}s")

# Extract 5 frames spaced evenly (e.g., at 10%, 30%, 50%, 70%, 90% of duration)
for i, percent in enumerate([0.1, 0.3, 0.5, 0.7, 0.9]):
    frame_no = int(total_frames * percent)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_no)
    ret, frame = cap.read()
    if ret:
        out_path = os.path.join(output_dir, f"frame_{i}.jpg")
        cv2.imwrite(out_path, frame)
        print(f"Saved frame {i} at {percent*100}% to {out_path}")
    else:
        print(f"Failed to extract frame at {percent*100}%")

cap.release()
print("Done!")
