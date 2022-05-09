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

validate.productDetailsData = (req, res, next) => {
  // cek apakah body sesuai dengan yang diinginkan
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "products_id" || key === "users_id" || key === "qty" || key === "delivery_methods_id" || key === "now" || key === "time"
  );
  // diinginkan ada ketiga body diatas
  if (validBody.length < 6) {
    return res.status(400).json({
      err: "Body must contain complete data !",
    });
  }

  next();
};

validate.promosData = (req, res, next) => {
  // cek apakah body sesuai dengan yang diinginkan
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "name_product" || key === "normal_price" || key === "description" || key === "sizes_id" || key === "delivery_methods_id" || key === "discount" || key === "start_date" || key === "end_start" || key === "coupon_code" || key === "pictures" || key === "categories_id" || key === "created_at" || key === "updated_at"
  );
  // diinginkan ada ketiga body diatas
  if (validBody.length < 10) {
    return res.status(400).json({
      err: "Body must contain complete data !",
    });
  }

  next();
};

validate.transactionsData = (req, res, next) => {
  // cek apakah body sesuai dengan yang diinginkan
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "date" || key === "sub_total" || key === "payments_methods_id" || key === "product_details_id" || key === "created_at" || key === "updated_at" || key === "products_id" || key === "qty" || key === "users_id" || key === "delivery_methods_id" || key === "promos_id"
  );
  // diinginkan ada ketiga body diatas
  if (validBody.length < 11) {
    return res.status(400).json({
      err: "Body must contain complete data !",
    });
  }

  next();
};

validate.deliveryMethodsData = (req, res, next) => {
  // cek apakah body sesuai dengan yang diinginkan
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "name" || key === "description"
  );
  // diinginkan ada ketiga body diatas
  if (validBody.length < 2) {
    return res.status(400).json({
      err: "Body must contain complete data !",
    });
  }

  next();
};

validate.categoriesData = (req, res, next) => {
  // cek apakah body sesuai dengan yang diinginkan
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "name" || key === "description"
  );
  // diinginkan ada ketiga body diatas
  if (validBody.length < 2) {
    return res.status(400).json({
      err: "Body must contain complete data !",
    });
  }

  next();
};

validate.paymentMethodsData = (req, res, next) => {
  // cek apakah body sesuai dengan yang diinginkan
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "name" || key === "description"
  );
  // diinginkan ada ketiga body diatas
  if (validBody.length < 2) {
    return res.status(400).json({
      err: "Body must contain complete data !",
    });
  }

  next();
};

validate.sizesData = (req, res, next) => {
  // cek apakah body sesuai dengan yang diinginkan
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "name" || key === "description"
  );
  // diinginkan ada ketiga body diatas
  if (validBody.length < 1) {
    return res.status(400).json({
      err: "Body must contain complete data !",
    });
  }

  next();
};

module.exports = validate;
