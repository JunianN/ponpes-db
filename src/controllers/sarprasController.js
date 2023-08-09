import mongoose from 'mongoose';
import {
  httpBadRequest,
  httpNotFound,
} from '../helpers/httpExceptionBuilder.js';
import { successResponseBuilder } from '../helpers/responseBuilder.js';
import Sarpras from '../models/sarprasModel.js';

export const findAll = async (req, res, next) => {
  try {
    const sarpras = await Sarpras.find({});
    res.json(successResponseBuilder({ sarpras: sarpras }));
  } catch (err) {
    next(err);
  }
};

export const findById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const sarpras = await Sarpras.findById({ _id: id }).exec();
    if (!sarpras) throw httpNotFound();
    res.json(successResponseBuilder({ sarpras: sarpras }));
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const sarpras = new Sarpras(req.body);
    const result = await sarpras.save();
    res.status(201).json(successResponseBuilder({ sarpras: result }));
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
    const sarpras = await Sarpras.findOneAndUpdate({ _id: id }, req.body);
    if (!sarpras) throw httpNotFound();

    res.json(successResponseBuilder({ sarpras: sarpras }));
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const sarpras = await Sarpras.findOneAndDelete({ _id: id });
    if (!sarpras) throw httpNotFound();

    res.json(successResponseBuilder({ deletedSarprasId: id }));
  } catch (err) {
    next(err);
  }
};
