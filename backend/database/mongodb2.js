import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import logger from '../utils/logger.js';
export default class MongoDb {
  constructor(mongoURI, database) {
    this.mongoURI = mongoURI;
    this.database = database;
    this.db = mongoose.connection;
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
  }
  async checkDbServer() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.mongoURI)
        .then(() => {
          //   logger.info('success');
          resolve(true);
        })
        .catch(() => {
          //   logger.error('error');
          resolve(false);
        });
    });
  }
  mongodbConnect() {
    mongoose.connect(`${this.mongoURI}/${this.database}`);
  }
}
