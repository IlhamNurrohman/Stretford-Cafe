const { response } = require("express");
const db = require("../config/db");

const createNewPromos = (body) => {
    return new Promise((resolve, reject) => {
        const { name_product, normal_price, description, id_size, id_delivery_method, discount, start_date, end_date, coupon_code, pictures } = body;
        const sqlQuery =
            "INSERT INTO promos (name_product, normal_price, description, id_size, id_delivery_method, discount, start_date, end_date, coupon_code, pictures) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *";
        db.query(sqlQuery, [name_product, normal_price, description, id_size, id_delivery_method, discount, start_date, end_date, coupon_code, pictures])
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
        const { name_product, normal_price, description, id_size, id_delivery_method, discount, start_date, end_date, coupon_code, pictures } = body;
        const sqlQuery =
            "UPDATE promos SET name_product=$1, normal_price=$2, description=$3, id_size=$4, id_delivery_method=$5, discount=$6, start_date=$7, end_date=$8, coupon_code=$9, pictures=$10 where id=$11 returning *";
        db.query(sqlQuery, [name_product, normal_price, description, id_size, id_delivery_method, discount, start_date, end_date, coupon_code, pictures, id])
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
      const coupon_code = query.coupon_code;
      let sqlQuery =
        "select * from promos where lower(coupon_code) like lower('%' || $1 || '%')";
      db.query(sqlQuery, [`%${coupon_code}%`])
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