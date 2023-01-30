import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JwtAuthGuard} from '@/auth/jwt-auth.guard';
import {AuthModule} from '@/auth/auth.module';
import {UsersModule} from '@/users/users.module';
import {ConfigModule} from '@nestjs/config';
import {PokemonModule} from './pokemon/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PokemonModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ]
})

export class AppModule {}
