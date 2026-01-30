const Stakeholder = require("../../../models/OurImpact/sustainability/sustainabilityStakeHolderModel");
const uploadToS3 = require("../../../config/s3Uploader");

/* CREATE */
exports.createStakeholder = async (req, res) => {
    try {
        const { title, description , mainTitle } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: "Image required" });
        }

        // Upload to S3
        const imageUrl = await uploadToS3(req.file);

        const stakeholder = new Stakeholder({
            mainTitle,
            title,
            description,
            image: imageUrl
        });

        await stakeholder.save();

        res.status(201).json({
            success: true,
            message: "Created successfully",
            data: stakeholder
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* READ */
exports.getStakeholder = async (req, res) => {
    try {
        const data = await Stakeholder.findOne();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* UPDATE */
exports.updateStakeholder = async (req, res) => {
    try {
        const updateData = {
            mainTitle:req.body.mainTitle,
            title: req.body.title,
            description: req.body.description
        };

        if (req.file) {
            const imageUrl = await uploadToS3(req.file);
            updateData.image = imageUrl;
        }

        const updated = await Stakeholder.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Updated successfully",
            data: updated
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* DELETE */
exports.deleteStakeholder = async (req, res) => {
    try {
        await Stakeholder.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* READ BY MAIN TITLE */
exports.getStakeholderByMainTitle = async (req, res) => {
    try {
        const { mainTitle } = req.params; // Expecting mainTitle in URL params
        if (!mainTitle) {
            return res.status(400).json({ message: "mainTitle is required" });
        }

        const data = await Stakeholder.findOne({ mainTitle: mainTitle });

        if (!data) {
            return res.status(404).json({ message: "Stakeholder not found" });
        }

        res.status(200).json({
            success: true,
            message: "Fetched successfully",
            data: data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
