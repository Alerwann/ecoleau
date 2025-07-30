import mongoose from 'mongoose';
import  bcrypt from 'bcryptjs';


const saltRounds = 10;




const userSchema = new mongoose.Schema({
  identifiant: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nom : { type: String, required: true },
  prenom : { type: String, required: true }
  
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
export default mongoose.model('User', userSchema);