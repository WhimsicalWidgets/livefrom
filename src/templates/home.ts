export function renderHomePage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live From - Create Your Live Stream</title>
    <link rel="icon" type="image/png" href="https://r2.livefrom.me/favicon.png">
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
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 3rem;
    max-width: 600px;
    width: 90%;
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.title {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
}

.subtitle {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
}

input, textarea, select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    font-family: inherit;
}

input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

textarea {
    resize: vertical;
    min-height: 100px;
}

.form-row {
    display: flex;
    gap: 1rem;
}

.form-row .form-group {
    flex: 1;
}

.required {
    color: #e74c3c;
}

.submit-btn {
    width: 100%;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 16px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.submit-btn:active {
    transform: translateY(0);
}

.info-text {
    font-size: 0.9rem;
    color: #666;
    text-align: center;
    margin-top: 1rem;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .container {
        padding: 2rem;
        margin: 1rem;
    }
    
    .title {
        font-size: 2rem;
    }
    
    .form-row {
        flex-direction: column;
        gap: 0;
    }
}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">Live From</h1>
            <p class="subtitle">Create your own live photo stream</p>
        </div>
        
        <form method="POST">
            <div class="form-group">
                <label for="title">Site Name <span class="required">*</span></label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="e.g., 300023rd-free, my-coffee-shop" 
                    required
                    pattern="[a-zA-Z0-9-_]+"
                    title="Only letters, numbers, hyphens, and underscores allowed"
                >
            </div>
            
            <div class="form-group">
                <label for="description">Description <span class="required">*</span></label>
                <textarea 
                    id="description" 
                    name="description" 
                    placeholder="What will people see updates about?"
                    required
                ></textarea>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="author">Your Name</label>
                    <input 
                        type="text" 
                        id="author" 
                        name="author" 
                        placeholder="Optional"
                    >
                </div>
                
                <div class="form-group">
                    <label for="location">Location</label>
                    <input 
                        type="text" 
                        id="location" 
                        name="location" 
                        placeholder="City, Country"
                    >
                </div>
            </div>
            
            <div class="form-group">
                <label for="tags">Tags (comma-separated)</label>
                <input 
                    type="text" 
                    id="tags" 
                    name="tags" 
                    placeholder="coffee, art, nature, etc."
                >
            </div>
            
            <button type="submit" class="submit-btn">
                Create Live From Site
            </button>
            
            <p class="info-text">
                After creating your site, you'll get a shareable URL where people can see live updates. 
                You can upload photos directly from your camera or device.
            </p>
        </form>
    </div>
</body>
</html>`;
}