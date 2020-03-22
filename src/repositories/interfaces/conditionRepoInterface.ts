import Condition from "../../models/condition";

interface IConditionRepository {
  getById(id: string): Promise<Condition>;
  getAll(): Promise<Condition[]>;
  delete(id: string): Promise<void>;
}
export default IConditionRepository;
