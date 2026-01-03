#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Generate a cache-busting version (timestamp)
const version = Date.now();

// Files to update (your HTML files)
const htmlFiles = [
  'index.html',
  // Add other HTML files here
];

// Process each HTML file
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${file} (not found)`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update CSS links
  content = content.replace(
    /(<link[^>]*href=["'])([^"'?]+\.css)(\?v=\d+)?(["'][^>]*>)/gi,
    `$1$2?v=${version}$4`
  );
  
  // Update JS script sources
  content = content.replace(
    /(<script[^>]*src=["'])([^"'?]+\.js)(\?v=\d+)?(["'][^>]*>)/gi,
    `$1$2?v=${version}$4`
  );
  
  // Update image sources (optional)
  content = content.replace(
    /(<img[^>]*src=["'])([^"'?]+\.(png|jpg|jpeg|gif|svg|webp))(\?v=\d+)?(["'][^>]*>)/gi,
    `$1$2?v=${version}$5`
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated ${file} with version ${version}`);
});

console.log('\n🎉 Cache busting complete!');