import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import PageMeta from '../components/PageMeta.jsx';
import { getPostBySlug } from '../content/blog/index.js';

function formatDate(dateValue) {
    return new Date(dateValue).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export default function BlogPost() {
    const { slug } = useParams();
    const [post, setPost] = useState(undefined);

    useEffect(() => {
        let mounted = true;

        if (!slug) {
            setPost(null);
            return () => {
                mounted = false;
            };
        }

        getPostBySlug(slug).then((entry) => {
            if (mounted) {
                setPost(entry ?? null);
            }
        });

        return () => {
            mounted = false;
        };
    }, [slug]);

    if (post === undefined) {
        return null;
    }

    if (!post) {
        return (
            <section className="section" aria-labelledby="missing-post-heading">
                <div className="container blog-missing-post">
                    <PageMeta
                        title="Post not found | Vesper Labs"
                        description="The requested post could not be found on the Vesper Labs blog."
                        path={`/blog/${slug ?? ''}`}
                    />
                    <h1 id="missing-post-heading">Post not found</h1>
                    <p>The article you are looking for does not exist or has moved.</p>
                    <Link to="/blog" className="btn">
                        Back to blog
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <>
            <PageMeta
                title={post.seo.metaTitle}
                description={post.seo.metaDescription}
                path={`/blog/${post.slug}`}
                image={post.seo.ogImage}
            />

            <section className="section" aria-labelledby="blog-post-heading">
                <div className="container">
                    <article className="blog-post">
                        <header className="blog-post-header">
                            <p className="blog-card-date">Published {formatDate(post.publishedAt)}</p>
                            {post.updatedAt && post.updatedAt !== post.publishedAt && (
                                <p className="blog-card-date">Updated {formatDate(post.updatedAt)}</p>
                            )}
                            <h1 id="blog-post-heading">{post.title}</h1>
                            <p>{post.excerpt}</p>
                            <p className="blog-card-date">By {post.author}</p>

                            {post.tags.length > 0 && (
                                <ul className="blog-tag-list" aria-label="Post topics">
                                    {post.tags.map((tag) => (
                                        <li key={tag}>{tag}</li>
                                    ))}
                                </ul>
                            )}
                        </header>

                        {post.coverImage?.src && post.coverImage.src !== '/og-image.svg' && (
                            <img
                                className="blog-post-cover"
                                src={post.coverImage.src}
                                alt={post.coverImage.alt}
                            />
                        )}

                        <div className="blog-post-body">
                            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {post.body}
                            </Markdown>
                        </div>

                        <footer className="blog-post-footer">
                            <Link to="/blog" className="btn">
                                &larr; Back to blog
                            </Link>
                        </footer>
                    </article>
                </div>
            </section>
        </>
    );
}
