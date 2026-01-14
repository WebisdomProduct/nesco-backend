const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth-routes");
const uploadRoutes = require("./routes/upload-routes.js");
const addDetail = require("./routes/sebi.route.js");
const Announcements = require("./routes/announcements.route.js");
const Financials = require("./routes/financials.route.js");
const internship = require("./routes/internship.route.js");
const leadership = require("./routes/leadership.route.js");
const graduates = require("./routes/graduate.route.js");
const experienced = require("./routes/experienced.route.js");
const shareholder = require("./routes/shareholder.route.js");
const bodyParser = require("body-parser");
const { protect, adminOnly } = require("./middlewares/authMiddleware.js");
// const bodyParser = require("body-parser");
// const { protect } = require("./middlewares/authMiddleware.js");
dotenv.config();
connectDB();

const app = express();
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000','http://localhost:4000' , 'https://main.d8gdexgfmcmvy.amplifyapp.com', 'https://nesco-admin-panel.vercel.app'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // Allow all necessary methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: "50mb", extended: true }));


app.get("/", (req, res) => res.send("API is running"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.use("/api/v1/sebi", addDetail);
app.use("/api/v1/announcements", Announcements);
app.use("/api/v1/financials", Financials);
app.use("/api/v1/shareholder", shareholder);
app.use("/api/v1/internship", internship);
app.use("/api/v1/graduates", graduates);
app.use("/api/v1/experience", experienced);
app.use("/api/v1/leadership", leadership);
app.use("/api/v1/mentors", require("./routes/mentor-routes"));
app.use('/api/v1/news', require('./routes/news-routes'));
app.use('/api/v1/directors', require('./routes/board-of-directors.route.js'));
app.use('/api/v1/contact', require('./routes/contact.route.js'));


const PORT = process.env.PORT || 8040;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
