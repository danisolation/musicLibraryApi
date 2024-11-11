const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const trackRoutes = require("./routes/trackRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const errorHandler = require("./middlewares/errorHandler");
const searchUtils = require("./utils/searchUtils");
const cors = require("cors");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Đã kết nối với MongoDB"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

app.use(cors());
app.use(express.json());

app.use("/api/tracks", trackRoutes);
app.use("/api/playlists", playlistRoutes);
app.get("/api/search", async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp từ khóa tìm kiếm" });
    }
    const results = await searchUtils.searchMusic(query);
    res.json(results);
  } catch (error) {
    next(error);
  }
});
app.use("/uploads", express.static("uploads"));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));
