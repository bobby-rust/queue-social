const API_URL = import.meta.env.VITE_API_URL;

export async function uploadImage(image: File[]) {
    const formData = new FormData();
    formData.append("image", image[0]);

    console.log(formData);

    const response = await fetch(API_URL + "/aws/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    const json = await response.json();

    return json;
}
