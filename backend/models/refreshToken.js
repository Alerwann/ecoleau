import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Lien vers votre modèle User
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '7d' // Expire automatiquement après 7 jours (optionnel)
  }
});

refreshTokenSchema.index({ token: 1 }, { unique: true }); // Index unique sur token
refreshTokenSchema.index({ userId: 1 }); // Index non-unique sur userId

export default mongoose.model('RefreshToken', refreshTokenSchema);