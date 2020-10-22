import express from "express";
import {
  createMarket,
  getMarketBylocation,
  getAllMarket,
  getMarketByName,
  getMarketByCategory,
  removeMarket,
  updateMarket,
} from "./controller";
import multer from "multer";
const adminRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: fileFilter,
});

adminRouter.post("/admin/create", upload.array("images", 3), createMarket);
adminRouter.get("/admin/location", getMarketBylocation);
adminRouter.get("/admin/name", getMarketByName);
adminRouter.get("/admin/category", getMarketByCategory);
adminRouter.get("/admin/all", getAllMarket);
adminRouter.put("/admin/update", updateMarket);
adminRouter.delete("/admin/delete", removeMarket);

export default adminRouter;
