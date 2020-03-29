import Symptom from "../models/symptom";
import ISymptomService from "./interfaces/symptomSInterface";
import ISymptomRepository from "../repositories/interfaces/symptomRepoInterface";

class SymptomService implements ISymptomService {
  private readonly symptomRepository: ISymptomRepository;
  constructor({
    symptomRepository
  }: {
    symptomRepository: ISymptomRepository;
  }) {
    this.symptomRepository = symptomRepository;
  }

  async getAll(): Promise<Symptom[]> {
    return await this.symptomRepository.getAll();
  }
  async getById(id: string): Promise<Symptom> {
    return await this.symptomRepository.getById(id);
  }
  async create(newSymptom: Symptom): Promise<Symptom> {
    return await this.symptomRepository.create(newSymptom);
  }
  async update(id: string, updatedSymptom: Symptom): Promise<void> {
    return await this.symptomRepository.update(id, updatedSymptom);
  }
  async delete(id: string): Promise<void> {
    return await this.symptomRepository.delete(id);
  }
}

export default SymptomService;
