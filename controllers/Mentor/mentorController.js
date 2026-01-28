const Mentor = require('../../models/Mentor/Mentor');
const uploadToS3 = require('../../config/s3Uploader');

/**
 * CREATE MENTOR
 */
exports.createMentor = async (req, res) => {
  try {
    console.log('\n================ CREATE MENTOR =================');
    console.log('REQ FILES:', req.files);
    console.log('REQ BODY:', req.body);

    if (!req.files?.mentorImage || !req.files?.backgroundImage) {
      console.log('❌ FILE VALIDATION FAILED');
      return res.status(400).json({
        message: 'Mentor image and background image are required',
      });
    }

    console.log('✅ FILE VALIDATION PASSED');

    // Parse noteText
    let noteText = [];
    if (req.body.noteText) {
      try {
        noteText = JSON.parse(req.body.noteText);
        console.log('✅ noteText parsed:', noteText);
      } catch (err) {
        console.error('❌ noteText JSON PARSE ERROR:', err);
        return res.status(400).json({
          message: 'noteText must be a valid JSON array',
        });
      }
    }

    /* ---------------- S3 UPLOADS ---------------- */

    console.log('🚀 UPLOADING mentorImage TO S3...');
    console.log('mentorImage file:', req.files.mentorImage[0]);

    const mentorImageUrl = await uploadToS3(
      req.files.mentorImage[0],
      'mentors'
    );

    console.log('✅ mentorImage UPLOADED:', mentorImageUrl);

    console.log('🚀 UPLOADING backgroundImage TO S3...');
    console.log('backgroundImage file:', req.files.backgroundImage[0]);

    const backgroundImageUrl = await uploadToS3(
      req.files.backgroundImage[0],
      'mentors'
    );

    console.log('✅ backgroundImage UPLOADED:', backgroundImageUrl);

    /* ---------------- DB SAVE ---------------- */

    console.log('💾 SAVING MENTOR TO DB...');

    const mentor = new Mentor({
      name: req.body.name,
      designation: req.body.designation,
      pageName:req.body.pageName,
      noteTitle: req.body.noteTitle,
      noteText,
      mentorImage: mentorImageUrl,
      backgroundImage: backgroundImageUrl,
    });

    await mentor.save();

    console.log('🎉 MENTOR SAVED SUCCESSFULLY');

    res.status(201).json({
      message: 'Mentor created successfully',
      mentor,
    });
  } catch (error) {
    console.error('🔥 CREATE MENTOR ERROR:', error);
    res.status(500).json({
      message: 'Failed to create mentor',
      error: error.message,
    });
  }
};

/**
 * GET ALL MENTORS
 */
exports.getAllMentors = async (req, res) => {
  try {
    console.log('📥 FETCHING ALL MENTORS');
    const mentors = await Mentor.find().sort({ createdAt: -1 });
    console.log('✅ MENTORS FOUND:', mentors.length);
    res.json(mentors);
  } catch (error) {
    console.error('🔥 FETCH ALL ERROR:', error);
    res.status(500).json({ message: 'Failed to fetch mentors' });
  }
};

/**
 * GET SINGLE MENTOR
 */
exports.getMentorById = async (req, res) => {
  try {
    console.log('📥 FETCH MENTOR ID:', req.params.id);
    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      console.log('❌ MENTOR NOT FOUND');
      return res.status(404).json({ message: 'Mentor not found' });
    }

    console.log('✅ MENTOR FOUND');
    res.json(mentor);
  } catch (error) {
    console.error('🔥 FETCH ONE ERROR:', error);
    res.status(500).json({ message: 'Failed to fetch mentor' });
  }
};

/**
 * UPDATE MENTOR
 */
exports.updateMentor = async (req, res) => {
  try {
    console.log('\n================ UPDATE MENTOR =================');
    console.log('FILES:', req.files);
    console.log('BODY:', req.body);

    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      console.log('❌ MENTOR NOT FOUND');
      return res.status(404).json({ message: 'Mentor not found' });
    }

    mentor.name = req.body.name ?? mentor.name;
    mentor.designation = req.body.designation ?? mentor.designation;
    mentor.noteTitle = req.body.noteTitle ?? mentor.noteTitle;

    if (req.body.noteText) {
      try {
        mentor.noteText = JSON.parse(req.body.noteText);
        console.log('✅ noteText updated');
      } catch (err) {
        console.error('❌ noteText JSON ERROR:', err);
        return res.status(400).json({
          message: 'noteText must be a valid JSON array',
        });
      }
    }

    if (req.files?.mentorImage) {
      console.log('🚀 UPLOADING NEW mentorImage');
      mentor.mentorImage = await uploadToS3(
        req.files.mentorImage[0],
        'mentors'
      );
      console.log('✅ mentorImage UPDATED');
    }

    if (req.files?.backgroundImage) {
      console.log('🚀 UPLOADING NEW backgroundImage');
      mentor.backgroundImage = await uploadToS3(
        req.files.backgroundImage[0],
        'mentors'
      );
      console.log('✅ backgroundImage UPDATED');
    }

    await mentor.save();
    console.log('🎉 MENTOR UPDATED');

    res.json({
      message: 'Mentor updated successfully',
      mentor,
    });
  } catch (error) {
    console.error('🔥 UPDATE ERROR:', error);
    res.status(500).json({
      message: 'Failed to update mentor',
      error: error.message,
    });
  }
};

/**
 * DELETE MENTOR
 */
exports.deleteMentor = async (req, res) => {
  try {
    console.log('🗑 DELETE MENTOR:', req.params.id);

    const mentor = await Mentor.findByIdAndDelete(req.params.id);

    if (!mentor) {
      console.log('❌ MENTOR NOT FOUND');
      return res.status(404).json({ message: 'Mentor not found' });
    }

    console.log('✅ MENTOR DELETED');
    res.json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    console.error('🔥 DELETE ERROR:', error);
    res.status(500).json({ message: 'Failed to delete mentor' });
  }
};
