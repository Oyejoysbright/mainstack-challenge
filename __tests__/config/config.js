const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const { databaseName } = require(".");

module.exports = async function globalSetup(){

      const memServer = await MongoMemoryServer.create();
      const uri = memServer.getUri();
      global.__MONGOINSTANCE__ = memServer;
      process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));

      // clean up
      await mongoose.connect(`${process.env.MONGO_URI}/${databaseName}`);
      await mongoose.connection.db.dropDatabase();
      await mongoose.disconnect();
  };

  