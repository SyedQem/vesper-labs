export default function handler(req, res) {
    const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;

    if (!clientId) {
        return res.status(500).json({ error: 'OAUTH_GITHUB_CLIENT_ID is not configured' });
    }

    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const redirectUri = `${protocol}://${host}/api/callback`;

    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', 'repo,user');

    res.redirect(307, authUrl.toString());
}
