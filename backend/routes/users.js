const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { id, url } = require('../utils/regExp');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserMe,
  logout,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().pattern(id).length(24),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(url),
  }),
}), updateAvatar);

router.post('/signout', logout);

module.exports = router;
