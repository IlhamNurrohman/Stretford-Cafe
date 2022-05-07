const { response } = require("express");
const db = require("../config/db");

const createNewProductDetails = (body) => {
    return new Promise((resolve, reject) => {
        const { products_id, users_id, qty, delivery_method_id, now, time } = body;
        const sqlQuery =
            "INSERT INTO product_details (products_id, users_id, qty, delivery_method_id, now, time) VALUES ($1, $2, $3, $4, $5, $6) returning *";
        db.query(sqlQuery, [products_id, users_id, qty, delivery_method_id, now, time])
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
        const { products_id, users_id, qty, delivery_method_id, now, time } = body;
        const sqlQuery =
            "UPDATE product_details SET products_id=$1, id_users=$2, qty=$3, id_delivery=$4, now=$5, time=$6 where id=$7 returning *";
        db.query(sqlQuery, [products_id, users_id, qty, delivery_method_id, now, time])
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

"UPDATE products SET name = coalesce(nullif($1, ''), name), sizes_id = coalesce(nullif($2, ''), sizes_id), description = coalesce(nullif($3, ''), description), delivery_methods_id = coalesce(nullif($4, ''), delivery_methods_id), start_hours = coalesce(nullif($5, ''), start_hours), end_hours = coalesce(nullif($6, ''), end_hours), stock = coalesce(nullif($7, ''), stock), pictures = coalesce(nullif($8, ''), pictures), categories_id = coalesce(nullif($9, ''), categories_id), price = coalesce(nullif($10, ''), price), created_at = coalesce(nullif($11, ''), created_at), updated_at = coalesce(nullif($12, ''), updated_at) WHERE id = $13 returning *"

"UPDATE products SET name=$1, sizes_id=$2, description=$3, delivery_methods_id=$4, start_hours=$5, end_hours=$6, stock=$7, pictures=$8, categories_id=$9, price=$10, created_at=$11, updated_at=$12 WHERE id=$13 returning *"