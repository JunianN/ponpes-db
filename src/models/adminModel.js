import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'ADMIN',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
