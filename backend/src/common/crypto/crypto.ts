import * as bcrypt from 'bcrypt';

export class Crypto {
  static hash(str: string): string {
    const saltOrRounds = 10;
    return bcrypt.hashSync(str, saltOrRounds);
  }

  static compare(str: string, hash: string): boolean {
    return bcrypt.compareSync(str, hash);
  }
}
