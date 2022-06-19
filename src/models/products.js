const { response } = require("express");
const db = require("../config/db");

const createNewProducts = (req, file) => {
    return new Promise((resolve, reject) => {
        const { name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, categories_id, price, created_at, updated_at } = req.body;
        //const pictures = file ? file.path.replace("public", "").replace(/\\/g, "/") : null ;
        const pictures = file ? file.path : null;
        const sqlQuery =
            "INSERT INTO products (name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, pictures, categories_id, price, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *";
        db.query(sqlQuery, [name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, pictures, categories_id, price, created_at, updated_at])
            .then(({ rows }) => {
                const response = {
                    data: rows[0],
                };
                resolve(response);
            })
            .catch((err) => {
                console.log(err)
                reject({ status: 500, err })});
    });
};

const findProducts = (query) => {
    return new Promise((resolve, reject) => {
        // asumsikan query berisikan title, order, sort
        const { find } = query;
        let sqlQuery =
            "select products.name, products.price, products.pictures from products join categories on products.categories_id = categories.id";
        if (find) {
            sqlQuery += " where lower(products.name) like lower('%' || $1 || '%') ";
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
            });
    });
};

const updateProducts = (req, file) => {
    return new Promise((resolve, reject) => {
        const { id } = req.params;
        const { name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, categories_id, price, created_at, updated_at } = req.body;
        //const pictures = file ? file.path.replace("public", "").replace(/\\/g, "/") : null ;
        const pictures = file ? file.path : '';
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
        const { find, categories, sort = "categories_id", order = "desc", page = 1, limit = 12 } = query;
        let offset = (Number(page) - 1) * Number(limit);
        let totalParam = [];
        let arr = [];
        let totalQuery = "select count(products.id) as total_products from products join categories on products.categories_id = categories.id";
        let sqlQuery =
            "select products.id, products.name, products.price, products.pictures, categories.name as category from products join categories on products.categories_id = categories.id";
        if (!find && !categories) {
            sqlQuery += " order by " + sort + " " + order + " LIMIT $1 OFFSET $2";
            arr.push(Number(limit), offset)
        }
        if (find && !categories) {
            sqlQuery += " where lower(products.name) like lower('%' || $1 || '%') order by " + sort + " " + order + " LIMIT $2 OFFSET $3";
            totalQuery += " where lower(products.name) like lower('%' || $1 || '%')";
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
            sqlQuery += " where lower(products.name) like lower('%' || $1 || '%') and lower(categories.name) = lower($2) order by " + sort + " " + order + " LIMIT $3 OFFSET $4";
            totalQuery += " where lower(products.name) like lower('%' || $1 || '%') and lower(categories.name) = lower($2)";
            arr.push(find, categories, Number(limit), offset);
            totalParam.push(find, categories);
        }
        db.query(sqlQuery, arr)
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Product Not Found" });
                }
                const response = {
                    total: result.rowCount,
                    data: result.rows,
                };
                db.query(totalQuery, totalParam)
                    .then((result) => {
                        response.totalData = Number(result.rows[0]["total_products"]);
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

const sortProductsTransactions = () => {
    return new Promise((resolve, reject) => {
        db.query("select p.id, p.name, p.price, p.pictures from products p join transactions t on p.id = t.products_id group by p.id, p.name, p.price, p.pictures order by count(*) desc")
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

const getSingleProductsFromServer = (id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "select products.name, sizes.name_size, products.description, delivery_methods.name as delivery , products.start_hours, products.end_hours, products.stock, products.price, products.pictures, categories.name as category from products join sizes on products.sizes_id = sizes.id join delivery_methods on products.delivery_methods_id = delivery_methods.id join categories on products.categories_id = categories.id where products.id = $1";
        db.query(sqlQuery, [id])
            .then((result) => {
                if (result.rows.length === 0) {
                    return reject({ status: 404, err: "Product Not Found" });
                }
                const response = {
                    data: result.rows
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
    findProducts,
    updateProducts,
    deleteDataProductsfromServer,
    sortProducts,
    sortProductsTransactions,
    getSingleProductsFromServer,
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