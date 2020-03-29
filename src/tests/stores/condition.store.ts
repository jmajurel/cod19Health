import Condition from "../../models/condition";
import { Db } from "mongodb";

const diabetes = new Condition({ name: "diabetes", translation: null });

class ConditionStore {
  public conditions: Condition[];
  private readonly dbClient: Db;
  constructor({ dbClient }: { dbClient: Db }) {
    this.conditions = [];
    this.dbClient = dbClient;
    this.addCondition(diabetes);
  }

  addCondition(newCondition: Condition): ConditionStore {
    this.conditions.push(newCondition);
    return this;
  }

  async mount() {
    const promises = [];
    for (let i = 0; i < this.conditions.length; i++) {
      promises.push(
        this.dbClient
          .collection("conditions")
          .insertOne(new Condition(this.conditions[i]))
      );
    }
    await Promise.all(promises);
    return;
  }
}

export default ConditionStore;
