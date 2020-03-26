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

  async create(newCondition: Condition): Promise<Condition> {
    return await this.conditionRepository.create(newCondition);
  }

  async update(id: string, updatedCondition: Condition): Promise<void> {
    return await this.conditionRepository.update(id, updatedCondition);
  }

  async getAll(): Promise<Condition[]> {
    return await this.conditionRepository.getAll();
  }

  async getById(id: string): Promise<Condition> {
    return await this.conditionRepository.getById(id);
  }
  async delete(id: string): Promise<void> {
    await this.conditionRepository.delete(id);
  }
}
export default ConditionService;
