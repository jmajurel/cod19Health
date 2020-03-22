import express from "express";
import {
  asClass,
  createContainer,
  asValue,
  Lifetime,
  asFunction
} from "awilix";
import { loadControllers, scopePerRequest } from "awilix-express";

import { MongoClient, Db } from "mongodb";

import dotenv from "dotenv";
import ConditionService from "./services/conditionService";
import ConditionRepository from "./repositories/conditionRepository";

dotenv.config();
const app = express();
async function configureContainer() {
  const container = createContainer();

  const dbConnection = (
    await MongoClient.connect(process.env.DB_CONNECTION_STRING)
  ).db(process.env.DB_NAME);
  container.register({
    conditionService: asClass(ConditionService).scoped(),
    conditionRepository: asClass(ConditionRepository).scoped(),
    dbClient: asValue(dbConnection)
  });

  return container;
}

configureContainer().then(container => {
  app.use(scopePerRequest(container));

  app.use(loadControllers("routers/*.ts", { cwd: __dirname }));
  const PORT = process.env.PORT || 8081;

  app.listen(PORT, () => {
    console.log("cod19Health is listenning on port: ", PORT);
  });
});
