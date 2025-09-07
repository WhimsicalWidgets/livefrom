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
    overflow: hidden;
}

.camera-container video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
}

.camera-container video.front-camera {
    transform: scaleX(-1);
}

.camera-controls {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    gap: 2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
}

.capture-btn, .cancel-btn, .switch-camera-btn {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: none;
    font-size: 1.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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
    background: rgba(76, 175, 80, 0.9);
    color: white;
}

.capture-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
    background: rgba(76, 175, 80, 1);
}

.cancel-btn {
    background: rgba(244, 67, 54, 0.9);
    color: white;
}

.switch-camera-btn {
    background: rgba(103, 58, 183, 0.9);
    color: white;
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    font-size: 1.4rem;
    z-index: 11;
}

.cancel-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(244, 67, 54, 0.4);
    background: rgba(244, 67, 54, 1);
}

.switch-camera-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(103, 58, 183, 0.4);
    background: rgba(103, 58, 183, 1);
}

.photo-confirm-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.photo-confirm-content {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 2rem;
    max-width: 90vw;
    max-height: 90vh;
    backdrop-filter: blur(10px);
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.photo-preview {
    max-width: 100%;
    max-height: 50vh;
    border-radius: 10px;
    object-fit: contain;
}

.confirm-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.confirm-btn, .retake-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 120px;
}

.confirm-btn {
    background: #4CAF50;
    color: white;
}

.confirm-btn:hover {
    background: #45a049;
    transform: translateY(-2px);
}

.retake-btn {
    background: #f44336;
    color: white;
}

.retake-btn:hover {
    background: #da190b;
    transform: translateY(-2px);
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
        border-radius: 15px;
    }
    
    .camera-controls {
        gap: 2rem;
        bottom: 1.5rem;
    }
    
    .switch-camera-btn {
        top: 1rem;
        right: 1rem;
        width: 45px;
        height: 45px;
        font-size: 1.2rem;
    }
    
    .capture-btn, .cancel-btn {
        width: 60px;
        height: 60px;
        font-size: 1.6rem;
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
                <button id="switchCameraBtn" class="switch-camera-btn" style="display: none;">🔄</button>
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
    
    <div id="photoConfirmModal" class="photo-confirm-modal">
        <div class="photo-confirm-content">
            <h3>Upload this photo?</h3>
            <img id="photoPreview" class="photo-preview" alt="Photo preview">
            <div class="confirm-buttons">
                <button id="confirmUploadBtn" class="confirm-btn">Upload / Subir</button>
                <button id="retakeBtn" class="retake-btn">Retake / Repetir</button>
            </div>
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
const switchCameraBtn = document.getElementById('switchCameraBtn');
const shareBtn = document.getElementById('shareBtn');
const photoConfirmModal = document.getElementById('photoConfirmModal');
const photoPreview = document.getElementById('photoPreview');
const confirmUploadBtn = document.getElementById('confirmUploadBtn');
const retakeBtn = document.getElementById('retakeBtn');

let stream = null;
let currentFacingMode = 'environment';
let hasMultipleCameras = false;
let capturedBlob = null;

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
        // Check for multiple cameras AND if device is mobile
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                         ('ontouchstart' in window) || 
                         (navigator.maxTouchPoints > 0);
        hasMultipleCameras = videoDevices.length > 1 && isMobile;
        
        // Optimized camera settings for faster initialization
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: currentFacingMode,
                width: { ideal: 1280, max: 1920 },
                height: { ideal: 720, max: 1080 },
                frameRate: { ideal: 30, max: 60 }
            } 
        });
        
        video.srcObject = stream;
        
        // Wait for video to be ready
        video.onloadedmetadata = () => {
            // Apply mirroring class for front camera
            if (currentFacingMode === 'user') {
                video.classList.add('front-camera');
            } else {
                video.classList.remove('front-camera');
            }
            
            // Hide loading, show video and controls with smooth transition
            cameraLoading.style.opacity = '0';
            setTimeout(() => {
                cameraLoading.style.display = 'none';
                video.style.display = 'block';
                document.querySelector('.camera-controls').style.display = 'flex';
                if (hasMultipleCameras) {
                    switchCameraBtn.style.display = 'block';
                }
                
                // Fade in video and controls
                setTimeout(() => {
                    video.style.opacity = '1';
                    document.querySelector('.camera-controls').style.opacity = '1';
                    if (hasMultipleCameras) {
                        switchCameraBtn.style.opacity = '1';
                    }
                }, 10);
            }, 300);
        };
        
    } catch (err) {
        alert('Camera access denied or not available');
        closeCamera();
    }
});

