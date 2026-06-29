import cv2
import os

output_dir = r"C:\Users\user\.gemini\antigravity\scratch\hanux-tech"

for i in range(5):
    img_path = os.path.join(output_dir, f"frame_{i}.jpg")
    img = cv2.imread(img_path)
    if img is not None:
        # Crop the right part of the navbar: x from w-300 to w, y from 85 to 220
        h, w, _ = img.shape
        crop = img[85:220, w-350:w]
        crop_path = os.path.join(output_dir, f"crop_right_{i}.jpg")
        cv2.imwrite(crop_path, crop)
        print(f"Cropped right side of frame {i} and saved to {crop_path}")
    else:
        print(f"Could not load {img_path}")
