import { createContainer, asClass, asValue } from "awilix";
import ConditionService from "../services/conditionService";
import ConditionRepository from "../repositories/conditionRepository";

const container = createContainer();
container.register({
  conditionService: asClass(ConditionService).scoped(),
  conditionRepository: asClass(ConditionRepository).scoped(),
  dbClient: asValue(null)
});

export default container;
