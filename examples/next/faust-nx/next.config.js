const wpUrl = new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL).hostname;

module.exports = {
  images: {
    domains: [wpUrl],
  },
}
