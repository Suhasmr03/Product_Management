import multer from "multer";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Specify the directory to store uploaded files
  },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Append timestamp to the original file name
    }
});

export const upload = multer({ storage: storage, });