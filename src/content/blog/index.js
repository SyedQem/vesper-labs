import { posts as localPosts } from './posts.js';

const REQUIRED_POST_FIELDS = [
    'title',
    'slug',
    'excerpt',
    'publishedAt',
    'updatedAt',
    'author',
    'coverImage',
    'tags',
    'body',
    'seo'
];

const REQUIRED_SEO_FIELDS = ['metaTitle', 'metaDescription', 'ogImage'];

function assertNonEmptyString(value, fieldPath) {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`[content/blog] Expected non-empty string for "${fieldPath}".`);
    }
}

function assertDateString(value, fieldPath) {
    assertNonEmptyString(value, fieldPath);
    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
        throw new Error(`[content/blog] Invalid date string for "${fieldPath}": ${value}`);
    }
}

function validatePost(post, index, knownSlugs) {
    REQUIRED_POST_FIELDS.forEach((field) => {
        if (!(field in post)) {
            throw new Error(`[content/blog] Missing required field "${field}" at post index ${index}.`);
        }
    });

    assertNonEmptyString(post.title, `posts[${index}].title`);
    assertNonEmptyString(post.slug, `posts[${index}].slug`);
    assertNonEmptyString(post.excerpt, `posts[${index}].excerpt`);
    assertDateString(post.publishedAt, `posts[${index}].publishedAt`);
    assertDateString(post.updatedAt, `posts[${index}].updatedAt`);
    assertNonEmptyString(post.author, `posts[${index}].author`);

    if (knownSlugs.has(post.slug)) {
        throw new Error(`[content/blog] Duplicate slug detected: "${post.slug}".`);
    }

    knownSlugs.add(post.slug);

    if (!post.coverImage || typeof post.coverImage !== 'object') {
        throw new Error(`[content/blog] Invalid coverImage object at posts[${index}].coverImage.`);
    }

    assertNonEmptyString(post.coverImage.src, `posts[${index}].coverImage.src`);
    assertNonEmptyString(post.coverImage.alt, `posts[${index}].coverImage.alt`);

    if (!Array.isArray(post.tags) || post.tags.length === 0) {
        throw new Error(`[content/blog] posts[${index}].tags must be a non-empty array.`);
    }

    post.tags.forEach((tag, tagIndex) => {
        assertNonEmptyString(tag, `posts[${index}].tags[${tagIndex}]`);
    });

    if (!Array.isArray(post.body) || post.body.length === 0) {
        throw new Error(`[content/blog] posts[${index}].body must be a non-empty array.`);
    }

    post.body.forEach((section, sectionIndex) => {
        if (!section || typeof section !== 'object') {
            throw new Error(`[content/blog] posts[${index}].body[${sectionIndex}] must be an object.`);
        }

        assertNonEmptyString(section.heading, `posts[${index}].body[${sectionIndex}].heading`);

        if (!Array.isArray(section.paragraphs) || section.paragraphs.length === 0) {
            throw new Error(
                `[content/blog] posts[${index}].body[${sectionIndex}].paragraphs must be a non-empty array.`
            );
        }

        section.paragraphs.forEach((paragraph, paragraphIndex) => {
            assertNonEmptyString(
                paragraph,
                `posts[${index}].body[${sectionIndex}].paragraphs[${paragraphIndex}]`
            );
        });
    });

    if (!post.seo || typeof post.seo !== 'object') {
        throw new Error(`[content/blog] Invalid seo object at posts[${index}].seo.`);
    }

    REQUIRED_SEO_FIELDS.forEach((field) => {
        if (!(field in post.seo)) {
            throw new Error(`[content/blog] Missing seo field "${field}" at post index ${index}.`);
        }

        assertNonEmptyString(post.seo[field], `posts[${index}].seo.${field}`);
    });
}

function validatePosts(posts) {
    if (!Array.isArray(posts)) {
        throw new Error('[content/blog] Adapter response must be an array of posts.');
    }

    const knownSlugs = new Set();
    posts.forEach((post, index) => validatePost(post, index, knownSlugs));

    return posts;
}

function createLocalBlogAdapter(seedPosts) {
    return {
        async listPosts() {
            return seedPosts;
        }
    };
}

function createBlogRepository(adapter) {
    let memoizedPosts;

    async function loadPosts() {
        if (!memoizedPosts) {
            const entries = await adapter.listPosts();
            memoizedPosts = validatePosts(entries);
        }

        return memoizedPosts;
    }

    return {
        async getAllPosts() {
            const posts = await loadPosts();
            return [...posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        },
        async getPostBySlug(slug) {
            assertNonEmptyString(slug, 'slug');
            const posts = await loadPosts();
            return posts.find((post) => post.slug === slug);
        },
        async getRelatedPosts(tags = [], currentSlug, limit = 3) {
            const posts = await loadPosts();

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
    };
}

const blogRepository = createBlogRepository(createLocalBlogAdapter(localPosts));

export const getAllPosts = () => blogRepository.getAllPosts();
export const getPostBySlug = (slug) => blogRepository.getPostBySlug(slug);
export const getRelatedPosts = (tags, currentSlug, limit) =>
    blogRepository.getRelatedPosts(tags, currentSlug, limit);

export { createBlogRepository };
