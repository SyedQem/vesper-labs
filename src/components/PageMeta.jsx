import { Helmet } from 'react-helmet-async';
import { DEFAULT_OG_IMAGE, getAbsoluteUrl } from '../utils/seo.js';

export default function PageMeta({ title, description, path, image = DEFAULT_OG_IMAGE }) {
    const canonical = getAbsoluteUrl(path);
    const imageUrl = image.startsWith('http') ? image : getAbsoluteUrl(image);

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:alt" content={title} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    );
}
