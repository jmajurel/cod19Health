import Symptom from "../../models/symptom";
import { Db } from "mongodb";

const fever = new Symptom({ name: "fever", translation: null });

class SymptomStore {
  public symptoms: Symptom[];
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.symptoms = [];
    this.dbClient = dbClient;
    this.addSymptom(fever);
  }

  addSymptom(newSymptom: Symptom): SymptomStore {
    this.symptoms.push(newSymptom);
    return this;
  }

  async mount() {
    const promises = [];
    for (let i = 0; i < this.symptoms.length; i++) {
      promises.push(
        this.dbClient
          .collection("symptoms")
          .insertOne(new Symptom(this.symptoms[i]))
      );
    }
    await Promise.all(promises);
    return;
  }
}

export default SymptomStore;
