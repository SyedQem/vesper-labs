import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const SITE = 'https://vesper-labs.vercel.app';

export default function BlogPost() {
    const { slug } = useParams();

    return (
        <>
            <Helmet>
                <title>Blog Post | Vesper Labs</title>
                <meta
                    name="description"
                    content="Read a Vesper Labs blog post on engineering, design, and digital product craft."
                />
                <link rel="canonical" href={`${SITE}/blog/${slug ?? ''}`} />
            </Helmet>

            <section className="section">
                <div className="container">
                    <h1>Blog Post</h1>
                    <p>Viewing post: {slug}</p>
                </div>
            </section>
        </>
    );
}
