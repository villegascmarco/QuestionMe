let id = 0;






let getData = () => {
    return fetch(`${ASSETS_ROUTE}`)
        .then(resp => resp.json())
};

let edit = () => {
    return fetch(`${ASSETS_ROUTE}users/${user.id}`, {
        method: "PUT",
        headers: [
            ["Content-Type", "application/json"],
            ["Content-Type", "text/plain"]
        ],
        body: JSON.stringify(user)
    });
};