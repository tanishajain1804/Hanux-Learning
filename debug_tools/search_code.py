import os

filepath = r"C:\Users\user\.gemini\antigravity\scratch\hanux-tech\src"
for root, dirs, files in os.walk(filepath):
    for file in files:
        if file.endswith(".tsx"):
            fp = os.path.join(root, file)
            with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if 'id="about"' in content or "id='about'" in content:
                    print(f"Found id='about' in: {fp}")

