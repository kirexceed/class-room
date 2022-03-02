import axios from "axios";

export const getTables = axios
    .get("http://goodsok.ru/mock-api/objects.php")
    .then((res) => {
        return res.data
    });

export const getUsers = axios
    .get("http://goodsok.ru/mock-api/users.php")
    .then((res) => {
        return res.data
    });