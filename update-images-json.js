const fs = require('fs');
const path = require('path');

// Path to the images directory
const imagesDir = path.join(__dirname, 'images');
// Path to the JSON file
const jsonFilePath = path.join(__dirname, 'images.json');

// Function to update the images.json file
function updateImagesJson() {
  try {
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

// Run the update function
const images = updateImagesJson();
console.log('Images found:', images);
