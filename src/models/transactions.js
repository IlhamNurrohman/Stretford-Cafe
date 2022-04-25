const { response } = require("express");
const db = require("../config/db");

const createNewTransactions = (body) => {
    return new Promise((resolve, reject) => {
        const { date, sub_total, id_payment_method, product_details_id } = body;
        const sqlQuery =
            "INSERT INTO transactions (date, sub_total, payment_method_id, product_details_id) VALUES ($1, $2, $3, $4) returning *";
        db.query(sqlQuery, [date, sub_total, id_payment_method, product_details_id])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const getAllTransactionsfromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM transactions")
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

const updateTransactions = (params, body) => {
    return new Promise((resolve, reject) => {
        const { id } = params
        const { date, sub_total, id_payment_method, product_details_id } = body;
        const sqlQuery =
            "UPDATE transactions SET date=$1, sub_total=$2, payment_method_id=$3, product_details_id=$4 where id=$5 returning *";
        db.query(sqlQuery, [date, sub_total, id_payment_method, product_details_id, id])
            .then((result) => {
                resolve({
                    data: result.rows,
                    msg: null,
                })
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const deleteDataTransactionsfromServer = (params) => {
    return new Promise((resolve, reject) => {
        const { id } = params;
        const sqlQuery = "DELETE FROM transactions WHERE id=$1 returning *";
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
    createNewTransactions,
    getAllTransactionsfromServer,
    updateTransactions,
    deleteDataTransactionsfromServer,
};