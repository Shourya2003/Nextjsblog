// models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true }, // Added username field
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);