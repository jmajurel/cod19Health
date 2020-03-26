import Symptom from "../../models/symptom";

interface ISymptomRepository {
  getAll(): Promise<Symptom[]>;
  getById(id: string): Promise<Symptom>;
  create(newSymptom: Symptom): Promise<Symptom>;
  update(id: string, updatedSymptom: Symptom): Promise<void>;
  delete(id: string): Promise<void>;
}

export default ISymptomRepository;
