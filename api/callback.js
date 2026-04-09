export default async function handler(req, res) {
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({ error: 'Missing authorization code' });
    }

    const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
    const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return res.status(500).json({ error: 'OAuth credentials are not configured' });
    }

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(401).send(renderMessage('error', JSON.stringify(data)));
        }

        const token = data.access_token;
        const provider = 'github';

        return res.status(200).send(
            renderMessage('success', JSON.stringify({ token, provider }))
        );
    } catch (err) {
        console.error('OAuth callback error:', err);
        return res.status(500).send(renderMessage('error', err.message));
    }
}

function renderMessage(status, content) {
    return `<!DOCTYPE html>
<html>
<body>
<script>
(function() {
    function receiveMessage(e) {
        console.log("receiveMessage %o", e);
        window.opener.postMessage(
            'authorization:github:${status}:${content}',
            e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;
}
