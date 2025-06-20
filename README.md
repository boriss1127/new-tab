# Beautiful New Tab Chrome Extension

A beautiful and customizable new tab page for Chrome with a modern clock, search bar, and rotating background images.

## Features

- Clean, modern design with a large clock display
- Google search integration
- Smooth background image rotation
- Blur effect overlay for better readability
- Responsive layout that works on all screen sizes

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder

## Customization

### Adding Background Images

1. Create a folder named `backgrounds` in the extension directory
2. Add your background images to this folder
3. Open `script.js` and add the image paths to the `backgroundImages` array:

```javascript
const backgroundImages = [
  "backgrounds/your-image-1.jpg",
  "backgrounds/your-image-2.jpg",
  // Add more images as needed
];
```

### Styling

You can customize the appearance by modifying the `styles.css` file:

- Change colors
- Adjust font sizes
- Modify the blur effect
- Customize the search bar appearance

## Development

- `manifest.json`: Extension configuration
- `newtab.html`: Main page structure
- `styles.css`: Styling and layout
- `script.js`: Clock and background rotation functionality

## License

MIT License - Feel free to modify and use this extension as you wish!
#   n e w - t a b  
 