const express = require('express');
const axios = require('axios');
const router = express.Router();
const utils = require('../middleweare/token');
const auth = require('../middleweare/auth');
const permit = require('../middleweare/permit');
const upload = require('../middleweare/upload');
const User = require('../models/User');
const config = require('../config');

const getLiveCookie = user => {
  const { username } = user
  const maxAge = 730 * 60 * 60
  return { token: utils.getToken(username, maxAge), maxAge }
}

const getLiveSecretCookie = user => {
  const { username } = user
  const maxAge = 5 * 60 * 60
  return { token: utils.getToken(username, maxAge), maxAge }
}

router.post('/', async (req, res) => {
  try {
    const secretToken = getLiveSecretCookie({ email: req.body.email });
    const { email, password, username, phone } = req.body.userData;
    
    const userData = { email, password, username, phone, avatar: '/no-photo.jpg'};

    const user = new User(userData);

    const { token, maxAge } = getLiveCookie(user);

    res.cookie('jwt', token, {
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    user.token = token;

    await user.save();

    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
})

router.post('/sessions', async (req, res) => {
  try {
    if (req.cookies.jwt) {
      const user = await User.findOne({ token: req.cookies.jwt });
      return res.send(user);
    }

    const user = await User.findOne({ email: req.body.email })

      if (!user) {
        return res.status(401).send({ message: 'Введенные данные не верны!' })
      }

    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
        return res.status(401).send({ message: 'Введенные данные не верны!' });
    }

    const { token, maxAge } = getLiveCookie(user);

    res.cookie('jwt', token, {
        httpOnly: false,
        maxAge: maxAge * 1000,
    });

    user.token = token;

    await user.save({ validateBeforeSave: false });

      return res.send(user);
    }

    catch (e) {
        return res.status(500).send({ error: e });
  }
});


router.put('/edit', auth, upload.single('avatar'), async (req, res) => {
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
    };

    if (req.file) {
      userData.avatar = req.file.filename;
    }
    
    const user = await User.findByIdAndUpdate(req.user._id, userData, { new: true });

    return res.send(user);
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
})

router.put('/edit_password', auth, async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const { user } = req;

    if (!password || !newPassword) {
      return res.status(400).send({ error: 'Введите правильный пароль' });
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Введен неверный пароль!' });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.send(user);
  } catch (e) {
        return res.status(500).send({ error: e });
  }
});

router.delete('/sessions', async (req, res) => {
    const success = { message: 'Success' }
    const cookie = req.cookies.jwt
  
    if (!cookie) return res.send(success)
  
    const user = await User.findOne({ token: cookie })
  
    if (!user) return res.send(success)
  
    const { token } = getLiveCookie(user)
    user.token = token
  
    await user.save({ validateBeforeSave: false })
  
    return res.send({ success, user })
  });

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: 'Пользователь не найден!' });
    }

    if (user._id.equals(req.user._id)) {
      return res.status(400).send({ error: 'Вы не можете удалить себя' });
    }

    await User.deleteOne({ _id: userId });

    if (user.avatar) {
      deleteFile(user.avatar);
    }

    return res.send({ message: 'Пользователь удалён' });
  } catch {
        return res.sendStatus(500);
  }
});

module.exports = router;