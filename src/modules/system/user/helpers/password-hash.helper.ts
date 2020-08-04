import * as bcrypt from 'bcryptjs';
export async function passwordHash(password: string): Promise<string> {
  return await bcrypt.hash(password, 50);
}
