import ISymptomRepository from "./interfaces/symptomRepoInterface";
import { Db, InsertOneWriteOpResult, ObjectId } from "mongodb";
import Symptom from "../models/symptom";

class SymptomRepository implements ISymptomRepository {
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.dbClient = dbClient;
  }
  async getAll(): Promise<Symptom[]> {
    return await (this.dbClient
      .collection("symptoms")
      .find({})
      .toArray() as Promise<Symptom[]>);
  }
  async getById(id: string): Promise<Symptom> {
    return await this.dbClient
      .collection("symptoms")
      .findOne({ _id: new ObjectId(id) });
  }
  async create(newSymptom: Symptom): Promise<Symptom> {
    return await this.dbClient
      .collection("symptoms")
      .insertOne(newSymptom)
      .then(
        (result: InsertOneWriteOpResult<Symptom>): Symptom => result.ops[0]
      );
  }
  async delete(id: string): Promise<void> {
    await this.dbClient
      .collection("symptoms")
      .deleteOne({ _id: new ObjectId(id) });
  }
}
export default SymptomRepository;
