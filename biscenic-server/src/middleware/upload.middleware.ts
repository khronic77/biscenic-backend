import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Multer destination:", {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB for videos
  },
  fileFilter: (req, file, cb) => {
    console.log("Multer receiving file:", {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });

    // Allow both images and videos
    const allowedImageTypes = /jpeg|jpg|png|webp/;
    const allowedVideoTypes = /mp4|avi|mov|wmv|flv|webm/;
    
    const isImage = allowedImageTypes.test(file.mimetype) || 
                   allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
    const isVideo = allowedVideoTypes.test(file.mimetype) || 
                   allowedVideoTypes.test(path.extname(file.originalname).toLowerCase());

    if (isImage || isVideo) {
      return cb(null, true);
    }
    cb(new Error("Only image files (jpeg, jpg, png, webp) and video files (mp4, avi, mov, wmv, flv, webm) are allowed!"));
  }
});

export const uploadMiddleware = (req: any, res: any, next: any) => {
  console.log("Incoming request headers:", req.headers);

  const uploadArray = upload.array("images", 10); // Increased limit for videos

  uploadArray(req, res, function (err) {
    console.log("Form data received:", req.body);
    console.log("Files received:", req.files);

    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: `Upload error: ${err.message}`,
        error: true,
      });
    } else if (err) {
      return res.status(400).json({
        message: err.message,
        error: true,
      });
    }
    next();
  });
};

export const multerErrorHandler = (err: any, req: any, res: any, next: any) => {
  console.error("Multer error:", err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: `Upload error: ${err.message}`,
      error: true,
    });
  }
  next(err);
};
