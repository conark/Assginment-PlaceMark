import Mongoose from "mongoose";

const { Schema } = Mongoose;

const countySchema = new Schema({
  countyname: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const County = Mongoose.model("County", countySchema);
