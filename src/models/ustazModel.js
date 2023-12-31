import mongoose from 'mongoose';

const ustazSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    jenisKelamin: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Ustaz = mongoose.model('Ustaz', ustazSchema);

export default Ustaz;
