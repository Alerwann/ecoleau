import mongoose from 'mongoose';



const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ipAddress: {
    type: String,
    default: 'Unknown'
  },
  userAgent: {
    type: String,
    default: 'Unknown'
  },
  revoked: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '7d'
  }
});

refreshTokenSchema.index({ token: 1 });
refreshTokenSchema.index({ userId: 1, revoked: 1 }); // Pour getSessions

export default mongoose.model('RefreshToken', refreshTokenSchema);