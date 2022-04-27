const validate = {};

validate.queryFind = (req, res, next) => {
  // cek apakah query sesuai dengan yang diinginkan
  const { query } = req;
  const validQuery = Object.keys(query).filter(
    (key) => key === "title" || key === "sort" || key === "order"
  );
  // diinginkan ada ketiga query diatas
  if (validQuery.length < 3) {
    return res.status(400).json({
      err: "Query harus berisikan title, sort dan order",
    });
  }
  // mau cek tipe data
  //   for (const key of validQuery) {
  //     if (typeof query[key] !== "string") {
  //       return res.status(400).json({
  //         err: "Invalid Query",
  //       });
  //     }
  //   }
  next();
};

validate.usersData = (req, res, next) => {
  // cek apakah body sesuai dengan yang diinginkan
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "username" || key === "email" || key === "password" || key === "phone" || key === "date" || key === "address" || key === "gender" || key === "pictures"
  );
  // diinginkan ada ketiga body diatas
  if (validBody.length < 3) {
    return res.status(400).json({
      err: "Body harus berisikan data lengkap",
    });
  }
  next();
};

validate.productsData = (req, res, next) => {
  // cek apakah body sesuai dengan yang diinginkan
  const { body, name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, pictures, categories_id, price } = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "name" || key === "sizes_id" || key === "description" || key === "delivery_methods_id" || key === "start_hours" || key === "end_hours" || key === "stock" || key === "pictures" || key === "categories_id" || key === "price" 
  );
  // diinginkan ada ketiga body diatas
  if (validBody.length < 10) {
    return res.status(400).json({
      err: "Body harus berisikan data lengkap",
    });
  }
  // if(typeof name !== "string" ){
  //   return "Data harus string"
  // }
  // if(typeof sizes_id !== "number" ){
  //   return "Data harus number"
  // }
  // if(typeof description !== "string" ){
  //   return "Data harus string"
  // }
  // if(typeof delivery_methods_id !== "number" ){
  //   return "Data harus number"
  // }
  // if(typeof start_hours !== "number" ){
  //   return "Data harus number"
  // }
  // if(typeof end_hours !== "number" ){
  //   return "Data harus number"
  // }
  // if(typeof stock !== "number" ){
  //   return "Data harus number"
  // }
  // if(typeof pictures !== "string" ){
  //   return "Data harus string"
  // }
  // if(typeof categories_id !== "number" ){
  //   return "Data harus number"
  // }
  // if(typeof price !== "number" ){
  //   return "Data harus number"
  // }


  next();
};

module.exports = validate;
