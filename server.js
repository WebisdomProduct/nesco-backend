const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth-routes");
const aboutRoutes = require("./routes/about-us-routes");
const admissionRoutes = require("./routes/admission-routes");
const uploadRoutes = require("./routes/upload-routes");
const blogRoutes = require("./routes/blogs-routes");
const contactRoutes = require("./routes/contact-routes");
const academicsRoutes = require("./routes/academics-routes");
const newRoutes = require("./routes/news-route");
const studentRoutes = require("./routes/student-routes");
const addDetail = require("./routes/pages/sebi.route.js");
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
app.use("/api/about-us", aboutRoutes);
app.use("/api/v1/admission", admissionRoutes);
app.use("/api/v1/academics", academicsRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/news", newRoutes);

app.use("/api/v1/pages", protect, addDetail);

const PORT = process.env.PORT || 8040;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
