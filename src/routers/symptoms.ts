import { route, GET, POST, before, DELETE } from "awilix-express";
import ISymptomService from "../services/interfaces/symptomSInterface";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import Symptom from "../models/symptom";

@route("/symptoms")
export default class SymptomAPI {
  private readonly _symptomService: ISymptomService;
  constructor({ symptomService }: { symptomService: ISymptomService }) {
    this._symptomService = symptomService;
  }
  @GET()
  async getAll(req: Request, res: Response) {
    res.status(200).json(await this._symptomService.getAll());
  }
  @route("/:id")
  @GET()
  async getById(req: Request, res: Response) {
    res.status(200).json(await this._symptomService.getById(req.params.id));
  }

  @POST()
  @before([bodyParser()])
  async create(req: Request, res: Response) {
    res
      .status(201)
      .json(await this._symptomService.create(new Symptom({ ...req.body })));
  }

  @route("/:id")
  @DELETE()
  async delete(req: Request, res: Response) {
    await this._symptomService.delete(req.params.id);
    res.status(204).json();
  }
}
