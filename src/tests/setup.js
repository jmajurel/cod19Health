import { createContainer, asClass, asValue, asFunction } from "awilix";
import ConditionService from "../services/conditionService";
import ConditionRepository from "../repositories/conditionRepository";
const container = createContainer();

container.register({
  conditionService: asClass(ConditionService).scoped(),
  conditionRepository: asClass(ConditionRepository).scoped()
});

export { container };
