import mongoose from 'mongoose';
import {
  httpBadRequest,
  httpNotFound,
} from '../helpers/httpExceptionBuilder.js';
import { successResponseBuilder } from '../helpers/responseBuilder.js';
import Santri from '../models/santriModel.js';

export const findAll = async (req, res, next) => {
  try {
    const santri = await Santri.find({});
    res.json(successResponseBuilder({ santri: santri }));
  } catch (err) {
    next(err);
  }
};

export const findById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const santri = await Santri.findById({ _id: id }).exec();
    if (!santri) throw httpNotFound();
    res.json(successResponseBuilder({ santri: santri }));
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const santri = new Santri(req.body);
    const result = await santri.save();
    res.status(201).json(successResponseBuilder({ santri: result }));
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
    const santri = await Santri.findOneAndUpdate({ _id: id }, req.body);
    if (!santri) throw httpNotFound();

    res.json(successResponseBuilder({ santri: santri }));
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const santri = await Santri.findOneAndDelete({ _id: id });
    if (!santri) throw httpNotFound();

    res.json(successResponseBuilder({ deletedSantriId: id }));
  } catch (err) {
    next(err);
  }
};
