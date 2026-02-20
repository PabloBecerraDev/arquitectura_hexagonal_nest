export class User {
    constructor(
        public readonly id: string,
        public username: string,
        public password: string,
        public readonly createdAt: Date,
    ){}

    updateUsername(newUsername: string): void {
        if (!newUsername || newUsername.trim().length < 3) {
            throw new Error('Username must be at least 3 characters');
        }
        this.username = newUsername.trim();
    }

    updatePassword(hashedPassword: string): void {
        if (!hashedPassword) {
            throw new Error('Password cannot be empty');
        }
        this.password = hashedPassword;
    }
}