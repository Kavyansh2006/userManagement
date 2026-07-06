export const getUsers = () => {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
};

export const saveUsers = (users) => {
    localStorage.setItem("users" , JSON.stringify(users));
};