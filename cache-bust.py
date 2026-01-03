#!/usr/bin/env python3

import os
import re
import time
from pathlib import Path

# Generate cache-busting version (timestamp)
version = int(time.time())

# Find all HTML files in the current directory and subdirectories
html_files = list(Path('.').rglob('*.html'))

if not html_files:
    print("⚠️  No HTML files found in directory")
    exit(1)

print(f"Found {len(html_files)} HTML file(s)")
print(f"Using version: {version}\n")

# Process each HTML file
for file_path in html_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Update CSS links
        content = re.sub(
            r'(<link[^>]*href=["\'])([^"\'?]+\.css)(\?v=\d+)?(["\'][^>]*>)',
            rf'\1\2?v={version}\4',
            content,
            flags=re.IGNORECASE
        )
        
        # Update JS script sources
        content = re.sub(
            r'(<script[^>]*src=["\'])([^"\'?]+\.js)(\?v=\d+)?(["\'][^>]*>)',
            rf'\1\2?v={version}\4',
            content,
            flags=re.IGNORECASE
        )
        
        # Update image sources (optional)
        content = re.sub(
            r'(<img[^>]*src=["\'])([^"\'?]+\.(png|jpg|jpeg|gif|svg|webp))(\?v=\d+)?(["\'][^>]*>)',
            rf'\1\2?v={version}\5',
            content,
            flags=re.IGNORECASE
        )
        
        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ Updated {file_path}")
        else:
            print(f"⏭️  No changes needed for {file_path}")
            
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")

print(f"\n🎉 Cache busting complete! Version: {version}")