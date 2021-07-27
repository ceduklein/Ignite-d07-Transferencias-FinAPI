import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate user", async () => {
    await createUserUseCase.execute({
      name: "test",
      email: "test@email.com",
      password: "senha"
    });

    const userAuthenticated = await authenticateUserUseCase.execute({
      email: "test@email.com",
      password: "senha"
    });

    expect(userAuthenticated).toHaveProperty("token");
  });

  it("should not be able no authenticate a nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "senha"
      })
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });

  it("should not be able to authenticate user with incorrect password", () => {
    expect(async () => {
      const user = {
        name: "User",
        email: "user@email.com",
        password: "correct"
      }

      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong"
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  })
})
