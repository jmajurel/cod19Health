export default class Condition {
  _id: object;
  name: string;
  constructor({ name }: { name: string }) {
    this.name = name;
  }
}
