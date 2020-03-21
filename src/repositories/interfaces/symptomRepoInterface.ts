import Symptom from "../../models/symptom";

interface ISymptomRepository {
  getById(id: string): Symptom;
  delete(id: string): void;
}

export default ISymptomRepository;
