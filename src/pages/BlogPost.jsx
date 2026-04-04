import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta.jsx';
import { getPostBySlug } from '../data/posts.js';

function formatDate(dateValue) {
    return new Date(dateValue).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export default function BlogPost() {
    const { slug } = useParams();
    const post = useMemo(() => getPostBySlug(slug), [slug]);

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
                title={`${post.title} | Vesper Labs`}
                description={post.description ?? post.excerpt}
                path={`/blog/${post.slug}`}
                image={post.coverImage.src}
            />

            <section className="section" aria-labelledby="blog-post-heading">
                <div className="container">
                    <article className="blog-post">
                        <header className="blog-post-header">
                            <p className="blog-card-date">Published {formatDate(post.publishedAt)}</p>
                            {post.updatedAt && (
                                <p className="blog-card-date">Updated {formatDate(post.updatedAt)}</p>
                            )}
                            <h1 id="blog-post-heading">{post.title}</h1>
                            <p>{post.excerpt}</p>
                        </header>

                        <img
                            className="blog-post-cover"
                            src={post.coverImage.src}
                            alt={post.coverImage.alt}
                        />

                        <div className="blog-post-body">
                            {post.content.map((section) => (
                                <section key={section.heading}>
                                    <h2>{section.heading}</h2>
                                    {section.paragraphs.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}
                                </section>
                            ))}
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
}
