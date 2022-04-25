const { response } = require("express");
const db = require("../config/db");

const createNewDeliveryMethods = (body) => {
    return new Promise((resolve, reject) => {
        const { name, description } = body;
        const sqlQuery =
            "INSERT INTO delivery_methods (name, description) VALUES ($1, $2) returning *";
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

const getAllDeliveryMethodsfromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM delivery_methods")
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

const updateDeliveryMethods = (params, body) => {
    return new Promise((resolve, reject) => {
        const { id } = params
        const { name, description } = body;
        const sqlQuery =
            "UPDATE delivery_methods SET name=$1, description=$2 where id=$3 returning *";
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

const deleteDataDeliveryMethodsfromServer = (params) => {
    return new Promise((resolve, reject) => {
        const { id } = params;
        const sqlQuery = "DELETE FROM delivery_methods WHERE id=$1 returning *";
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
    createNewDeliveryMethods,
    getAllDeliveryMethodsfromServer,
    updateDeliveryMethods,
    deleteDataDeliveryMethodsfromServer,
};