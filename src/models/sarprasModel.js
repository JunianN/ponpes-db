import mongoose from 'mongoose';

const sarprasSchema = new mongoose.Schema(
  {
    namaFasilitas: {
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
