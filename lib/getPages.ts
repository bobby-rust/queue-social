"use server";
const getPages = (user_id: string) => {
    const fetchPages = async () => {
        const response = await fetch(`/api/users/${user_id}/pages`);
        const pages = await response.json();
        return pages;
    };
    const pages = fetchPages();
    return pages;
};

export default getPages;
