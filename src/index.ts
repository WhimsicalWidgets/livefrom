import { Env } from './types/index.js';
import { handleHomePage } from './handlers/home.js';
import { handleSitePage } from './handlers/site.js';
import { handleImageUpload } from './handlers/api.js';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url);
      const path = url.pathname;

      // Root path - home page with create form
      if (path === '/') {
        return await handleHomePage(request, env);
      }

      // API routes
      if (path.startsWith('/api/upload/')) {
        return await handleImageUpload(request, env);
      }

      // Dynamic site pages
      if (path.length > 1) {
        return await handleSitePage(request, env);
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error('Request error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};
