/**
 * Blog content system — reads markdown files processed by the Vite plugin.
 *
 * Decap CMS writes posts to src/content/blog/posts/*.md with frontmatter.
 * The custom Vite plugin (vite.config.js) uses gray-matter to parse each file
 * at build time, exporting { frontmatter, body } as ES module exports.
 *
 * import.meta.glob eagerly loads every .md file from the posts/ directory.
 */

const postModules = import.meta.glob('./posts/*.md', { eager: true });

function loadAllPosts() {
    return Object.entries(postModules)
        .map(([, mod]) => {
            const fm = mod.frontmatter || {};
            return {
                title: fm.title || '',
                slug: fm.slug || '',
                excerpt: fm.excerpt || '',
                publishedAt: fm.publishedAt || '',
                updatedAt: fm.updatedAt || fm.publishedAt || '',
                author: fm.author || 'Vesper Labs Editorial Team',
                coverImage: fm.coverImage || { src: '/og-image.svg', alt: '' },
                tags: Array.isArray(fm.tags) ? fm.tags : [],
                seo: fm.seo || {
                    metaTitle: fm.title || '',
                    metaDescription: fm.excerpt || '',
                    ogImage: '/og-image.svg'
                },
                body: mod.body || ''
            };
        })
        .filter((post) => post.title && post.slug)
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

let cachedPosts = null;

function getPosts() {
    if (!cachedPosts) {
        cachedPosts = loadAllPosts();
    }
    return cachedPosts;
}

export async function getAllPosts() {
    return getPosts();
}

export async function getPostBySlug(slug) {
    if (!slug) return undefined;
    return getPosts().find((post) => post.slug === slug);
}

export async function getRelatedPosts(tags = [], currentSlug, limit = 3) {
    const posts = getPosts();

    if (!Array.isArray(tags) || tags.length === 0) {
        return [];
    }

    const tagSet = new Set(tags);

    return posts
        .filter((post) => post.slug !== currentSlug)
        .map((post) => ({
            ...post,
            _score: post.tags.reduce((score, tag) => score + Number(tagSet.has(tag)), 0)
        }))
        .filter((post) => post._score > 0)
        .sort((a, b) => b._score - a._score || new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, limit)
        .map(({ _score, ...post }) => post);
}
