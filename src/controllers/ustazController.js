import mongoose from 'mongoose';
import {
  httpBadRequest,
  httpNotFound,
} from '../helpers/httpExceptionBuilder.js';
import { successResponseBuilder } from '../helpers/responseBuilder.js';
import Ustaz from '../models/ustazModel.js';

export const findAll = async (req, res, next) => {
  try {
    const ustaz = await Ustaz.find({});
    res.json(successResponseBuilder({ ustaz: ustaz }));
  } catch (err) {
    next(err);
  }
};

export const findById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const ustaz = await Ustaz.findById({ _id: id }).exec();
    if (!ustaz) throw httpNotFound();
    res.json(successResponseBuilder({ ustaz: ustaz }));
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const ustaz = new Ustaz(req.body);
    const result = await ustaz.save();
    res.status(201).json(successResponseBuilder({ ustaz: result }));
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
    const ustaz = await Ustaz.findOneAndUpdate({ _id: id }, req.body);
    if (!ustaz) throw httpNotFound();

    res.json(successResponseBuilder({ ustaz: ustaz }));
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const ustaz = await Ustaz.findOneAndDelete({ _id: id });
    if (!ustaz) throw httpNotFound();

    res.json(successResponseBuilder({ deletedUstazId: id }));
  } catch (err) {
    next(err);
  }
};
