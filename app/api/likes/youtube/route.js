const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

await youtube.videos.rate({
  id: videoId, // L'ID reçu lors de la publication
  rating: 'like' // Peut être 'like', 'dislike', ou 'none'
});