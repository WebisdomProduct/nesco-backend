const HeroIntro = require("../../../models/businesses/bombay-exhibition-centre/heroIntro");

/* ======================================
   CREATE
====================================== */
exports.createHeroIntro = async (req, res) => {
  try {
    let { pageName, heading1, paragraph } = req.body;

    if (!pageName) {
      return res.status(400).json({
        message: "pageName is required"
      });
    }

    // ensure paragraph is array
    if (paragraph && !Array.isArray(paragraph)) {
      paragraph = [paragraph];
    }

    const heroIntro = new HeroIntro({
      pageName,
      heading1,
      paragraph
    });

    await heroIntro.save();

    res.status(201).json({
      message: "Hero Intro Created Successfully",
      data: heroIntro
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* ======================================
   GET ALL (ADMIN)
====================================== */
exports.getAllHeroIntro = async (req, res) => {
  try {
    const data = await HeroIntro.find();

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* ======================================
   GET BY PAGENAME (PUBLIC)
====================================== */
exports.getHeroIntroByPageName = async (req, res) => {
  try {
    const { pageName } = req.params;

    const data = await HeroIntro.findOne({ pageName });

    if (!data) {
      return res.status(404).json({
        message: "Hero Intro not found"
      });
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* ======================================
   UPDATE
====================================== */
exports.updateHeroIntro = async (req, res) => {
  try {
    const { id } = req.params;
    let { paragraph } = req.body;

    if (paragraph && !Array.isArray(paragraph)) {
      paragraph = [paragraph];
    }

    const updated = await HeroIntro.findByIdAndUpdate(
      id,
      {
        ...req.body,
        paragraph
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Hero Intro not found"
      });
    }

    res.status(200).json({
      message: "Hero Intro Updated Successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

/* ======================================
   DELETE
====================================== */
exports.deleteHeroIntro = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await HeroIntro.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Hero Intro not found"
      });
    }

    res.status(200).json({
      message: "Hero Intro Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};
