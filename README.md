# Dynamic Image Gallery

A simple, responsive image gallery that displays images from the `images` folder.

## How It Works

This gallery uses a static JSON file (`images.json`) to list all images in the `images` folder. The HTML file then loads this JSON file and dynamically creates gallery items for each image.

## Updating the Gallery

When you add or remove images from the `images` folder, you need to update the `images.json` file to reflect these changes. You can do this by running:

```bash
node update-images-json.js
```

This script will scan the `images` folder and update the `images.json` file with the current list of images.

## GitHub Pages Deployment

To deploy this gallery to GitHub Pages:

1. Add all your images to the `images` folder
2. Run `node update-images-json.js` to update the `images.json` file
3. Commit and push all files to your GitHub repository
4. Enable GitHub Pages in your repository settings

The gallery will now display all the images listed in `images.json`.

## Local Development

For local development, you can use any static file server. For example:

```bash
# Using Python
python -m http.server

# Using Node.js
npx http-server
```

Then open your browser to `http://localhost:8000` or the port specified by your server.
