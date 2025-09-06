import { RouteHandler, SiteMetadata } from '../types/index.js';
import { R2Service } from '../services/r2.js';
import { renderHomePage } from '../templates/home.js';

export const handleHomePage: RouteHandler = async (request, env) => {
  if (request.method === 'GET') {
    return new Response(renderHomePage(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  if (request.method === 'POST') {
    return handleCreateSite(request, env);
  }

  return new Response('Method not allowed', { status: 405 });
};

async function handleCreateSite(request: Request, env: any): Promise<Response> {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const author = formData.get('author') as string;
    const location = formData.get('location') as string;
    const tagsRaw = formData.get('tags') as string;

    if (!title || !description) {
      return new Response('Title and description are required', { status: 400 });
    }

    // Validate site name
    if (!/^[a-zA-Z0-9-_]+$/.test(title)) {
      return new Response('Site name can only contain letters, numbers, hyphens, and underscores', { status: 400 });
    }

    const r2Service = new R2Service(env.bucket);

    // Check if site already exists
    if (await r2Service.siteExists(title)) {
      return new Response('A site with this name already exists', { status: 409 });
    }

    const tags = tagsRaw ? tagsRaw.split(',').map(tag => tag.trim()).filter(Boolean) : [];

    const metadata: SiteMetadata = {
      title,
      description,
      created: new Date().toISOString(),
      ...(author && { author }),
      ...(location && { location }),
      ...(tags.length > 0 && { tags })
    };

    const success = await r2Service.setSiteMetadata(title, metadata);

    if (!success) {
      return new Response('Failed to create site', { status: 500 });
    }

    return new Response('Site created successfully!', {
      status: 302,
      headers: { 'Location': `/${title}` }
    });
  } catch (error) {
    console.error('Error creating site:', error);
    return new Response('Internal server error', { status: 500 });
  }
}