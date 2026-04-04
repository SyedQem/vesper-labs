export const SITE_URL = 'https://vesper-labs.vercel.app';
export const DEFAULT_OG_IMAGE = '/og-image.svg';

export function getAbsoluteUrl(path = '/') {
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
