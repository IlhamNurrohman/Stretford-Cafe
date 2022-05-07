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

const updateProducts = (params, body) => {
    return new Promise((resolve, reject) => {
        const { id } = params
        const { name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, pictures, categories_id, price, created_at, updated_at } = body;
        const sqlQuery =
            "UPDATE products SET name = COALESCE(NULLIF($1, ''), name ), sizes_id = COALESCE($2, sizes_id), description = COALESCE(NULLIF($3, ''), description ), delivery_methods_id = COALESCE($4, delivery_methods_id), start_hours = COALESCE($5, start_hours), end_hours = COALESCE($6, end_hours), stock = COALESCE($7, stock), pictures = COALESCE(NULLIF($8, ''), pictures ), categories_id = COALESCE($9, categories_id), price = COALESCE($10, price), created_at = COALESCE($11, created_at), updated_at = COALESCE($12, updated_at) WHERE id=$13 returning *";
        db.query(sqlQuery, [name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, pictures, categories_id, price, created_at, updated_at, id])
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
                    data: data.rows,
                    msg: null,
                }
            })
            .catch((err) => {
                reject({ status: 500, err });
            })
    })
}

const sortProducts = (query) => {
    return new Promise((resolve, reject) => {
        // asumsikan query berisikan title, order, sort
        const { categories, find, order, sort } = query;
        let sqlQuery =
            "select products.name, products.price, products.pictures  from products";
        if (categories) {
            sqlQuery += " join categories on products.categories_id = categories.id where lower(categories.name) = lower('" + categories + "') ";
        }
        if (find) {
            sqlQuery += " and lower(products.name) = lower('" + find + "') ";
        }
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

module.exports = {
    createNewProducts,
    updateProducts,
    deleteDataProductsfromServer,
    sortProducts,
    sortProductsTransactions,
};





// const sortProductsPrice = () => {
//     return new Promise((resolve, reject) => {
//         db.query("select * from products order by price desc")
//             .then((result) => {
//                 const response = {
//                     total: result.rowCount,
//                     data: result.rows,
//                 };
//                 resolve(response);
//             })
//             .catch((err) => {
//                 reject({ status: 500, err });
//             })
//     });
// };

// const sortProductsTime = () => {
//     return new Promise((resolve, reject) => {
//         db.query("select * from products order by created_at desc")
//             .then((result) => {
//                 const response = {
//                     total: result.rowCount,
//                     data: result.rows,
//                 };
//                 resolve(response);
//             })
//             .catch((err) => {
//                 reject({ status: 500, err });
//             })
//     });
// };