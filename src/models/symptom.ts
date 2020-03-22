export default class Symptom {
  _id: object;
  name: string;
  constructor({ name }: { name: string }) {
    this.name = name;
  }
}
