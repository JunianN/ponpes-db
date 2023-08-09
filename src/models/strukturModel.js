import mongoose from 'mongoose';

const strukturSchema = new mongoose.Schema(
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
    jabatan: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Struktur = mongoose.model('Struktur', strukturSchema);

export default Struktur;
