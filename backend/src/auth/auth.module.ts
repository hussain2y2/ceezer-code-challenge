import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { UniqueUserValidator } from '@/common/validators/unique-user.validator';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UniqueUserValidator,
  ],
  controllers: [AuthController],
})
export class AuthModule {}