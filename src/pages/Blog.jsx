import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta.jsx';
import { getAllPosts } from '../data/posts.js';

const POSTS_PER_PAGE = 6;

function formatDate(dateValue) {
    return new Date(dateValue).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export default function Blog() {
    const posts = useMemo(() => getAllPosts(), []);
    const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

    const visiblePosts = posts.slice(0, visibleCount);
    const hasMorePosts = visibleCount < posts.length;

    return (
        <>
            <PageMeta
                title="Blog | Vesper Labs"
                description="Insights from Vesper Labs on engineering, design, and product craftsmanship."
                path="/blog"
            />

            <section className="section" aria-labelledby="blog-page-heading">
                <div className="container">
                    <header className="blog-page-header">
                        <h1 id="blog-page-heading">Blog</h1>
                        <p>Stories and perspectives from the Vesper Labs team.</p>
                    </header>

                    {posts.length === 0 ? (
                        <article className="blog-empty-state" aria-live="polite">
                            <h2>No posts yet</h2>
                            <p>We are preparing new insights. Check back soon for updates.</p>
                        </article>
                    ) : (
                        <>
                            <div className="blog-grid" role="list">
                                {visiblePosts.map((post) => (
                                    <article className="blog-card" key={post.slug} role="listitem">
                                        <img src={post.coverImage.src} alt={post.coverImage.alt} loading="lazy" />
                                        <div className="blog-card-content">
                                            <p className="blog-card-date">{formatDate(post.publishedAt)}</p>
                                            <h2>
                                                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                            </h2>
                                            <p>{post.excerpt}</p>
                                            <ul className="blog-tag-list" aria-label="Post topics">
                                                {post.tags.map((tag) => (
                                                    <li key={tag}>{tag}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {hasMorePosts && (
                                <div className="blog-load-more">
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => setVisibleCount((count) => count + POSTS_PER_PAGE)}
                                    >
                                        Load more posts
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
