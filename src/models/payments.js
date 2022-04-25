const { response } = require("express");
const db = require("../config/db");

const createNewPayments = (body) => {
    return new Promise((resolve, reject) => {
        const { date, sub_total, id_payment_method, id_transactions } = body;
        const sqlQuery =
            "INSERT INTO payments (date, sub_total, id_payment_method, id_transactions) VALUES ($1, $2, $3, $4) returning *";
        db.query(sqlQuery, [date, sub_total, id_payment_method, id_transactions])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const getAllPaymentsfromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM payments")
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

const updatePayments = (params, body) => {
    return new Promise((resolve, reject) => {
        const { id } = params
        const { date, sub_total, id_payment_method, id_transactions } = body;
        const sqlQuery =
            "UPDATE payments SET date=$1, sub_total=$2, id_payment_method=$3, id_transactions=$4 where id=$5 returning *";
        db.query(sqlQuery, [date, sub_total, id_payment_method, id_transactions, id])
            .then((result) => {
                resolve({
                    data: result.rows,
                    msg: null,
                })
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const deleteDataPaymentsfromServer = (params) => {
    return new Promise((resolve, reject) => {
        const { id } = params;
        const sqlQuery = "DELETE FROM payments WHERE id=$1 returning *";
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
    createNewPayments,
    getAllPaymentsfromServer,
    updatePayments,
    deleteDataPaymentsfromServer,
};