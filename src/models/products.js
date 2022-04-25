const { response } = require("express");
const db = require("../config/db");

const createNewProducts = (body) => {
    return new Promise((resolve, reject) => {
        const { name, id_size, description, id_delivery_method, start_hours, end_hours, stock, pictures, id_users } = body;
        const sqlQuery =
            "INSERT INTO products (name, id_size, description, id_delivery_method, start_hours, end_hours, stock, pictures, id_users) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *";
        db.query(sqlQuery, [name, id_size, description, id_delivery_method, start_hours, end_hours, stock, pictures, id_users])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const getAllProductsfromServer = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM products")
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

const updateProducts = (params, body) => {
    return new Promise((resolve, reject) => {
        const { id } = params
        const { name, id_size, description, id_delivery_method, start_hours, end_hours, stock, pictures, id_users } = body;
        const sqlQuery =
            "UPDATE products SET name=$1, id_size=$3, description=$4, id_delivery_method=$5, start_hours=$6, end_hours=$7, stock=$8, pictures=$9, id_users=$10 where id=$11 returning *";
        db.query(sqlQuery, [name, id_size, description, id_delivery_method, start_hours, end_hours, stock, pictures, id_users, id])
            .then((result) => {
                resolve({
                    data: result.rows,
                    msg: null,
                })
            })
            .catch((err) => reject({ status: 500, err }));
    });
};

const deleteDataProductsfromServer = (params) => {
    return new Promise((resolve, reject) => {
        const { id } = params;
        const sqlQuery = "DELETE FROM products WHERE id=$1 returning *";
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

const findProducts = (query) => {
    return new Promise((resolve, reject) => {
      // asumsikan query berisikan title, order, sort
      const name = query.name;
      let sqlQuery =
        "select * from products where lower(name) like lower('%' || $1 || '%')";
      db.query(sqlQuery, [`%${name}%`])
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
        });
    });
  };

module.exports = {
    createNewProducts,
    getAllProductsfromServer,
    updateProducts,
    deleteDataProductsfromServer,
    findProducts,
};