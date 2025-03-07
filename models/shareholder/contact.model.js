const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  center: { type: String },
  full_address: { type: String },
  phone: { type: String },
  tel: { type: String },
  mobile: { type: String },
  fax: { type: String },
  email: { type: String },
});

const ProfileSchema = new mongoose.Schema({
  name: { type: String },
  position: { type: String },
  email: { type: String },
});

const Profile2Schema = new mongoose.Schema({
  name: { type: String },
  position: { type: String },
});

const CompanySchema = new mongoose.Schema({
  name: { type: String },
  industry: { type: String },
});

const ContactSchema = new mongoose.Schema(
  {
    title: { type: String },

    option: {
      type: String,
      enum: ["address", "profile"],
      required: true,
    },

    option2: {
      type: String,
      enum: ["company", "profile2"],
    },

    address: AddressSchema,
    profile: [ProfileSchema],
    profile2: Profile2Schema,
    company: CompanySchema,
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = { Contact };
