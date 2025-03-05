const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth-routes");
const uploadRoutes = require("./routes/upload-routes.js");
const addDetail = require("./routes/sebi.route.js");
const Announcements = require("./routes/announcements.route.js");
const Financials = require("./routes/financials.route.js");
const bodyParser = require("body-parser");
const { protect, adminOnly } = require("./middlewares/authMiddleware.js");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.use("/api/v1/sebi", protect, addDetail);
app.use("/api/v1/announcements", protect, Announcements);
app.use("/api/v1/financials", protect, Financials);

const PORT = process.env.PORT || 8040;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
