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
    ttl: {
      type: String,
      required: false,
    },
    namaWali: {
      type: String,
      required: false,
    },
    alamat: {
      type: String,
      required: false,
    },
    tahunMasuk: {
      type: String,
      required: false,
    },
    kelas: {
      type: String,
      required: false,
    },
    juz: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Ustaz = mongoose.model('Ustaz', ustazSchema);

export default Ustaz;
