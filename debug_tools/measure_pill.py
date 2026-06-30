import cv2
import numpy as np
import os

output_dir = r"C:\Users\user\.gemini\antigravity\scratch\hanux-tech"

for i in [0, 2, 4]:
    img_path = os.path.join(output_dir, f"frame_{i}.jpg")
    img = cv2.imread(img_path)
    if img is not None:
        # Crop from y=120 to y=230, full width
        h, w, _ = img.shape
        crop = img[120:230, 0:w]
        crop_path = os.path.join(output_dir, f"pill_full_{i}.jpg")
        cv2.imwrite(crop_path, crop)
        print(f"Saved full width pill for frame {i}")
    else:
        print(f"Could not load {img_path}")
