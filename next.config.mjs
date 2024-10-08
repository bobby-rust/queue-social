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
                hostname: "*.fbcdn.net",
                port: "",
                pathname: "/**",
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
