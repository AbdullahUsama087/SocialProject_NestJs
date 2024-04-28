import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Observable } from 'rxjs';
import { DataBaseMethods } from 'src/DataBase/DataBaseMethods';
import { User } from 'src/DataBase/Schemas/user.schema';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private methods: DataBaseMethods,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log({ request });

    const { authorization } = request.headers;
    console.log(authorization);

    // Check on Authorization
    if (!authorization) {
      throw new BadRequestException('Please LogIn First');
    }

    // Check on Authorization Perfix
    if (!authorization.startsWith('Nest')) {
      throw new BadRequestException('Wrong Perfix');
    }

    // Check on token
    const token = authorization.split('Nest')[1];
    const decodedData = this.jwt.verify(token, { secret: 'SIGN_IN_TOKEN' });
    if (!decodedData || !decodedData.id) {
      throw new BadRequestException('Wrong Token');
    }

    const user = await this.methods.findOneDocument(this.userModel, {
      _id: decodedData.id,
    });

    request.authUser = user;

    return request;
  }
}

export { AuthGuard };
