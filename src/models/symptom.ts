import Translation from "./translation";
export default class Symptom {
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
