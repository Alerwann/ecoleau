import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  rhId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ipAddress: {
    type: String,
    default: "Unknown",
  },
  userAgent: {
    type: String,
    default: "Unknown",
  },
  revoked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d",
  },
});

RefreshTokenSchema.index({ token: 1 });
RefreshTokenSchema.index({ rhId: 1, revoked: 1 }); // Pour getSessions

export default mongoose.model("RefreshToken", RefreshTokenSchema);
