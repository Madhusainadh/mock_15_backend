const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    userId: { type:mongoose.Schema.Types.ObjectId, ref:"Signup", required:true},
    Title: { type: String, required: false },
    Category: { type: String, required: false },
    Message:{ type: String, required: false },
    Bookmark: { type: Boolean, required: false ,default:false},
  },
  {
    timestamps: true,
  }
);

const tickets = mongoose.model("ticket", ticketSchema);
module.exports = tickets;
