export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).send("Missing `url` parameter");

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.fancode.com/'  // Use Sonyliv if needed
      }
    });

    const contentType = response.headers.get('content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', contentType || 'application/vnd.apple.mpegurl');

    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
}
