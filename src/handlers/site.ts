import { RouteHandler } from '../types/index.js';
import { R2Service } from '../services/r2.js';
import { renderSitePage } from '../templates/site.js';

export const handleSitePage: RouteHandler = async (request, env) => {
  const url = new URL(request.url);
  const siteName = url.pathname.slice(1); // Remove leading slash

  if (!siteName) {
    return new Response('Site name required', { status: 400 });
  }

  // Fetch metadata directly from R2 URL
  try {
    const metadataResponse = await fetch(`https://r2.livefrom.me/${siteName}.json`);
    if (!metadataResponse.ok) {
      return new Response('Site not found', { status: 404 });
    }
    
    const metadata = await metadataResponse.json();
    
    // Check if image exists
    const imageResponse = await fetch(`https://r2.livefrom.me/${siteName}.png`, { method: 'HEAD' });
    const hasImage = imageResponse.ok;

    const html = renderSitePage(siteName, metadata, hasImage);
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    console.error('Error fetching site data:', error);
    return new Response('Site not found', { status: 404 });
  }
};