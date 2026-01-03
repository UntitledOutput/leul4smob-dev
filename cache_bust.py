#!/usr/bin/env python3

import os
import re
import time
from pathlib import Path

# Auto-detect base path for GitHub Pages
if os.getenv('GITHUB_ACTIONS'):
    # Running in GitHub Actions
    github_repo = os.getenv('GITHUB_REPOSITORY', '')  # format: "username/repo-name"
    repo_name = github_repo.split('/')[-1] if '/' in github_repo else ''
    
    # Check if it's a project site (not username.github.io)
    if repo_name and not repo_name.endswith('.github.io'):
        BASE_HREF = f"/{repo_name}/"
        print(f"🔍 Detected GitHub Pages project site: {BASE_HREF}")
    else:
        BASE_HREF = "/"
        print(f"🔍 Detected GitHub Pages user/org site: {BASE_HREF}")
else:
    # Running locally - default to root
    BASE_HREF = "/"
    print(f"💻 Running locally, using base: {BASE_HREF}")

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
        
        # Add or update <base> tag in <head>
        if '<base' in content:
            # Update existing base tag
            content = re.sub(
                r'<base[^>]*href=["\'][^"\']*["\'][^>]*>',
                f'<base href="{BASE_HREF}">',
                content,
                flags=re.IGNORECASE
            )
        elif '<head>' in content or '<head ' in content:
            # Add base tag after <head>
            content = re.sub(
                r'(<head[^>]*>)',
                rf'\1\n  <base href="{BASE_HREF}">',
                content,
                count=1,
                flags=re.IGNORECASE
            )
        else:
            print(f"⚠️  No <head> tag found in {file_path}, skipping base tag")
        
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