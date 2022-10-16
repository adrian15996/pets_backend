const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const {
  logErrors,
  ErrorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = ['http://localhost:8080'];
const options = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin || !origin)) {
      cb(null, true);
    } else {
      cb(new Error('No tienes acceso'));
    }
  },
};
app.use(cors());

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log('servidor encendido corriendo en el puerto:' + port);
});
