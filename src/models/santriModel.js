import mongoose from 'mongoose';

const santriSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    jenisKelamin: {
      type: String,
      required: true,
    },
    tahunMasuk: {
      type: String,
      required: true,
    },
    TTL: {
      type: String,
      required: true,
    },
    namaWali: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Santri = mongoose.model('Santri', santriSchema);

export default Santri;
