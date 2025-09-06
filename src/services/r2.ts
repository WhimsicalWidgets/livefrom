import { SiteMetadata } from '../types/index.js';

export class R2Service {
  constructor(private bucket: R2Bucket) {}

  async getSiteMetadata(siteName: string): Promise<SiteMetadata | null> {
    try {
      const object = await this.bucket.get(`${siteName}.json`);
      if (!object) return null;
      
      const data = await object.text();
      return JSON.parse(data) as SiteMetadata;
    } catch (error) {
      console.error('Error getting site metadata:', error);
      return null;
    }
  }

  async setSiteMetadata(siteName: string, metadata: SiteMetadata): Promise<boolean> {
    try {
      await this.bucket.put(`${siteName}.json`, JSON.stringify(metadata, null, 2), {
        httpMetadata: { contentType: 'application/json' }
      });
      return true;
    } catch (error) {
      console.error('Error setting site metadata:', error);
      return false;
    }
  }

  async getSiteImage(siteName: string): Promise<R2Object | null> {
    try {
      return await this.bucket.get(`${siteName}.png`);
    } catch (error) {
      console.error('Error getting site image:', error);
      return null;
    }
  }

  async setSiteImage(siteName: string, imageData: ReadableStream | ArrayBuffer | string): Promise<boolean> {
    try {
      await this.bucket.put(`${siteName}.png`, imageData, {
        httpMetadata: { contentType: 'image/png' }
      });
      return true;
    } catch (error) {
      console.error('Error setting site image:', error);
      return false;
    }
  }

  async siteExists(siteName: string): Promise<boolean> {
    return (await this.getSiteMetadata(siteName)) !== null;
  }
}