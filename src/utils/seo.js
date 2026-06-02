export const SITE_URL = 'https://www.vesperworks.ca/';
export const DEFAULT_OG_IMAGE = '/og-image.svg';

export function getAbsoluteUrl(path = '/') {
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
