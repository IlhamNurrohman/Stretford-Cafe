const { response } = require("express");
const db = require("../config/db");

const createNewPromos = (body) => {
    return new Promise((resolve, reject) => {
        const { name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures, categories_id } = body;
        const sqlQuery =
            "INSERT INTO promos (name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures, categories_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *";
        db.query(sqlQuery, [name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures, categories_id])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const findPromosfromServer = (query) => {
    return new Promise((resolve, reject) => {
        const { find } = query;
        let sqlQuery =
            "select promos.name_product, promos.discount, promos.normal_price, promos.coupon_code from promos join categories on promos.categories_id = categories.id";
        if (find) {
            sqlQuery += " where lower(promos.coupon_code) like lower('%' || $1 || '%') ";
        }
        db.query(sqlQuery, [find])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Product Not Found" });
                }
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

const updatePromos = (params, body) => {
    return new Promise((resolve, reject) => {
        const { id } = params
        const { name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures, categories_id } = body;
        const sqlQuery =
            "UPDATE promos SET name_product=COALESCE($1, name_product), normal_price=COALESCE($2, normal_price), description=COALESCE($3, description), sizes_id=COALESCE($4, sizes_id), delivery_methods_id=COALESCE($5, delivery_methods_id), discount=COALESCE($6, discount), start_date=COALESCE($7, start_date), end_date=COALESCE($8, end_date), coupon_code=COALESCE($9, coupon_code), pictures=COALESCE($10, pictures), categories_id=COALESCE($11, categories_id) where id=$12 returning *";
        db.query(sqlQuery, [name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures, categories_id, id])
            .then((result) => {
                resolve({
                    data: result.rows,
                    msg: null,
                })
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const deleteDataPromosfromServer = (params) => {
    return new Promise((resolve, reject) => {
        const { id } = params;
        const sqlQuery = "DELETE FROM promos WHERE id=$1 returning *";
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

const sortPromos = (query) => {
    return new Promise((resolve, reject) => {
        // asumsikan query berisikan title, order, sort
        const { categories, order, sort } = query;
        let sqlQuery =
            "select promos.name_product, promos.discount, promos.normal_price, promos.coupon_code from promos join categories on promos.categories_id = categories.id";
        // if (find) {
        //     sqlQuery += " where lower(promos.coupon_code) like lower('%' || $1 || '%') ";
        // }
        if (categories) {
            sqlQuery += " where lower(categories.name) = lower('" + categories + "') ";
        }
        if (order) {
            sqlQuery += " order by " + sort + " " + order;
        }
        db.query(sqlQuery)
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Promo Not Found" });
                }
                const response = {
                    total: result.rowCount,
                    data: result.rows,
                };
                resolve(response);
            })
            .catch((err) => {
                reject({ status: 500, err });
            });
    });
};


module.exports = {
    createNewPromos,
    findPromosfromServer,
    updatePromos,
    deleteDataPromosfromServer,
    sortPromos,
};