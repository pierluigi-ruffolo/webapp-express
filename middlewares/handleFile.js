import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "public/img/");
  },

  filename: function (req, file, cd) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cd(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

export default upload;
