const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");

/**
 * Connect to the in-memory database.
 */
const connect = async () => {
  const mongod = new MongoMemoryServer();

  const uri = await mongod.getConnectionString();
  console.log("uri: " + uri);

  const dbName = await mongod.getDbName();
  console.log("dbName :" + dbName);
  const mongooseOpts = {
    useNewUrlParser: true
  };
  console.log(uri, dbName);
  const dbClient = await MongoClient.connect(uri, mongooseOpts);
  const db = dbClient.db(dbName);
  return db;
};

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async (dbClient, db, mongod) => {
  console.log(dbClient, db, mongod);
  await db.dropDatabase();
  await dbClient.close();
  await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
/*module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};*/

module.exports = { connect, closeDatabase };
