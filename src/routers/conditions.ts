import { route, GET, POST, before } from "awilix-express";
import IConditionSInterface from "../services/interfaces/conditionSInterface";
import { Request, Response } from "express";

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
}
