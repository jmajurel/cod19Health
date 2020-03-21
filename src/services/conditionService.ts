import Condition from "../models/condition";
import IConditionServiceInterface from "./interfaces/conditionSInterface";
import IConditionRepository from "../repositories/interfaces/conditionRepoInterface";

class ConditionService implements IConditionServiceInterface {
  private readonly conditionRepository: IConditionRepository;
  constructor({
    conditionRepository
  }: {
    conditionRepository: IConditionRepository;
  }) {
    this.conditionRepository = conditionRepository;
  }

  async getById(id: string): Promise<Condition> {
    return await this.conditionRepository.getById(id);
  }
  async delete(id: string): Promise<void> {
    await this.conditionRepository.delete(id);
  }
}
export default ConditionService;
