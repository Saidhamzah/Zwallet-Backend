const validation = validationResult.withDefaults({
    formatter: (error) => {
      return {
        error: error.location,
      };
    },
  });
  
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
      const newFileName = `${Date.now()}-${file.originalname}`;
      cb(null, newFileName);
    },
  });
  
  let limits = {
    fileSize: 5 * 1024 * 1024,
  };
  
  let fileFilter = (req, file, cb) => {
    const mime = /jpg|webp|gif|png|jpeg|svg/;
    const extName = mime.test(path.extname(file.originalname).toLowerCase());
    if (extName) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  let upload = multer({ storage, limits, fileFilter });