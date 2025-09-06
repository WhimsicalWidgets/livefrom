import { SiteMetadata } from '../types/index.js';

export function renderSitePage(siteName: string, metadata: SiteMetadata, hasImage: boolean): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live From ${metadata.title}</title>
    <link rel="icon" type="image/png" href="https://r2.livefrom.me/favicon.png">
    <meta name="description" content="${metadata.description}">
    <meta property="og:title" content="Live From ${metadata.title}">
    <meta property="og:description" content="${metadata.description}">
    ${hasImage ? `<meta property="og:image" content="https://r2.livefrom.me/${siteName}.png">` : ''}
    <style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.title {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    font-weight: 800;
    background: linear-gradient(45deg, #fff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    text-align: center;
}

.subtitle {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 300;
    margin-bottom: 0.5rem;
    text-align: center;
}

.instruction-text {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1rem;
    line-height: 1.5;
    text-align: center;
}

.upload-section {
    animation: fadeIn 0.8s ease-out;
}

.current-photo {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    backdrop-filter: blur(10px);
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.current-photo img {
    max-width: 100%;
    max-height: 600px;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.no-photo {
    color: #666;
    font-size: 1.2rem;
    text-align: center;
}

.photo-date {
    margin-top: 1rem;
    color: #666;
    font-size: 0.9rem;
    text-align: center;
}

.upload-area, .share-btn {
    flex: 1;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 2rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 2px dashed rgba(102, 126, 234, 0.3);
    cursor: pointer;
}

.upload-icon {
    font-size: 3rem;
    animation: bounce 2s infinite;
}

.action-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

.share-btn {
    border: 2px solid rgba(102, 126, 234, 0.3);
    font-size: 1rem;
    color: #666;
    font-weight: 500;
    border-style: solid;
    text-align: center;
    padding: 1rem;
}

.share-icon {
    width: 3rem;
    height: 3rem;
    color: #666;
    display: block;
    margin-bottom: 0.5rem;
}

.share-text {
    font-size: 0.9rem;
    font-weight: 500;
    color: #666;
}

.camera-container {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem;
    backdrop-filter: blur(10px);
    position: relative;
    transition: opacity 0.3s ease;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
}

.camera-container video {
    width: 100%;
    flex: 1;
    object-fit: cover;
    border-radius: 10px;
    transform: scaleX(-1);
    min-height: 300px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.camera-controls {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 1.5rem;
    padding: 1rem 0;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.capture-btn, .cancel-btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}

.camera-loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    color: #666;
    font-size: 1.1rem;
    transition: opacity 0.3s ease;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(102, 126, 234, 0.1);
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.capture-btn {
    background: #4CAF50;
    color: white;
}

.capture-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
}

.cancel-btn {
    background: #f44336;
    color: white;
}

.cancel-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(244, 67, 54, 0.4);
}

.upload-area:hover, .share-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(102, 126, 234, 0.6);
}

.metadata {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    padding: 1.5rem;
    margin-top: 2rem;
    backdrop-filter: blur(10px);
}

.metadata h3 {
    margin-bottom: 1rem;
    color: #333;
}

.metadata-item {
    margin-bottom: 0.5rem;
    color: #666;
}

.metadata-item strong {
    color: #333;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.tag {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

@media (max-width: 768px) {
    .container {
        padding: 0.5rem;
        margin: 0;
    }
    
    .current-photo {
        min-height: 300px;
        padding: 1rem;
        margin: 0.5rem;
    }
    
    .upload-area, .share-btn {
        min-height: 100px;
        padding: 1rem;
    }
    
    .camera-container {
        margin: 0.5rem;
        min-height: 80vh;
        border-radius: 15px;
    }
    
    .camera-container video {
        min-height: 60vh;
    }
    
    .camera-controls {
        gap: 4rem;
        padding: 1.5rem 0;
    }
    
    .capture-btn, .cancel-btn {
        width: 70px;
        height: 70px;
        font-size: 1.8rem;
    }
}

.footer {
    text-align: center;
    margin-top: 2rem;
    padding: 1rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
}

.footer a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
}

.footer a:hover {
    text-decoration: underline;
}
    </style>
    <link id="dynamicFavicon" rel="icon" href="${hasImage ? `https://r2.livefrom.me/${siteName}.png` : '/favicon.ico'}" type="image/png">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="title">Live From ${metadata.title}</h1>
            <p class="subtitle">${metadata.description}</p>
            <p class="instruction-text">See the latest photo or update the photo!<br/>
¡Ve la última foto o actualiza la foto!</p>
        </header>
        
        <div class="upload-section">
            <div class="current-photo" id="currentPhoto">
                ${hasImage ? 
                    `<img src="https://r2.livefrom.me/${siteName}.png?t=${Date.now()}" alt="Latest from ${metadata.title}">
                     <div class="photo-date">Last updated recently</div>` : 
                    `<p class="no-photo">No photo uploaded yet</p>`
                }
            </div>
            <div class="camera-container" id="cameraContainer" style="display: none; opacity: 0;">
                <div class="camera-loading" id="cameraLoading">
                    <div class="loading-spinner"></div>
                    <p>Starting camera...</p>
                </div>
                <video id="video" autoplay playsinline style="display: none;"></video>
                <div class="camera-controls" style="display: none;">
                    <button id="captureBtn" class="capture-btn">📸</button>
                    <button id="cancelBtn" class="cancel-btn">✕</button>
                </div>
            </div>
        </div>
        
        <div class="action-buttons">
            <div class="upload-area" id="uploadArea">
                <div class="upload-icon">📸</div>
            </div>
            <button id="shareBtn" class="share-btn">
                <svg class="share-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16,6 12,2 8,6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                <div class="share-text">Share / Compartir</div>
            </button>
        </div>
        
        <div class="footer">
            A <a href="https://github.com/orgs/WhimsicalWidgets/repositories" target="_blank">Whimsical Widget</a> made by <a href="https://www.linkedin.com/in/kellj/" target="_blank">Kelly</a>
        </div>
    </div>

    <script>
const uploadArea = document.getElementById('uploadArea');
const currentPhoto = document.getElementById('currentPhoto');
const cameraContainer = document.getElementById('cameraContainer');
const cameraLoading = document.getElementById('cameraLoading');
const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const cancelBtn = document.getElementById('cancelBtn');
const shareBtn = document.getElementById('shareBtn');

let stream = null;

uploadArea.addEventListener('click', async () => {
    // Show loading immediately
    uploadArea.style.display = 'none';
    currentPhoto.style.display = 'none';
    document.querySelector('.action-buttons').style.display = 'none';
    document.querySelector('.header').style.display = 'none';
    
    cameraContainer.style.display = 'block';
    setTimeout(() => {
        cameraContainer.style.opacity = '1';
    }, 10);

    try {
        // Optimized camera settings for faster initialization
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'environment',
                width: { ideal: 1280, max: 1920 },
                height: { ideal: 720, max: 1080 },
                frameRate: { ideal: 30, max: 60 }
            } 
        });
        
        video.srcObject = stream;
        
        // Wait for video to be ready
        video.onloadedmetadata = () => {
            // Hide loading, show video and controls with smooth transition
            cameraLoading.style.opacity = '0';
            setTimeout(() => {
                cameraLoading.style.display = 'none';
                video.style.display = 'block';
                document.querySelector('.camera-controls').style.display = 'flex';
                
                // Fade in video and controls
                setTimeout(() => {
                    video.style.opacity = '1';
                    document.querySelector('.camera-controls').style.opacity = '1';
                }, 10);
            }, 300);
        };
        
    } catch (err) {
        alert('Camera access denied or not available');
        closeCamera();
    }
});

captureBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('image', blob, '${siteName}.png');
        
        try {
            const response = await fetch('/api/upload/${siteName}', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                // Force reload image by adding timestamp to bust cache
                const img = currentPhoto.querySelector('img');
                if (img) {
                    img.src = 'https://r2.livefrom.me/${siteName}.png?t=' + Date.now();
                } else {
                    // No existing image, reload page to show new one
                    location.reload();
                }
                currentPhoto.style.display = 'flex';
            } else {
                alert('Failed to upload photo');
            }
        } catch (err) {
            alert('Upload failed: ' + err.message);
        }
    }, 'image/png');
    
    closeCamera();
});

cancelBtn.addEventListener('click', closeCamera);

function closeCamera() {
    // Smooth fade out
    cameraContainer.style.opacity = '0';
    
    setTimeout(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        // Reset all elements to initial state
        cameraContainer.style.display = 'none';
        cameraLoading.style.display = 'flex';
        cameraLoading.style.opacity = '1';
        video.style.display = 'none';
        video.style.opacity = '0';
        document.querySelector('.camera-controls').style.display = 'none';
        document.querySelector('.camera-controls').style.opacity = '0';
        
        currentPhoto.style.display = 'flex';
        uploadArea.style.display = 'block';
        document.querySelector('.action-buttons').style.display = 'flex';
        document.querySelector('.header').style.display = 'block';
    }, 300);
}

shareBtn.addEventListener('click', async () => {
    const shareText = 'Check out the latest from ${metadata.title}! 📸';
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Live From ${metadata.title}',
                text: shareText,
                url: shareUrl
            });
        } catch (err) {
            console.log('Share cancelled');
        }
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareText + ' ' + shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
    }
});
    </script>
</body>
</html>`;
}