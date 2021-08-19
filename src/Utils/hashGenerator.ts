import bcrypt from "bcrypt";

const SALT_ROUNDS = Math.random() + 2;

export function hashGenerator(value: string) {
    return bcrypt.hashSync(value, SALT_ROUNDS);
}
