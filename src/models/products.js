const { response } = require("express");
const db = require("../config/db");

const createNewProducts = (body) => {
    return new Promise((resolve, reject) => {
        const { name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, pictures, categories_id, price } = body;
        const sqlQuery =
            "INSERT INTO products (name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, pictures, categories_id, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *";
        db.query(sqlQuery, [name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, pictures, categories_id, price])
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
        const { name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, pictures, categories_id, price } = body;
        const sqlQuery =
            "UPDATE products SET name=$1, sizes_id=$2, description=$3, delivery_methods_id=$4, start_hours=$5, end_hours=$6, stock=$7, pictures=$8, categories_id=$9, price=$10 where id=$11 returning *";
        db.query(sqlQuery, [name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, pictures, categories_id, price, id])
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

const filterProductCoffee = (query) => {
    return new Promise((resolve, reject) => {
        const { categories, sort, order } = query;
        let sqlQuery = "select * from products ";
        if (categories) {
            sqlQuery += " join categories on products.categories_id = categories.id where lower(categories.name) = lower('" + categories + "') ";
        }
        if (sort) {
            sqlQuery += "order by" + sort + " " + order
        }
        db.query(sqlQuery)
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

const sortProductsPrice = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from products order by price desc")
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

const sortProductsTime = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from products order by created_at desc")
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

const sortProductsTransactions = () => {
    return new Promise((resolve, reject) => {
        db.query("select p.name, p.price, p.pictures from products p join product_details pd on p.id = pd.products_id join transactions t on pd.id = t.product_details_id group by p.name, p.price, p.pictures order by count(*) desc")
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

const sortProducts = (query) => {
    return new Promise((resolve, reject) => {
        // asumsikan query berisikan title, order, sort
        const { order, sort } = query;
        let sqlQuery =
            "select name, price, pictures from products";
        if (order) {
            sqlQuery += " order by " + sort + " " + order;
        }
        db.query(sqlQuery)
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
    filterProductCoffee,
    sortProducts,
    sortProductsTransactions,
};