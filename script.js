// Clock functionality
function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const greetingElement = document.getElementById('greeting');

    // Update time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;

    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString(undefined, options);

    // Update greeting
    const hour = now.getHours();
    let greeting = '';
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon';
    } else if (hour >= 18 && hour < 22) {
        greeting = 'Good evening';
    } else {
        greeting = 'Good night';
    }
    greetingElement.textContent = `${greeting}, Boris`;
}

// Background handling
let backgroundImages = [];

async function loadBackgrounds() {
    try {
        // Check if we're running in VSCode
        if (window.location.protocol === 'file:') {
            // In VSCode, use a simple array of background images
            backgroundImages = [
                'sabrina-carpenter-versace-4k-db-3840x2160.jpg',
                'sabrina-carpenter-versace-2025-br-3840x2160.jpg',
                'sabrina-carpenter-2025-dz-3840x2160.jpg',
                'sabrina-carpenter-alex-harper-met-gala-2024-ye-3840x2160.jpg',
                'sabrina-carpenter-for-rolling-stone-wf-3840x2160.jpg',
                'sabrina-carpenter-snl-2024-ka-3840x2160.jpg',
                'sabrina-carpenter-id-magazine-kq-3840x2160.jpg',
                'sabrina-carpenter-2024-ih-3840x2160.jpg',
                'sabrina-carpenter-for-dunkin-cg-3840x2160.jpg',
                'sabrina-carpenter-photo-4k-wallpaper-uhdpaper.com-786@2@b.jpg',
                'sabrina-carpenter-photoshoot-4k-wallpaper-uhdpaper.com-774@2@b.jpg',
                'sabrina-carpenter-blonde-4k-wallpaper-uhdpaper.com-602@2@a.jpg',
                'sabrina-carpenter-for-paper-magazine-2024-fb-1920x1080.jpg',
                'sns-ps_009.jpg',
                'sns-ps_016.jpg',
                'sns-ps_015.jpg',
                'sns-ps_008.jpg',
                'sabrina-carpenter-for-redken-campaign-2025-b0-2880x1800.jpg',
                'sabrina-carpenter-2020-actress-zs-2880x1800.jpg',
                'Eics_fwd_Photoshoot_2.png',
                'sabrina-for-short-n-sweet-deluxe-v0-01zap298yxie1.png'
            ];
        } else {
            // In Chrome extension, use storage API
            const result = await chrome.storage.local.get('backgrounds');
            if (result.backgrounds) {
                backgroundImages = result.backgrounds;
            } else {
                chrome.runtime.sendMessage({ action: 'updateBackgrounds' }, (response) => {
                    if (response && response.success) {
                        backgroundImages = response.backgrounds;
                        chrome.storage.local.set({ backgrounds: response.backgrounds });
                        setRandomBackground();
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error loading backgrounds:', error);
        backgroundImages = [];
    }
}

function setRandomBackground() {
    if (backgroundImages.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const img = new Image();
    const imagePath = window.location.protocol === 'file:' 
        ? `file:///D:/cool things/sc/chrome/${backgroundImages[randomIndex]}`
        : `file:///D:/cool things/sc/chrome/${backgroundImages[randomIndex]}`;
    
    img.src = imagePath;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${imagePath}')`;
    };
    img.onerror = () => {
        console.error('Error loading image:', imagePath);
        // Try another image if this one fails
        setRandomBackground();
    };
}

// Initialize
async function init() {
    // Load backgrounds
    await loadBackgrounds();
    
    // Start clock
    updateClock();
    setInterval(updateClock, 1000);

    // Set initial background
    setRandomBackground();

    // Focus search input
    document.getElementById('search-input').focus();
}

// Run initialization when the page loads
document.addEventListener('DOMContentLoaded', init); 