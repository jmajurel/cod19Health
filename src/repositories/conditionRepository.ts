import IConditionRepository from "./interfaces/conditionRepoInterface";
import Condition from "../models/condition";
import { Db, ObjectID as ObjectId } from "mongodb";

class ConditionRepository implements IConditionRepository {
  private readonly dbClient: Db = null;
  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }
  async getAll(): Promise<Condition[]> {
    return await (this.dbClient
      .collection("conditions")
      .find({})
      .toArray() as Promise<Condition[]>);
  }

  async getById(id: string): Promise<Condition> {
    return await this.dbClient
      .collection("conditions")
      .findOne({ _id: new ObjectId(id) });
  }

  async delete(id: string): Promise<void> {
    await this.dbClient.collection("conditions").deleteOne({ _id: id });
  }
}
export default ConditionRepository;
