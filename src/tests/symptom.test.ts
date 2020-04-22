import { MongoClient, Db } from "mongodb";
const { MongoMemoryServer } = require("mongodb-memory-server");
import SymptomStore from "./stores/symptom.store";
import {
  createContainer,
  asClass,
  asValue,
  asFunction,
  AwilixContainer
} from "awilix";

import SymptomService from "../services/symptomService";
import SymptomRepository from "../repositories/symptomRepository";
import Symptom from "../models/symptom";

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
    symptomService: asClass(SymptomService).scoped(),
    symptomRepository: asClass(SymptomRepository).scoped(),
    symptomStore: asClass(SymptomStore).scoped(),
    dbClient: asValue(db)
  });

  const store: SymptomStore = container.resolve("symptomStore");
  await store.mount();
});

afterAll(async () => {
  await connection.close();
  await mongod.stop();
});

describe("get", () => {
  it("get all symptoms", async () => {
    const service: SymptomService = container.resolve("symptomService");
    const store: SymptomStore = container.resolve("symptomStore");
    const result = await service.getAll();
    expect(result).toBeTruthy();
    expect(result.length).toBe(store.symptoms.length);
  });

  it("get one symptom by its id", async () => {
    const service: SymptomService = container.resolve("symptomService");
    const result = await service.getAll();
    const target = result[0];

    const foundItem = await service.getById(target._id.toString());
    expect(foundItem).toBeTruthy();
    expect(foundItem.name).toMatch(target.name);
  });
});

describe("insert", () => {
  it("insert a new symptom", async () => {
    const service: SymptomService = container.resolve("symptomService");
    const newlyCreatedSymptom = await service.create(
      new Symptom({ name: "Cough", translation: null })
    );
    expect(newlyCreatedSymptom).toBeTruthy();
    expect(newlyCreatedSymptom._id).toBeDefined();
  });
});

describe("update", () => {
  it("update an existing symptom", async () => {
    const service: SymptomService = container.resolve("symptomService");
    const result = await service.getAll();
    const target = result[0];

    await service.update(
      target._id.toString(),
      new Symptom({ ...target, name: "updatedMock" })
    );

    const updateEntry = await service.getById(target._id.toString());
    expect(updateEntry).toBeTruthy();
    expect(updateEntry.name).toMatch("updatedMock");
  });
});

describe("delete", () => {
  it("delete an existing symptom", async () => {
    const service: SymptomService = container.resolve("symptomService");
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
