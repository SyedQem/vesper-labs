import { Helmet } from 'react-helmet-async';

const SITE = 'https://vesper-labs.vercel.app';

export default function Blog() {
    return (
        <>
            <Helmet>
                <title>Blog | Vesper Labs</title>
                <meta
                    name="description"
                    content="Insights from Vesper Labs on engineering, design, and product craftsmanship."
                />
                <link rel="canonical" href={`${SITE}/blog`} />
            </Helmet>

            <section className="section">
                <div className="container">
                    <h1>Blog</h1>
                    <p>Stories and perspectives from the Vesper Labs team.</p>
                </div>
            </section>
        </>
    );
}
