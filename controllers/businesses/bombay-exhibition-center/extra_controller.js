const ExtraModel = require("../../../models/businesses/bombay-exhibition-centre/mentorlike");
const uploadToS3 = require("../../../config/s3Uploader");

/* ================= CREATE ================= */
exports.createMentor = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = await uploadToS3(req.file, "mentor");

    const mentor = await ExtraModel.create({
      heading2: req.body.heading2,
      heading3: req.body.heading3,
      paragraph: req.body.paragraph,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Mentor created",
      mentor,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL ================= */
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await ExtraModel.find().sort({ createdAt: -1 });
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET SINGLE ================= */
exports.getMentorById = async (req, res) => {
  try {
    const mentor = await ExtraModel.findById(req.params.id);
    if (!mentor)
      return res.status(404).json({ message: "Not found" });

    res.json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateMentor = async (req, res) => {
  try {
    const mentor = await ExtraModel.findById(req.params.id);
    if (!mentor)
      return res.status(404).json({ message: "Not found" });

    mentor.heading2 = req.body.heading2 ?? mentor.heading2;
    mentor.heading3 = req.body.heading3 ?? mentor.heading3;
    mentor.paragraph = req.body.paragraph ?? mentor.paragraph;

    if (req.file) {
      mentor.image = await uploadToS3(req.file, "mentor");
    }

    await mentor.save();

    res.json({
      message: "Updated successfully",
      mentor,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteMentor = async (req, res) => {
  try {
    const mentor = await ExtraModel.findByIdAndDelete(req.params.id);
    if (!mentor)
      return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
