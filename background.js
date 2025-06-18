// Initialize storage when the extension loads
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed/updated, initializing storage...');
    // Load backgrounds from backgrounds.json
    fetch(chrome.runtime.getURL('backgrounds.json'))
        .then(response => response.json())
        .then(data => {
            const imageFiles = data.backgrounds || [];
            console.log('Loaded backgrounds from backgrounds.json:', imageFiles);
            chrome.storage.local.set({ backgrounds: imageFiles }, () => {
                console.log('Backgrounds saved to storage');
            });
        })
        .catch(error => {
            console.error('Error loading backgrounds.json:', error);
        });
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateBackgrounds') {
        console.log('Received updateBackgrounds request');
        fetch(chrome.runtime.getURL('backgrounds.json'))
            .then(response => response.json())
            .then(data => {
                const imageFiles = data.backgrounds || [];
                console.log('Updating backgrounds in storage:', imageFiles);
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