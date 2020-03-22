import Condition from "../../models/condition";

interface IConditionServiceInterface {
  getAll(): Promise<Condition[]>;
  getById(id: string): Promise<Condition>;

  delete(id: string): Promise<void>;
}

export default IConditionServiceInterface;
