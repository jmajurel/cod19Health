import Symptom from "../../models/symptom";

interface ISymptomService {
  getAll(): Promise<Symptom[]>;
  getById(id: string): Promise<Symptom>;
  create(newSymptom: Symptom): Promise<Symptom>;
  delete(id: string): Promise<void>;
}

export default ISymptomService;
