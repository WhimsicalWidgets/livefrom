import { RouteHandler } from '../types/index.js';
import { R2Service } from '../services/r2.js';
import { renderSitePage } from '../templates/site.js';

export const handleSitePage: RouteHandler = async (request, env) => {
  const url = new URL(request.url);
  const siteName = url.pathname.slice(1); // Remove leading slash

  if (!siteName) {
    return new Response('Site name required', { status: 400 });
  }

  const r2Service = new R2Service(env.bucket);

  const metadata = await r2Service.getSiteMetadata(siteName);
  if (!metadata) {
    return new Response('Site not found', { status: 404 });
  }

  const hasImage = (await r2Service.getSiteImage(siteName)) !== null;

  const html = renderSitePage(siteName, metadata, hasImage);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
};