import bcrypt from 'bcrypt';

export async function encryptPassword(password: string) {
    password = await bcrypt.hash(password, 8); // Aplicando hash
    return password;
}