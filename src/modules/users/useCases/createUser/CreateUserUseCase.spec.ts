import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserError } from "./CreateUserError"
import { CreateUserUseCase } from "./CreateUserUseCase"

let createUserUseCase: CreateUserUseCase
let inMemoryUsersRepository: InMemoryUsersRepository

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {

    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "test@email.com",
      password: "senha"
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a user with an email already registered", async () => {
    expect( async () => {
      const user = ({
        name: "User Test",
        email: "test@email.com",
        password: "senha"
      });
      await createUserUseCase.execute(user);
      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(CreateUserError);
  });
})
