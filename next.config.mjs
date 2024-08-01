/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/a/*",
            },
            {
                protocol: "https",
                hostname: "scontent-ord5-2.xx.fbcdn.net",
                port: "",
                pathname: '/v/t1.30497-1/**',
            }

        ],
    },
};

export default nextConfig;
