import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe("Get Balance", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, inMemoryUsersRepository);
  });

  it("should be able to get user balance", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "User Test",
      email: "user@email.com",
      password: "1234"
    });

    const deposit = {
      user_id: user.id,
      type: "deposit",
      amount: 1000,
      description: "deposit test"
    } as ICreateStatementDTO

    await createStatementUseCase.execute(deposit);

    const withdraw = {
      user_id: user.id,
      type: "withdraw",
      amount: 500,
      description: "withdraw test"
    } as ICreateStatementDTO;

    await createStatementUseCase.execute(withdraw);

    const response = await getBalanceUseCase.execute({ user_id : user.id as string });
    expect(response.balance).toBe(500);
  });
})
