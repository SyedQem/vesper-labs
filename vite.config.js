import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import matter from 'gray-matter';

function markdownPlugin() {
    return {
        name: 'vite-plugin-markdown-frontmatter',
        transform(code, id) {
            if (!id.endsWith('.md')) return null;

            const { data, content } = matter(code);

            return {
                code: `export const frontmatter = ${JSON.stringify(data)};\nexport const body = ${JSON.stringify(content)};\nexport default { frontmatter, body };`,
                map: null
            };
        }
    };
}

export default defineConfig({
    plugins: [react(), markdownPlugin()],
});
