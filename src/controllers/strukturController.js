import mongoose from 'mongoose';
import {
  httpBadRequest,
  httpNotFound,
} from '../helpers/httpExceptionBuilder.js';
import { successResponseBuilder } from '../helpers/responseBuilder.js';
import Struktur from '../models/strukturModel.js';

export const findAll = async (req, res, next) => {
  try {
    const struktur = await Struktur.find({});
    res.json(successResponseBuilder({ struktur: struktur }));
  } catch (err) {
    next(err);
  }
};

export const findById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const struktur = await Struktur.findById({ _id: id }).exec();
    if (!struktur) throw httpNotFound();
    res.json(successResponseBuilder({ struktur: struktur }));
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const struktur = new Struktur(req.body);
    const result = await struktur.save();
    res.status(201).json(successResponseBuilder({ struktur: result }));
  } catch (err) {
    if (['CastError', 'ValidationError'].includes(err?.name)) {
      next(httpBadRequest(err.message));
    }
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const struktur = await Struktur.findOneAndUpdate({ _id: id }, req.body);
    if (!struktur) throw httpNotFound();

    res.json(successResponseBuilder({ struktur: struktur }));
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const struktur = await Struktur.findOneAndDelete({ _id: id });
    if (!struktur) throw httpNotFound();

    res.json(successResponseBuilder({ deletedStrukturId: id }));
  } catch (err) {
    next(err);
  }
};
