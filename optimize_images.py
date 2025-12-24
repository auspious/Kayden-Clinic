from PIL import Image
import os
import sys

def optimize_image(path, max_width=1920):
    try:
        if not os.path.exists(path):
            print(f"File not found: {path}")
            return

        print(f"resizing and optimizing {path}...")
        img = Image.open(path)
        
        # Convert to RGB if necessary (e.g. for PNGs being saved as JPG)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        width, height = img.size
        
        # Resize if too huge
        if width > max_width:
            ratio = max_width / width
            new_height = int(height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            print(f"Resized from {width}x{height} to {max_width}x{new_height}")
            
        # Save back with optimization
        img.save(path, "JPEG", quality=80, optimize=True)
        print(f"Saved optimized {path}")
        
    except Exception as e:
        print(f"Error optimizing {path}: {e}")

if __name__ == "__main__":
    base_dir = r"c:\Users\user\Desktop\site\images"
    images_to_fix = [
        "Mugabe.jpg",
        "Makanaka.jpg",
        "Kayden.jpg",
        "reception.jpg"
    ]
    
    for img_name in images_to_fix:
        full_path = os.path.join(base_dir, img_name)
        optimize_image(full_path)
