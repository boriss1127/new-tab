// Background script to handle file system operations
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateBackgrounds') {
        // In Manifest V3, we cannot dynamically scan or write to the extension's own package folder at runtime.
        // We will read the list of backgrounds directly from backgrounds.json.
        // The backgrounds.json file must be manually kept up-to-date by the user,
        // and the extension must be reloaded for changes to take effect.
        fetch(chrome.runtime.getURL('backgrounds.json'))
            .then(response => response.json())
            .then(data => {
                const imageFiles = data.backgrounds || [];
                chrome.storage.local.set({ backgrounds: imageFiles }, () => {
                    sendResponse({ success: true, backgrounds: imageFiles });
                });
            })
            .catch(error => {
                console.error('Error loading backgrounds.json:', error);
                sendResponse({ success: false, error: 'Failed to load backgrounds list' });
            });
        return true; // Keep the message channel open for the async response
    }
}); 