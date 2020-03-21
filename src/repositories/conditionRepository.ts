import IConditionRepository from "./interfaces/conditionRepoInterface";
import Condition from "../models/condition";
import { Db } from "mongodb";

class ConditionRepository implements IConditionRepository {
  private readonly dbClient: Db = null;
  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }

  async getById(id: string): Promise<Condition> {
    console.dir(this.dbClient);
    return await this.dbClient.collection("conditions").findOne({ _id: id });
  }

  async delete(id: string): Promise<void> {
    await this.dbClient.collection("conditions").deleteOne({ _id: id });
  }
}
export default ConditionRepository;
