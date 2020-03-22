import IConditionServiceInterface from "../services/interfaces/conditionSInterface";
import { connect, closeDatabase } from "./db-handlers";
import { asValue, createContainer, asClass, AwilixContainer } from "awilix";
import ConditionService from "../services/conditionService";
import ConditionRepository from "../repositories/conditionRepository";
import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
let dbClient: MongoClient;
let db: Db;
let mongod: MongoMemoryServer;
let container = createContainer();

container.register({
  conditionService: asClass(ConditionService).scoped(),
  conditionRepository: asClass(ConditionRepository).scoped()
});

async function configureContainer() {
  const res: {
    dbClient: MongoClient;
    db: Db;
    mongod: MongoMemoryServer;
  } = await connect();
  dbClient = res.dbClient;
  db = res.db;
  mongod = res.mongod;
  container = container.register({
    dbClient: asValue(db)
  });
}

beforeAll(configureContainer);
/*afterAll(
  async (dbClient, db, mongod) => await closeDatabase(dbClient, db, mongod)
);*/

describe("get", () => {
  it("get all condition", async () => {
    console.dir(container);
    const service: IConditionServiceInterface = container.resolve(
      "conditionService"
    );

    const result = await service.getById("20");
    expect(result).toBeTruthy();
  });
});
