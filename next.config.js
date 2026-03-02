/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    headers: async () => [
        {
            // Cache video files aggressively (1 year, immutable)
            source: '/:path*.mp4',
            headers: [
                { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
            ],
        },
        {
            // Cache images aggressively
            source: '/:path*.(jpg|jpeg|png|webp|svg|gif)',
            headers: [
                { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
            ],
        },
        {
            source: '/(.*)',
            headers: [
                { key: 'X-Frame-Options', value: 'DENY' },
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                { key: 'X-XSS-Protection', value: '1; mode=block' },
            ],
        },
    ],
};

module.exports = nextConfig;
