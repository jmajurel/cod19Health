import { route, GET, POST, before, DELETE } from "awilix-express";
import IConditionSInterface from "../services/interfaces/conditionSInterface";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import Condition from "../models/condition";

@route("/conditions")
export default class ConditionAPI {
  private readonly _conditionService: IConditionSInterface;
  constructor({
    conditionService
  }: {
    conditionService: IConditionSInterface;
  }) {
    this._conditionService = conditionService;
  }
  @GET()
  async getAll(req: Request, res: Response) {
    res.status(200).json(await this._conditionService.getAll());
  }
  @route("/:id")
  @GET()
  async getById(req: Request, res: Response) {
    res.status(200).json(await this._conditionService.getById(req.params.id));
  }

  @POST()
  @before([bodyParser()])
  async create(req: Request, res: Response) {
    res
      .status(201)
      .json(
        await this._conditionService.create(new Condition({ ...req.body }))
      );
  }

  @route("/:id")
  @DELETE()
  async delete(req: Request, res: Response) {
    await this._conditionService.delete(req.params.id);
    res.status(204).json();
  }
}
