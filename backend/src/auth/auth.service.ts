import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from '@/auth/dto/auth-credentials.dto';
import { JwtPayload } from '@/auth/jwt-payload.interface';
import { Crypto } from '@/common/crypto/crypto';
import { User } from '@/users/entities/user.entity';
import { RegistrationDto } from '@/auth/dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async validateUser(email: string, pass: string): Promise<User> {
    const user: User = await this.usersService.findOne(email);
    if (user && Crypto.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email/password combination');
    }
    const payload: JwtPayload = {
      username: user.email,
      sub: user.id.toString(),
    };
    return {
      user: user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registrationDto: RegistrationDto) {
    let user: User = null;
    try {
      // Create super admin user
      const password = Crypto.hash(registrationDto.password);
      user = this.userRepository.create({
        name: registrationDto.name,
        email: registrationDto.email,
        password,
      });
      user = await this.userRepository.save(user);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
    const payload: JwtPayload = {
      username: user?.email,
      sub: user?.id.toString(),
    };
    return {
      user: user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}