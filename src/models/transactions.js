const { reject } = require("bcrypt/promises");
const { response } = require("express");
const req = require("express/lib/request");
const db = require("../config/db");

const createNewTransactions = (body) => {
    return new Promise((resolve, reject) => {
        const { date, sub_total, payment_methods_id, products_id, qty, users_id, delivery_methods_id, promos_id,created_at, updated_at } = body;
        const sqlQuery =
            "INSERT INTO transactions (date, sub_total, payment_methods_id, products_id, qty, users_id, delivery_methods_id, promos_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *";
        db.query(sqlQuery, [date, sub_total, payment_methods_id, products_id, qty, users_id, delivery_methods_id, promos_id, created_at, updated_at])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const getAllTransactionsfromServer = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "select transactions.sub_total, products.name, products.pictures, transactions.delivery_methods_id, transactions.created_at from transactions join products on transactions.products_id = products.id join users  on transactions.users_id = users.id  where transactions.users_id = $1 order by created_at asc";
        db.query(sqlQuery, [id])
            .then((result) => {
                console.log(result)
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
        const { date, sub_total, payment_methods_id, created_at, updated_at, products_id, qty, users_id, delivery_methods_id, promos_id } = body;
        const sqlQuery =
            "UPDATE transactions SET date=COALESCE($1, date), sub_total=COALESCE($2, sub_total), payment_methods_id=COALESCE($3, payment_methods_id), created_at=COALESCE($4, created_at), updated_at=COALESCE($5, updated_at), products_id=COALESCE($6, products_id), qty=COALESCE($7, qty), users_id=COALESCE($8, users_id), delivery_methods_id=COALESCE($9, delivery_methods_id), promos_id=COALESCE($10, promos_id) where id=$11 returning *";
        db.query(sqlQuery, [date, sub_total, payment_methods_id, created_at, updated_at, products_id, qty, users_id, delivery_methods_id, promos_id, id])
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
                    data: data.rows,
                    msg: "Data Terhapus"
                }
            })
            .catch((err) => {
                reject({ status: 500, err });
            })
    })
}
const getProfitDashboard = () => {
    return new Promise((resolve, reject) => {
        let sqlQuery = "select date, sum(sub_total) as revenue from transactions where date > now() - interval '1 week' group by date order by date desc ";
        db.query(sqlQuery)
            .then((result) => {
                resolve({
                    data: result.rows,
                    msg: null,
                })
            })
            .catch((err) => {
                console.log(err)
                reject({ status: 500, err });
            })
    })
}
module.exports = {
    createNewTransactions,
    getAllTransactionsfromServer,
    updateTransactions,
    deleteDataTransactionsfromServer,
    getProfitDashboard
};
