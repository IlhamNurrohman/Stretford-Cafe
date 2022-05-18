const { response } = require("express");
const db = require("../config/db");

const createNewPromos = (req, file) => {
    return new Promise((resolve, reject) => {
        const { name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, categories_id, created_at, updated_at } = req.body;
        const pictures = file ? file.path.replace("public", "").replace(/\\/g, "/") : null;
        const sqlQuery =
            "INSERT INTO promos (name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures, categories_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *";
        db.query(sqlQuery, [name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures, categories_id, created_at, updated_at])
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

const updatePromos = (req, file) => {
    return new Promise((resolve, reject) => {
        const { id } = req.params
        const { name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, categories_id, created_at, updated_at } = req.body;
        const pictures = file ? file.path.replace("public", "").replace(/\\/g, "/") : null;
        const sqlQuery =
            "UPDATE promos SET name_product=COALESCE($1, name_product), normal_price=COALESCE($2, normal_price), description=COALESCE($3, description), sizes_id=COALESCE($4, sizes_id), delivery_methods_id=COALESCE($5, delivery_methods_id), discount=COALESCE($6, discount), start_date=COALESCE($7, start_date), end_date=COALESCE($8, end_date), coupon_code=COALESCE($9, coupon_code), pictures=COALESCE($10, pictures), categories_id=COALESCE($11, categories_id), created_at=COALESCE($12, created_at), updated_at=COALESCE($13, updated_at) where id=$14 returning *";
        db.query(sqlQuery, [name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures, categories_id, created_at, updated_at, id])
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
        const { find, categories, sort = "categories_id", order = "desc", page = 1, limit = 3 } = query;
        let offset = (Number(page) - 1) * Number(limit);
        let totalParam = [];
        let arr = [];
        let totalQuery = "select count(promos.id) as total_promos from promos join categories on promos.categories_id = categories.id";
        let sqlQuery =
            "select promos.name_product, promos.discount, promos.normal_price, promos.coupon_code from promos join categories on promos.categories_id = categories.id";
        if (!find && !categories) {
            sqlQuery += " order by " + sort + " " + order + " LIMIT $1 OFFSET $2";
            arr.push(Number(limit), offset)
        }
        if (find && !categories) {
            sqlQuery += " where lower(promos.coupon_code) like lower('%' || $1 || '%') order by " + sort + " " + order + " LIMIT $2 OFFSET $3";
            totalQuery += " where lower(promos.coupon_code) like lower('%' || $1 || '%')";
            arr.push(find, Number(limit), offset);
            totalParam.push(find);
        }
        if (categories && !find) {
            sqlQuery += " where lower(categories.name) = lower($1) order by " + sort + " " + order + " LIMIT $2 OFFSET $3";
            totalQuery += " where lower(categories.name) = lower($1)";
            arr.push(categories, Number(limit), offset);
            totalParam.push(categories);
        }
        if (find && categories) {
            sqlQuery += " where lower(promos.coupon_code) like lower('%' || $1 || '%') and lower(categories.name) = lower($2) order by " + sort + " " + order + " LIMIT $3 OFFSET $4";
            totalQuery += " where lower(promos.coupon_code) like lower('%' || $1 || '%') and lower(categories.name) = lower($2)";
            arr.push(find, categories, Number(limit), offset);
            totalParam.push(find, categories);
        }
        db.query(sqlQuery, arr)
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Promo Not Found" });
                }
                const response = {
                    total: result.rowCount,
                    data: result.rows,
                };
                db.query(totalQuery, totalParam)
                    .then((result) => {
                        response.totalData = Number(result.rows[0]["total_promos"]);
                        response.totalPage = Math.ceil(response.totalData / Number(limit));
                        resolve(response);
                    })
                    .catch(err => {
                        reject({ status: 500, err });
                    });
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