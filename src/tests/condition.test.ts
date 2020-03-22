import container from "./setup";
import IConditionServiceInterface from "../services/interfaces/conditionSInterface";

describe("get", () => {
  it("get all condition", async () => {
    const service: IConditionServiceInterface = container.resolve(
      "conditionService"
    );

    const result = await service.getById("20");
    expect(result).toBeTruthy();
  });
});
