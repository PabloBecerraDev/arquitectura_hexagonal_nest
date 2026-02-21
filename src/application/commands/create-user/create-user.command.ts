// application/commands/create-user/create-user.command.ts
export class CreateUserCommand {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly username: string,
        public readonly password: string,
        public readonly createdAt: Date = new Date(),

    ) {}
}