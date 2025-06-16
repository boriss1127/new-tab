// Background script to handle file system operations
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateBackgrounds') {
        // Use chrome.runtime.getPackageDirectoryEntry to get the extension's directory
        chrome.runtime.getPackageDirectoryEntry((root) => {
            root.getFile('backgrounds.json', { create: true }, (fileEntry) => {
                fileEntry.createWriter((writer) => {
                    writer.onwriteend = () => {
                        // After writing, read the directory
                        chrome.runtime.getPackageDirectoryEntry((root) => {
                            root.getDirectory('D:\\cool things\\sc\\chrome', {}, (dirEntry) => {
                                const reader = dirEntry.createReader();
                                const imageFiles = [];
                                
                                function readEntries() {
                                    reader.readEntries((entries) => {
                                        if (entries.length) {
                                            entries.forEach((entry) => {
                                                if (entry.isFile) {
                                                    const name = entry.name.toLowerCase();
                                                    if (name.endsWith('.jpg') || 
                                                        name.endsWith('.jpeg') || 
                                                        name.endsWith('.png') || 
                                                        name.endsWith('.gif') || 
                                                        name.endsWith('.webp')) {
                                                        imageFiles.push(entry.name);
                                                    }
                                                }
                                            });
                                            readEntries();
                                        } else {
                                            // All entries read, update the JSON
                                            const data = {
                                                backgrounds: imageFiles,
                                                lastSync: new Date().toISOString(),
                                                sourcePath: "D:\\cool things\\sc\\chrome"
                                            };
                                            
                                            const blob = new Blob([JSON.stringify(data, null, 2)], 
                                                { type: 'application/json' });
                                            writer.write(blob);
                                            
                                            sendResponse({ success: true, backgrounds: imageFiles });
                                        }
                                    });
                                }
                                
                                readEntries();
                            });
                        });
                    };
                });
            });
        });
        return true; // Keep the message channel open for the async response
    }
}); 