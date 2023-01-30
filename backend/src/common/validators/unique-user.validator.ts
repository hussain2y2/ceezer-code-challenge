import { ConflictException } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '@/users/users.service';

@ValidatorConstraint({ name: 'UniqueUser', async: true })
export class UniqueUserValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(
    value: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (value) {
      const user = await this.usersService.findOne(value);
      return !user;
    }
    return false;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    throw new ConflictException(
      `${validationArguments.value} is already taken`,
    );
  }
}