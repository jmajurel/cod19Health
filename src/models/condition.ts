import Translation from "./translation";

export default class Condition {
  _id: object;
  name: string;
  translation: Translation;
  constructor({
    name,
    translation
  }: {
    name: string;
    translation: Translation;
  }) {
    this.name = name;
    this.translation = translation;
  }
}
