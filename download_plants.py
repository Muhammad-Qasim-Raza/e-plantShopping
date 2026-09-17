#!/usr/bin/env python3
"""
Downloads 18 real plant photos from Unsplash into ./src/assets/

SETUP (5 minutes, free):
  1. Go to https://unsplash.com/developers  -> "Register as a developer"
  2. Create a "New Application" (accept the terms, any name/description works)
  3. Copy your "Access Key"
  4. Set it as an env var:
       PowerShell:  $env:UNSPLASH_KEY="your_key"
       bash/mac:    export UNSPLASH_KEY=your_key

RUN:
  pip install requests
  python download_plants.py

Files land in src/assets/ with the exact names your project expects.
Unsplash images are free to use commercially (attribution appreciated, not required).
"""

import os
import sys
import time

try:
    import requests
except ImportError:
    sys.exit("requests not installed. Run: pip install requests")

ACCESS_KEY = os.environ.get("UNSPLASH_KEY", "PASTE_YOUR_ACCESS_KEY_HERE")

OUT_DIR = os.path.join("src", "assets")

# filename (without .jpg) -> list of queries to try, in order, until one works
PLANTS = {
    "monstera":          ["monstera deliciosa houseplant"],
    "bird-of-paradise":  ["strelitzia bird of paradise plant"],
    "calathea":          ["calathea plant leaves"],
    "alocasia":          ["alocasia plant"],
    "fiddle-leaf":       ["fiddle leaf fig ficus lyrata"],
    "rubber-plant":      ["ficus elastica rubber plant"],
    "snake-plant":       ["sansevieria snake plant"],
    "zz-plant":          ["zamioculcas zz plant"],
    "pothos":            ["pothos epipremnum plant"],
    "peace-lily":        ["spathiphyllum peace lily plant"],
    "chinese-evergreen": ["chinese evergreen plant", "aglaonema plant", "houseplant leaves green"],
    "cast-iron":         ["cast iron plant", "aspidistra plant", "houseplant dark green leaves"],
    "peperomia":         ["peperomia plant", "peperomia houseplant", "succulent houseplant"],
    "string-of-hearts":  ["string of hearts plant"],
    "chinese-money":     ["chinese money plant", "pilea peperomioides", "round leaf houseplant"],
    "hoya":              ["hoya plant leaves"],
    "prayer-plant":      ["prayer plant", "maranta plant", "calathea leaves pattern"],
    "boston-fern":       ["boston fern", "fern plant leaves", "green fern houseplant"],
}


def search_photo(query):
    """Return (image_url, credit) for the best match, or (None, None)."""
    r = requests.get(
        "https://api.unsplash.com/search/photos",
        params={
            "query": query,
            "per_page": 1,
            "orientation": "squarish",
            "content_filter": "high",
        },
        headers={"Authorization": f"Client-ID {ACCESS_KEY}"},
        timeout=30,
    )
    if r.status_code == 401:
        sys.exit("Invalid Access Key. Check ACCESS_KEY / UNSPLASH_KEY.")
    if r.status_code == 403:
        sys.exit("Rate limit hit (50 req/hour on demo apps). Wait an hour and re-run.")
    r.raise_for_status()

    results = r.json().get("results", [])
    if not results:
        return None, None
    photo = results[0]
    url = photo["urls"]["raw"] + "&w=800&q=80&fm=jpg&fit=crop"
    credit = f'{photo["user"]["name"]} (@{photo["user"]["username"]})'
    return url, credit


def main():
    if ACCESS_KEY == "PASTE_YOUR_ACCESS_KEY_HERE":
        sys.exit(
            "No Access Key set.\n"
            "Get one free at https://unsplash.com/developers, then either\n"
            "  - PowerShell: $env:UNSPLASH_KEY=\"your_key\"\n"
            "  - bash/mac:   export UNSPLASH_KEY=your_key"
        )

    os.makedirs(OUT_DIR, exist_ok=True)
    credits = []
    failed = []

    for i, (name, queries) in enumerate(PLANTS.items(), 1):
        dest = os.path.join(OUT_DIR, f"{name}.jpg")
        if os.path.exists(dest):
            print(f"[{i:2}/18] {name}.jpg already exists, skipping")
            continue

        print(f"[{i:2}/18] {name} ... ", end="", flush=True)
        saved = False
        for q in queries:
            try:
                url, credit = search_photo(q)
                if not url:
                    continue

                img = requests.get(url, timeout=60)
                img.raise_for_status()
                with open(dest, "wb") as f:
                    f.write(img.content)

                size_kb = len(img.content) // 1024
                print(f"saved ({size_kb} KB) [query: {q}]")
                credits.append(f"{name}.jpg - {credit}")
                saved = True
                break
            except Exception as e:
                print(f"error on '{q}': {e} ... trying next")
                time.sleep(1)

        if not saved:
            print("no result after all fallback queries")
            failed.append(name)

        time.sleep(1)  # be polite to the API

    if credits:
        # utf-8 encoding is required on Windows: photographer names can contain
        # accented characters that the default cp1252 codec can't write.
        with open(os.path.join(OUT_DIR, "CREDITS.txt"), "a", encoding="utf-8") as f:
            f.write("Photos from Unsplash (unsplash.com/license)\n\n")
            f.write("\n".join(credits) + "\n")
        print(f"\nCredits appended to {OUT_DIR}/CREDITS.txt")

    print(f"\nDone. {len(credits)} downloaded, {len(failed)} failed.")
    if failed:
        print("Still missing:", ", ".join(failed))
        print("Grab those manually from unsplash.com and save with the exact filename.")


if __name__ == "__main__":
    main()
