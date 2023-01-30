import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  Validate,
} from 'class-validator';
import { Match } from '@/common/validators/match.validator';
import { UniqueUserValidator } from '@/common/validators/unique-user.validator';

export class RegistrationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Validate(UniqueUserValidator)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsString()
  @Match('password')
  passwordConfirmation: string;

}