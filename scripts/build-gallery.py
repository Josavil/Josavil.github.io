#!/usr/bin/env python3
import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
GALLERY_DIR = ROOT / "images" / "gallery"
SUPPORTED_EXTENSIONS = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"}


def main():
    sources = sorted(
        (
            path
            for path in GALLERY_DIR.iterdir()
            if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
        ),
        key=lambda path: path.name.casefold(),
    )
    stems = [path.stem.casefold() for path in sources]
    if len(stems) != len(set(stems)):
        raise SystemExit("Photo filenames must have unique names without their extensions.")

    optimized_dir = GALLERY_DIR / "optimized"
    thumbnails_dir = GALLERY_DIR / "thumbnails"
    optimized_dir.mkdir(parents=True, exist_ok=True)
    thumbnails_dir.mkdir(parents=True, exist_ok=True)

    photos = []
    for source in sources:
        output_name = f"{source.stem}.webp"
        optimized_path = optimized_dir / output_name
        thumbnail_path = thumbnails_dir / output_name
        subprocess.run(
            [
                "magick", str(source), "-auto-orient", "-strip", "-resize", "1800x1800>",
                "-quality", "78", "-define", "webp:method=6", str(optimized_path),
            ],
            check=True,
        )
        subprocess.run(
            [
                "magick", str(source), "-auto-orient", "-strip", "-thumbnail", "480x480^",
                "-gravity", "center", "-extent", "480x360", "-quality", "72",
                "-define", "webp:method=6", str(thumbnail_path),
            ],
            check=True,
        )
        title = source.stem.replace("-", " ").replace("_", " ")
        photos.append({
            "title": title,
            "image": f"images/gallery/optimized/{output_name}",
            "thumbnail": f"images/gallery/thumbnails/{output_name}",
        })

    manifest_path = GALLERY_DIR / "manifest.json"
    manifest_path.write_text(json.dumps(photos, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Built {len(photos)} gallery photo(s) and updated {manifest_path.relative_to(ROOT)}.")


if __name__ == "__main__":
    main()
