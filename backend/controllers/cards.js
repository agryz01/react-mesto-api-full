const mongoose = require('mongoose');
const Card = require('../models/card');

const BadRequestErr = require('../errors/BadRequestErr');
const NotFoundErr = require('../errors/NotFoundErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

const deletCard = (req, res, next) => {
  Card.findById(req.params.cardId).orFail(new NotFoundErr('Карточка с указанным _id не найдена'))
    .then((card) => {
      if (card.owner.toHexString() === req.user._id) {
        card.delete()
          .then(() => {
            res.send({ message: 'карточка удалена' });
          })
          .catch(next);
        return;
      }
      throw new ForbiddenErr('Вы не можете удалить карточку другого пользователя');
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestErr('Указан не корректный _id'));
        return;
      }
      next(err);
    });
};

const createCard = (req, res, next) => {
  req.body.owner = req.user._id;
  Card.create(req.body)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestErr('Ошибка валидации'));
        return;
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundErr('Карточка с указанным _id не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestErr('Указан не корректный _id'));
        return;
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundErr('Карточка с указанным _id не найдена'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestErr('Указан не корректный _id'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards,
  deletCard,
  createCard,
  likeCard,
  dislikeCard,
};
