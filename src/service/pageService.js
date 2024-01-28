const url = "http://localhost:3000/pages"

export const createPage = async (page) => {
    const response = await fetch(url + "/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(page),
    });
    return await response.json();
}
export const getPages = async () => {
    const response = await fetch(url + "/getAll");
    return await response.json();
}
