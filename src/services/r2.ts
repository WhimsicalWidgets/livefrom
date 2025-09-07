import { SiteMetadata } from '../types/index.js';
import { escapeHtml } from '../utils/escape.js';

export class R2Service {
  constructor(private bucket: R2Bucket) {}

  async getSiteMetadata(slug: string): Promise<SiteMetadata | null> {
    try {
      const object = await this.bucket.get(`${slug}.json`);
      if (!object) return null;
      
      const data = await object.text();
      const metadata = JSON.parse(data) as SiteMetadata;
      
      // Sanitize all string values
      return {
        ...metadata,
        title: escapeHtml(metadata.title),
        description: escapeHtml(metadata.description),
        author: metadata.author ? escapeHtml(metadata.author) : metadata.author,
        location: metadata.location ? escapeHtml(metadata.location) : metadata.location,
        tags: metadata.tags?.map(tag => escapeHtml(tag))
      };
    } catch (error) {
      console.error('Error getting site metadata:', error);
      return null;
    }
  }

  async setSiteMetadata(slug: string, metadata: SiteMetadata): Promise<boolean> {
    try {
      await this.bucket.put(`${slug}.json`, JSON.stringify(metadata, null, 2), {
        httpMetadata: { contentType: 'application/json' }
      });
      return true;
    } catch (error) {
      console.error('Error setting site metadata:', error);
      return false;
    }
  }

  async getSiteImage(slug: string): Promise<R2Object | null> {
    try {
      return await this.bucket.get(`${slug}.png`);
    } catch (error) {
      console.error('Error getting site image:', error);
      return null;
    }
  }

  async setSiteImage(slug: string, imageData: ReadableStream | ArrayBuffer | string): Promise<boolean> {
    try {
      await this.bucket.put(`${slug}.png`, imageData, {
        httpMetadata: { contentType: 'image/png' }
      });
      return true;
    } catch (error) {
      console.error('Error setting site image:', error);
      return false;
    }
  }

  async siteExists(slug: string): Promise<boolean> {
    return (await this.getSiteMetadata(slug)) !== null;
  }
}