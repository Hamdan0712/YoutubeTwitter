import mongoose, { Schema } from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // videofile and the thumbnail is got from the cloudinary
      required: [true, "A video is required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is need bro"],
    },

    title: {
      type: String,
      required: [true, "Title is also needed"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    duration: {
      type: Number, // this also from the cloudinary
      required: [true, "duration"],
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);
