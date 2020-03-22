import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

/**
 * Connect to the in-memory database.
 */
const connect = async () => {
  const mongod = new MongoMemoryServer();

  const uri = await mongod.getConnectionString();
  const dbName = await mongod.getDbName();

  const mongooseOpts = {
    useNewUrlParser: true
  };
  console.log(uri, dbName);
  const dbClient: MongoClient = await MongoClient.connect(uri, mongooseOpts);
  const db: Db = dbClient.db(dbName);
  return { dbClient, db, mongod };
};

/**
 * Drop database, close the connection and stop mongod.
 */
const closeDatabase = async (
  dbClient: MongoClient,
  db: Db,
  mongod: MongoMemoryServer
) => {
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

export { connect, closeDatabase };
