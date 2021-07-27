import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { ICreateStatementDTO } from "./ICreateStatementDTO";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;

describe("Create Statement", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
  });

  it("should be able to create a new deposit", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "User Test",
      email: "user@email.com",
      password: "1234"
    });

    const statement = {
      user_id: user.id,
      type: "deposit",
      amount: 1000,
      description: "deposit test"
    } as ICreateStatementDTO;

    const response = await createStatementUseCase.execute(statement);
    expect(response).toHaveProperty("id");
    expect(response.type).toBe("deposit");
  });

  it("should be able to create a new withdraw", async () => {
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

    const response = await createStatementUseCase.execute(withdraw);
    expect(response).toHaveProperty("id");
    expect(response.type).toBe("withdraw");
  });

  it("should not be able to create a new withdraw with insufficient funds", async () => {
    expect(async () => {
      const user = await inMemoryUsersRepository.create({
        name: "User Test",
        email: "user@email.com",
        password: "1234"
      });

      const statement = {
        user_id: user.id,
        type: "withdraw",
        amount: 100,
        description: "withdraw test"
      } as ICreateStatementDTO;

      await createStatementUseCase.execute(statement);
    }).rejects.toBeInstanceOf(AppError);
  });
});
