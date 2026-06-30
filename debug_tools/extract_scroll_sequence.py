import cv2
import os

video_path = r"C:\Users\user\Videos\Captures\Jellyfish_ Software Engineering Intelligence Platform - Google Chrome 2026-06-24 10-53-17.mp4"
output_dir = r"C:\Users\user\.gemini\antigravity\scratch\hanux-tech"

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error opening video file")
    sys.exit(1)

# Extract frames 0, 15, 30, 45, 60, 75, 90, 105, 120, 135 (0s to 4.5s)
for i, frame_idx in enumerate(range(0, 150, 15)):
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
    ret, frame = cap.read()
    if ret:
        h, w, _ = frame.shape
        # Crop page top area (to see navbar changes)
        crop = frame[85:300, 0:w]
        out_path = os.path.join(output_dir, f"scroll_{i}.jpg")
        cv2.imwrite(out_path, crop)
        print(f"Saved scroll frame {i} (frame index {frame_idx}) to {out_path}")
    else:
        print(f"Failed to load frame {frame_idx}")

cap.release()
print("Done!")
