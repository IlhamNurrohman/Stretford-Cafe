const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.fieldname}-${suffix}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

const limit = {
  fileSize: 2e6,
};

const imageOnlyFilter = (req, file, cb) => {
  const extName = path.extname(file.originalname);
  const allowedExt = /jpg|png/;
  if (!allowedExt.test(extName))
    return cb(new Error("Only Use Allowed Extension (JPG, PNG)"), false);
  cb(null, true);
};

const imageUpload = multer({
  storage: imageStorage,
  limits: limit,
  fileFilter: imageOnlyFilter,
}).single("pictures");

const upImageFile = (req, res, next) => {
  imageUpload(req, res, (err) => {
      if (err) {
        console.log(err);
          res.status(400).json({
              error: err.message,
          });
          return;
      }
      next();
  });
};

module.exports = upImageFile;