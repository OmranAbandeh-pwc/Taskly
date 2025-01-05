import express from "express";
import { signinController } from "../../controllers/auth/signin";
import { signupController } from "../../controllers/auth/singup";
import multer from "multer";

export const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Accept only image files
    } else {
      cb(new Error("Invalid file type. Only image files are allowed."));
    }
  },
});

router.post("/signin", signinController);

router.post("/signup", upload.single("image"), signupController);
