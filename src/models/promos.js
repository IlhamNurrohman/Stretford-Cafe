const { response } = require("express");
const db = require("../config/db");

const createNewPromos = (body) => {
    return new Promise((resolve, reject) => {
        const { name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures } = body;
        const sqlQuery =
            "INSERT INTO promos (name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *";
        db.query(sqlQuery, [name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const getAllPromosfromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM promos")
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

const updatePromos = (params, body) => {
    return new Promise((resolve, reject) => {
        const { id } = params
        const { name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures } = body;
        const sqlQuery =
            "UPDATE promos SET name_product=COALESCE($1, name_product), normal_price=COALESCE($2, normal_price), description=COALESCE($3, description), sizes_id=COALESCE($4, sizes_id), delivery_methods_id=COALESCE($5, delivery_methods_id), discount=COALESCE($6, discount), start_date=COALESCE($7, start_date), end_date=COALESCE($8, end_date), coupon_code=COALESCE($9, coupon_code), pictures=COALESCE($10, pictures) where id=$11 returning *";
        db.query(sqlQuery, [name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, pictures, id])
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

const findPromos = (query) => {
    return new Promise((resolve, reject) => {
      // asumsikan query berisikan title, order, sort
      const { categories, find, order, sort } = query;
      let sqlQuery =
        "select * from promos";
        if (categories) {
            sqlQuery += " join categories on promos.categories_id = categories.id where lower(categories.name) = lower('" + categories + "') ";
        }
        if (find) {
            sqlQuery += " and lower(promos.coupon_code) = lower('" + find + "') ";
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
    getAllPromosfromServer,
    updatePromos,
    deleteDataPromosfromServer,
    findPromos,
};