import { MongoClient, Db } from "mongodb";
const { MongoMemoryServer } = require("mongodb-memory-server");
import ConditionStore from "./stores/condition.store";
import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  AwilixContainer
} from "awilix";

import ConditionService from "../services/conditionService";
import ConditionRepository from "../repositories/conditionRepository";
import Condition from "../models/condition";

const mongod = new MongoMemoryServer();

let connection: MongoClient = null;
let db: Db;
let container: AwilixContainer;

beforeAll(async () => {
  const url = await mongod.getConnectionString();
  const dbName = await mongod.getDbName();
  connection = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  db = await connection.db(dbName);
  container = createContainer();
  container.register({
    conditionService: asClass(ConditionService).scoped(),
    conditionRepository: asClass(ConditionRepository).scoped(),
    conditionStore: asClass(ConditionStore).scoped(),
    dbClient: asValue(db)
  });

  const store: ConditionStore = container.resolve("conditionStore");
  await store.mount();
});

afterAll(async () => {
  await connection.close();
  await mongod.stop();
});

describe("get", () => {
  it("get all condition", async () => {
    const service: ConditionService = container.resolve("conditionService");
    const store: ConditionStore = container.resolve("conditionStore");
    const result = await service.getAll();
    expect(result).toBeTruthy();
    expect(result.length).toBe(store.conditions.length);
  });

  it("get one condition by its id", async () => {
    const service: ConditionService = container.resolve("conditionService");
    const result = await service.getAll();
    const target = result[0];

    const foundItem = await service.getById(target._id.toString());
    expect(foundItem).toBeTruthy();
    expect(foundItem.name).toMatch(target.name);
  });
});

describe("insert", () => {
  it("insert a new condition", async () => {
    const service: ConditionService = container.resolve("conditionService");
    const newlyCreatedCondition = await service.create(
      new Condition({ name: "Obesity", translation: null })
    );
    expect(newlyCreatedCondition).toBeTruthy();
    expect(newlyCreatedCondition._id).toBeDefined();
  });
});

describe("update", () => {
  it("update an existing condition", async () => {
    const service: ConditionService = container.resolve("conditionService");
    const result = await service.getAll();
    const target = result[0];

    await service.update(
      target._id.toString(),
      new Condition({ ...target, name: "updatedMock" })
    );

    const updateEntry = await service.getById(target._id.toString());
    expect(updateEntry).toBeTruthy();
    expect(updateEntry.name).toMatch("updatedMock");
  });
});

describe("delete", () => {
  it("delete an existing condition", async () => {
    const service: ConditionService = container.resolve("conditionService");
    const result = await service.getAll();
    const target = result[0];
    await service.delete(target._id.toString());
    const existingEntries = await service.getAll();
    expect(existingEntries).not.toContain(target);
  });
});
/*afterAll(
  async (dbClient, db, mongod) => await closeDatabase(dbClient, db, mongod)
);*/
