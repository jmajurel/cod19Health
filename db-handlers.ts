import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
const mongod = new MongoMemoryServer();

let connection: MongoClient;
let db;
/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
  const uri = await mongod.getConnectionString();
  const dbName = await mongod.getDbName();
  const option = {
    useNewUrlParser: true
  };
  connection = await MongoClient.connect(uri, option);
  db = connection.db(dbName);
  return await db;
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
  await connection.close();
  await db.close();
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
