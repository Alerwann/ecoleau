import mongoose from 'mongoose';
import  bcrypt from 'bcryptjs';


const saltRounds = 10;




const userSchema = new mongoose.Schema({
   userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfil',
    // type:String,
    unique: true, 
    required: true,
  
  },
  
  identifiant: { type: String, unique: true, required: true, trim: true },

  password: { type: String, required: true, minlength:8 },
  
  role:{type: String, required: true, enum: ['conseiller', 'manager', 'rh','it'], default:'conseiller'},
   
  isActive: {
         type: Boolean,
      default: true
    }
  },

  {
    timestamps: true 
  
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.index({ identifiant: 1 });


export default mongoose.model('User', userSchema);