#!/usr/bin/env python3
import re
import os
import sys
from pathlib import Path

def convert_links(content):
    """Convert various link formats to Jekyll absolute_url format."""
    
    # Pattern 1: {{ site.baseurl }}/path/to/file.ext
    content = re.sub(
        r"{{\s*site\.baseurl\s*}}/([^'\"}\s]+)",
        r"{{ '/\1' | absolute_url }}",
        content
    )
    
    # Pattern 2: href="/path/to/file" or src="/path/to/file"
    # Only convert absolute paths starting with /
    content = re.sub(
        r'((?:href|src)=")(/[^"]+)"',
        lambda m: f'{m.group(1)}{{{{ \'{m.group(2)}\' | absolute_url }}}}"',
        content
    )
    
    # Pattern 3: href='/path/to/file' or src='/path/to/file' (single quotes)
    content = re.sub(
        r"((?:href|src)=')(/[^']+)'",
        lambda m: f'{m.group(1)}{{{{ \'{m.group(2)}\' | absolute_url }}}}\'',
        content
    )
    
    return content

def process_file(filepath, dry_run=False):
    """Process a single file and convert links."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            original = f.read()
        
        converted = convert_links(original)
        
        if original != converted:
            if dry_run:
                print(f"Would modify: {filepath}")
                return True
            else:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(converted)
                print(f"✓ Modified: {filepath}")
                return True
        else:
            if not dry_run:
                print(f"  No changes: {filepath}")
            return False
    except Exception as e:
        print(f"✗ Error processing {filepath}: {e}")
        return False

def main():
    # Configuration
    extensions = ['.html', '.md', '.markdown', '.liquid']
    exclude_dirs = ['_site', '.git', 'node_modules', 'vendor']
    
    # Parse arguments
    dry_run = '--dry-run' in sys.argv or '-n' in sys.argv
    target_path = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith('-') else '.'
    
    if dry_run:
        print("DRY RUN MODE - No files will be modified\n")
    
    print(f"Scanning directory: {target_path}\n")
    
    # Find all matching files
    modified_count = 0
    total_count = 0
    
    for root, dirs, files in os.walk(target_path):
        # Remove excluded directories from traversal
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                filepath = os.path.join(root, file)
                total_count += 1
                if process_file(filepath, dry_run):
                    modified_count += 1
    
    # Summary
    print(f"\n{'=' * 50}")
    print(f"Total files scanned: {total_count}")
    print(f"Files {'that would be ' if dry_run else ''}modified: {modified_count}")
    
    if dry_run:
        print("\nRun without --dry-run to apply changes")

if __name__ == "__main__":
    print("Jekyll Link Converter")
    print("=" * 50)
    
    if '--help' in sys.argv or '-h' in sys.argv:
        print("""
Usage: python convert_links.py [directory] [options]

Arguments:
  directory     Directory to scan (default: current directory)

Options:
  --dry-run, -n  Preview changes without modifying files
  --help, -h     Show this help message

Examples:
  python convert_links.py                    # Convert all files in current directory
  python convert_links.py --dry-run          # Preview changes only
  python convert_links.py _layouts           # Convert files in _layouts directory
  python convert_links.py . --dry-run        # Preview changes in current directory

This script converts links in the following formats:
  1. {{ site.baseurl }}/path  →  {{ '/path' | absolute_url }}
  2. href="/path"             →  href="{{ '/path' | absolute_url }}"
  3. src="/path"              →  src="{{ '/path' | absolute_url }}"
        """)
        sys.exit(0)
    
    main()