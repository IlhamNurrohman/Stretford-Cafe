const { response } = require("express");
const db = require("../config/db");

const createNewCategories = (body) => {
    return new Promise((resolve, reject) => {
        const { name, description } = body;
        const sqlQuery =
            "INSERT INTO categories (name, description) VALUES ($1, $2) returning *";
        db.query(sqlQuery, [name, description])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const getAllCategoriesfromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM categories")
            .then((result) => {
                const response = {
                    total: result.rowCount,
                    data: result.rows,
                };
                resolve(response);
            })
            .catch((err) => {
                reject({ status: 500, err });
            })
    });
};

const updateCategories = (params, body) => {
    return new Promise((resolve, reject) => {
        const { id } = params
        const { name, description } = body;
        const sqlQuery =
            "UPDATE categories SET name=$1, description=$2 where id=$3 returning *";
        db.query(sqlQuery, [name, description, id])
            .then((result) => {
                resolve({
                    data: result.rows,
                    msg: null,
                })
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const deleteDataCategoriesfromServer = (params) => {
    return new Promise((resolve, reject) => {
        const { id } = params;
        const sqlQuery = "DELETE FROM categories WHERE id=$1 returning *";
        db.query(sqlQuery, [id])
            .then((data) => {
                if (data.rows.length === 0) {
                    return resolve({ status: 404, err: "" })
                }
                const response = {
                    data: data.rows[0],
                }
            })
            .catch((err) => {
                reject({ status: 500, err });
            })
    })
}

module.exports = {
    createNewCategories,
    getAllCategoriesfromServer,
    updateCategories,
    deleteDataCategoriesfromServer,
};