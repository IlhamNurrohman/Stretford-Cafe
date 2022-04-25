const { response } = require("express");
const db = require("../config/db");

const createNewsizes = (body) => {
    return new Promise((resolve, reject) => {
        const { name_size, price, description, id_product } = body;
        const sqlQuery =
            "INSERT INTO sizes (name_size, price, description, id_product) VALUES ($1, $2, $3, $4) returning *";
        db.query(sqlQuery, [name_size, price, description, id_product])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const getAllsizesfromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM sizes")
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

const updatesizes = (params, body) => {
    return new Promise((resolve, reject) => {
        const { id } = params
        const { name_size, price, description, id_product } = body;
        const sqlQuery =
            "UPDATE sizes SET name_size=$1, price=$2, description=$3, id_product=$4 where id=$5 returning *";
        db.query(sqlQuery, [name_size, price, description, id_product, id])
            .then((result) => {
                resolve({
                    data: result.rows,
                    msg: null,
                })
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const deleteDatasizesfromServer = (params) => {
    return new Promise((resolve, reject) => {
        const { id } = params;
        const sqlQuery = "DELETE FROM sizes WHERE id=$1 returning *";
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
    createNewsizes,
    getAllsizesfromServer,
    updatesizes,
    deleteDatasizesfromServer,
};