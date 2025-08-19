const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// Function to update the images.json file
function updateImagesJson() {
  try {
    const imagesDir = path.join(__dirname, 'images');
    const jsonFilePath = path.join(__dirname, 'images.json');
    
    // Read the images directory
    const files = fs.readdirSync(imagesDir);
    
    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
    });
    
    // Write the list to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(imageFiles, null, 2));
    
    console.log('Successfully updated images.json with', imageFiles.length, 'images');
    return imageFiles;
  } catch (error) {
    console.error('Error updating images.json:', error);
    return [];
  }
}

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Handle root path
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Handle API endpoint for updating and listing images
  if (pathname === '/api/update-images') {
    // Update the images.json file
    const updatedImages = updateImagesJson();
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: 'Images.json updated successfully',
      images: updatedImages
    }));
    return;
  }
  
  // Handle API endpoint for listing images
  if (pathname === '/api/images') {
    const imagesDir = path.join(__dirname, 'images');
    
    try {
      const files = fs.readdirSync(imagesDir);
      const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
      });
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(imageFiles));
    } catch (error) {
      console.error('Error reading images directory:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to read images directory' }));
    }
    return;
  }
  
  // Serve static files
  const filePath = path.join(__dirname, pathname);
  const extname = path.extname(filePath);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        // Server error
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1>');
      }
      return;
    }
    
    // Determine content type
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Send the response
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
