import App from './app/App.js';
// import mongodbConnect from './database/mongodb.js';
import MongoDb from './database/mongodb2.js';
import { delay } from './utils/helper.js';
import logger from './utils/logger.js';
const myServer = new App({ port: process.env.PORT || 8000 });
// mongodbConnect();
const mydb = new MongoDb(
  `${process.env.MONGO_ADDRESS}:/${process.env.MONGO_PORT}`,
  'mern-auth'
);

while (!(await mydb.checkDbServer())) {
  logger.error('Mongodb Server is Offline Or Not Working ');
  delay(1500);
  logger.info('Retying to Connoct MongoDb Server');
}
mydb.mongodbConnect();
mydb.db.once('open', () => {
  logger.info('MongoDb Connected Successfully');
});

myServer.startServer();