function capturePhoto() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Get the video element's display size
    const videoDisplayWidth = video.clientWidth;
    const videoDisplayHeight = video.clientHeight;
    
    // Set canvas to match the display size (what user sees)
    canvas.width = videoDisplayWidth;
    canvas.height = videoDisplayHeight;
    
    // Calculate the video's natural aspect ratio vs display aspect ratio
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const displayAspectRatio = videoDisplayWidth / videoDisplayHeight;
    
    let sourceX, sourceY, sourceWidth, sourceHeight;
    
    if (videoAspectRatio > displayAspectRatio) {
        // Video is wider than display - crop sides
        sourceHeight = video.videoHeight;
        sourceWidth = video.videoHeight * displayAspectRatio;
        sourceX = (video.videoWidth - sourceWidth) / 2;
        sourceY = 0;
    } else {
        // Video is taller than display - crop top/bottom
        sourceWidth = video.videoWidth;
        sourceHeight = video.videoWidth / displayAspectRatio;
        sourceX = 0;
        sourceY = (video.videoHeight - sourceHeight) / 2;
    }
    
    // Mirror canvas for front camera
    if (currentFacingMode === 'user') {
        ctx.translate(videoDisplayWidth, 0);
        ctx.scale(-1, 1);
    }
    
    // Draw only the visible portion
    ctx.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, videoDisplayWidth, videoDisplayHeight);
    
    canvas.toBlob((blob) => {
        capturedBlob = blob;
        
        // Create preview URL and show modal
        const previewUrl = URL.createObjectURL(blob);
        photoPreview.src = previewUrl;
        photoConfirmModal.style.display = 'flex';
        
        // Pause video stream while showing preview
        if (stream) {
            stream.getTracks().forEach(track => track.enabled = false);
        }
    }, 'image/png');
}

async function uploadPhoto() {
    if (!capturedBlob) return;
    
    const formData = new FormData();
    formData.append('image', capturedBlob, '${siteName}.png');
    
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
            closeModal();
            closeCamera();
        } else {
            alert('Failed to upload photo');
        }
    } catch (err) {
        alert('Upload failed: ' + err.message);
    }
}

function closeModal() {
    photoConfirmModal.style.display = 'none';
    URL.revokeObjectURL(photoPreview.src);
    capturedBlob = null;
    
    // Resume video stream
    if (stream) {
        stream.getTracks().forEach(track => track.enabled = true);
    }
}

captureBtn.addEventListener('click', capturePhoto);

// Add tap-to-capture functionality
video.addEventListener('click', capturePhoto);

// Modal event listeners
confirmUploadBtn.addEventListener('click', uploadPhoto);
retakeBtn.addEventListener('click', closeModal);

cancelBtn.addEventListener('click', closeCamera);

switchCameraBtn.addEventListener('click', async () => {
    if (!hasMultipleCameras) return;
    
    // Switch camera facing mode
    currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    
    // Stop current stream
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    
    try {
        // Get new stream with switched camera
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: currentFacingMode,
                width: { ideal: 1280, max: 1920 },
                height: { ideal: 720, max: 1080 },
                frameRate: { ideal: 30, max: 60 }
            } 
        });
        
        video.srcObject = stream;
        
        // Update mirroring class when switching cameras
        if (currentFacingMode === 'user') {
            video.classList.add('front-camera');
        } else {
            video.classList.remove('front-camera');
        }
    } catch (err) {
        alert('Failed to switch camera');
        // Try to restore previous camera
        currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
    }
});

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
        switchCameraBtn.style.display = 'none';
        switchCameraBtn.style.opacity = '0';
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