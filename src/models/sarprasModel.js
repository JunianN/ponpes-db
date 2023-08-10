import mongoose from 'mongoose';

const sarprasSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    jumlah: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Sarpras = mongoose.model('Sarpras', sarprasSchema);

export default Sarpras;
