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
                pathname: "/v/t1.30497-1/**",
            },
            {
                protocol: "https",
                hostname: "scontent-iad3-2.xx.fbcdn.net",
                port: "",
                pathname: "/v/t1.30497-1/**",
            },
            {
                protocol: "https",
                hostname: "utfs.io",
                port: "",
                pathname: "/f/**",
            },
            {
                protocol: "https",
                hostname: "pbs.twimg.com",
                port: "",
                pathname: "/profile_images/**",
            },
        ],
    },
};

export default nextConfig;
