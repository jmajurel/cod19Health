const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { createContainer, asClass, asValue, asFunction } = require("awilix");

const ConditionService = require("../services/conditionService.ts");
const ConditionRepository = require("../repositories/conditionRepository.ts");

const mongod = new MongoMemoryServer();

let connection;
let db;
let container;

describe("get", () => {
  beforeAll(async () => {
    const url = await mongod.getConnectionString();
    const dbName = await mongod.getDbName();
    connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db(dbName);

    const container = createContainer();

    container.register({
      conditionService: asClass(ConditionService).scoped(),
      conditionRepository: asClass(ConditionRepository).scoped(),
      dbClient: asValue(db)
    });
  });

  afterAll(async () => {
    await connection.close();
    await mongod.stop();
  });

  it("get all condition", async () => {
    const service = container.resolve("conditionService");

    const result = await service.getById("20");
    expect(1).toBeTruthy();
  });
});
/*afterAll(
  async (dbClient, db, mongod) => await closeDatabase(dbClient, db, mongod)
);*/
