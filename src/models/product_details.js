const { response } = require("express");
const db = require("../config/db");

const createNewProductDetails = (body) => {
    return new Promise((resolve, reject) => {
        const { id_users, qty, id_delivery, now, time } = body;
        const sqlQuery =
            "INSERT INTO product_details (products_id, users_id, qty, delivery_method_id, now, time) VALUES ($1, $2, $3, $4, $5, $6) returning *";
        db.query(sqlQuery, [id_products, id_users, qty, id_delivery, now, time])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const getAllProductDetailsfromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM product_details ")
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

const updateProductDetails = (params, body) => {
    return new Promise((resolve, reject) => {
        const { id } = params
        const { id_products, id_users, qty, id_delivery, now, time } = body;
        const sqlQuery =
            "UPDATE product_details SET products_id=$1, id_users=$2, qty=$3, id_delivery=$4, now=$5, time=$6 where id=$7 returning *";
        db.query(sqlQuery, [id_products, id_users, qty, id_delivery, now, time, id])
            .then((result) => {
                resolve({
                    data: result.rows,
                    msg: null,
                })
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const deleteDataProductDetailsfromServer = (params) => {
    return new Promise((resolve, reject) => {
        const { id } = params;
        const sqlQuery = "DELETE FROM product_details WHERE id=$1 returning *";
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
    createNewProductDetails,
    getAllProductDetailsfromServer,
    updateProductDetails,
    deleteDataProductDetailsfromServer,
};