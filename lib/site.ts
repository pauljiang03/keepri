export const basePath = process.env.PAGES_BASE_PATH || '';
export const siteUrl = process.env.SITE_URL || 'https://pauljiang03.github.io/keepri/';
export const asset = (path: string) => `${basePath}${path}`;
