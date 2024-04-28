import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import models from 'src/DataBase/model.generation';
import { DataBaseMethods } from 'src/DataBase/DataBaseMethods';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [models],
  controllers: [AuthController],
  providers: [AuthService, DataBaseMethods, JwtService],
})
export class AuthModule {}
