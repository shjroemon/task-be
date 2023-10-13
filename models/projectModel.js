const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const memberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Use the correct model name here
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "employee", "owner"],
    required: true,
  },
});

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    members: {
      type: [memberSchema],
      deleted: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.plugin(mongoosePaginate);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
