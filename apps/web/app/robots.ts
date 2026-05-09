import type { MetadataRoute } from 'next';
import { product } from '@bullebrowser/brand-tokens';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `https://${product.domain}/sitemap.xml`,
  };
}
