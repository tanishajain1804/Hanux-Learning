import cv2
import os

output_dir = r"C:\Users\user\.gemini\antigravity\scratch\hanux-tech"

for i in range(5):
    img_path = os.path.join(output_dir, f"frame_{i}.jpg")
    img = cv2.imread(img_path)
    if img is not None:
        # Crop from y=85 (start of viewport) to y=300 (height of 215px)
        h, w, _ = img.shape
        crop = img[85:300, 0:w]
        crop_path = os.path.join(output_dir, f"crop_{i}.jpg")
        cv2.imwrite(crop_path, crop)
        print(f"Cropped page top of frame {i} and saved to {crop_path}")
    else:
        print(f"Could not load {img_path}")
