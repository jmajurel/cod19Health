import IConditionRepository from "./interfaces/conditionRepoInterface";
import Condition from "../models/condition";
import { Db, ObjectID as ObjectId, InsertOneWriteOpResult } from "mongodb";
import { resolve } from "dns";

class ConditionRepository implements IConditionRepository {
  private readonly dbClient: Db = null;
  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }
  async create(newCondition: Condition): Promise<Condition> {
    return await this.dbClient
      .collection("conditions")
      .insertOne(newCondition)
      .then(
        (result: InsertOneWriteOpResult<Condition>): Condition => result.ops[0]
      );
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
    await this.dbClient
      .collection("conditions")
      .deleteOne({ _id: new ObjectId(id) });
  }
}
export default ConditionRepository;
