export interface Env {
  bucket: R2Bucket;
}

export interface SiteMetadata {
  title: string;
  description: string;
  created: string;
  author?: string;
  location?: string;
  tags?: string[];
}

export interface RouteHandler {
  (request: Request, env: Env): Promise<Response>;
}