import { RouteHandler } from '../types/index.js';
import { R2Service } from '../services/r2.js';


export const handleImageUpload: RouteHandler = async (request, env) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const url = new URL(request.url);
  const siteName = url.pathname.replace('/api/upload/', '');

  if (!siteName) {
    return new Response('Site name required', { status: 400 });
  }

  try {
    const r2Service = new R2Service(env.bucket);

    // Verify site exists
    if (!(await r2Service.siteExists(siteName))) {
      return new Response('Site not found', { status: 404 });
    }

    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return new Response('No image file provided', { status: 400 });
    }

    // Validate file type
    if (!imageFile.type.startsWith('image/')) {
      return new Response('Invalid file type. Only images are allowed.', { status: 400 });
    }

    // Validate file size (max 10MB)
    if (imageFile.size > 10 * 1024 * 1024) {
      return new Response('File too large. Maximum size is 10MB.', { status: 400 });
    }

    const success = await r2Service.setSiteImage(siteName, imageFile.stream());

    if (!success) {
      return new Response('Upload failed', { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response('Upload failed', { status: 500 });
  }
};