import { route, GET, POST, before } from "awilix-express";
import IConditionSInterface from "../services/interfaces/conditionSInterface";
import { Request, Response } from "express";
import ConditionService from "..//services/conditionService";

@route("/conditions")
export default class ConditionAPI {
  private readonly _conditionService: IConditionSInterface;
  constructor({ conditionService }: { conditionService: ConditionService }) {
    this._conditionService = conditionService;
  }
  @route("/:id")
  @GET()
  async getConditions(req: Request, res: Response) {
    res.send(await this._conditionService.getById(req.params.id));
  }
}