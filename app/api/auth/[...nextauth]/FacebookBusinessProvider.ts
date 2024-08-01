import { Provider } from "next-auth/providers/index";

export const FacebookBusinessProvider = {
    id: "facebook_business",
    name: "Facebook for Business",
    type: "oauth",
    authorization: {
        url: "https://www.facebook.com/v20.0/dialog/oauth",
        params: {
            config_id: process.env.FACEBOOK_CONFIG_ID,
        },
    },
    token: {
        url: "https://graph.facebook.com/oauth/access_token",
    },
    userinfo: {
        url: "https://graph.facebook.com/me",
        params: { fields: "id,name,email,picture" },
        async request({ tokens, client, provider }: any) {
            return await client.userinfo(tokens.access_token!, {
                params: provider.userinfo?.params,
            });
        },
    },
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    profile(profile: any) {
        return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture.data.url,
        };
    },
    httpOptions: {
        timeout: 100000,
    }
} satisfies Provider;
