import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  category: String,
  placename: String,
  description: String,
  latitude: Number,
  longitude: Number,
  countyid: {
    type: Schema.Types.ObjectId,
    ref: "County",
  },
});

export const Place = Mongoose.model("Place", placeSchema);
