"use server";
const getSocialPages = async (user_id: string) => {
    const response = await fetch(`http://localhost:3000/api/users/${user_id}/pages`);
    const pages = await response.json();
    return pages;
};

export default getSocialPages;
