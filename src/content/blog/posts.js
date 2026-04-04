export const posts = [
    {
        title: 'Shipping Faster with a Product-Grade Design System',
        slug: 'shipping-fast-with-design-systems',
        excerpt:
            'How our team codifies interface patterns to reduce regressions, increase delivery speed, and keep UX quality high across releases.',
        publishedAt: '2026-02-10',
        updatedAt: '2026-03-01',
        author: 'Vesper Labs Editorial Team',
        coverImage: {
            src: '/og-image.svg',
            alt: 'Abstract monochrome geometric composition representing a design system.'
        },
        tags: ['Design Systems', 'Frontend', 'Process'],
        body: [
            {
                heading: 'Why consistency matters at scale',
                paragraphs: [
                    'As product scope grows, visual and interaction inconsistencies become expensive. Teams lose time re-implementing patterns and QA effort increases with every release.',
                    'A practical design system reduces repeated decisions and gives engineers reliable building blocks they can compose quickly.'
                ]
            },
            {
                heading: 'Implementation patterns that worked for us',
                paragraphs: [
                    'We focus on primitives first: typography tokens, spacing rules, and color semantics. From there, we build reusable components with clear API contracts.',
                    'Each component ships with usage examples and accessibility guidance to keep implementation decisions obvious for every team member.'
                ]
            }
        ],
        seo: {
            metaTitle: 'Shipping Faster with a Product-Grade Design System | Vesper Labs',
            metaDescription:
                'Learn how Vesper Labs uses design systems to ship user-facing features faster without sacrificing quality.',
            ogImage: '/og-image.svg'
        }
    },
    {
        title: 'Observability for Modern Product Teams',
        slug: 'observability-for-modern-products',
        excerpt:
            'A practical playbook for combining logs, traces, and user telemetry to spot issues before customers do.',
        publishedAt: '2026-01-18',
        updatedAt: '2026-01-18',
        author: 'Vesper Labs Engineering',
        coverImage: {
            src: '/og-image.svg',
            alt: 'Stylized line graph and signal waves indicating system observability metrics.'
        },
        tags: ['Observability', 'Reliability', 'Engineering'],
        body: [
            {
                heading: 'Signal over noise',
                paragraphs: [
                    'Dashboards are useful, but they are not enough. Teams need agreed service-level indicators and alert thresholds that map to customer impact.',
                    'When incidents happen, clear tracing and structured logs reduce time-to-diagnosis and help teams recover faster.'
                ]
            }
        ],
        seo: {
            metaTitle: 'Observability for Modern Product Teams | Vesper Labs',
            metaDescription:
                'A practical guide to implementing observability workflows that improve reliability and customer confidence.',
            ogImage: '/og-image.svg'
        }
    },
    {
        title: 'Pragmatic AI in Product Development',
        slug: 'pragmatic-ai-in-product-development',
        excerpt:
            'Where AI features create durable value, and where traditional product improvements are still the better bet.',
        publishedAt: '2025-12-02',
        updatedAt: '2025-12-02',
        author: 'Vesper Labs Product',
        coverImage: {
            src: '/og-image.svg',
            alt: 'Minimal monochrome network nodes connected to represent practical AI systems.'
        },
        tags: ['AI', 'Product Strategy'],
        body: [
            {
                heading: 'Start with workflows, not models',
                paragraphs: [
                    'The best AI features remove friction in a customer workflow. We start by mapping repetitive decisions and identifying where confidence can be measured.',
                    'A narrowly scoped model in the right workflow usually beats a broad but unreliable assistant.'
                ]
            }
        ],
        seo: {
            metaTitle: 'Pragmatic AI in Product Development | Vesper Labs',
            metaDescription:
                'Explore practical ways to ship AI features that solve real customer problems and avoid unnecessary complexity.',
            ogImage: '/og-image.svg'
        }
    }
];
