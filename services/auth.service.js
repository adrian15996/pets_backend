const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { Expo } = require('expo-server-sdk')
const { config } = require('./../config/config');
const PersonService = require('./person.service');
const service = new PersonService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.user.id,
      role: user.user.role,
    };
    const token = jwt.sign(payload, config.JWT_SECRET);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '15min' });
    const link = `myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.GM_CORREO, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para recuperar contraseña', // Subject linea
      html: `<b>ingresa este codigo en la aplicacion: ${token} </b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.JWT_SECRET);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.GM_CORREO,
        pass: config.GM_PASSWORD,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }

}

module.exports = AuthService;
