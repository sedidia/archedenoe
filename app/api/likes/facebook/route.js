const fbRes = await fetch(`https://graph.facebook.com/${fbVideoId}/likes`, {
  method: 'POST',
  body: JSON.stringify({
    access_token: process.env.FB_PAGE_ACCESS_TOKEN
  }),
  headers: { 'Content-Type': 'application/json' }
});