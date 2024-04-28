import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataBaseMethods } from 'src/DataBase/DataBaseMethods';
import { User } from 'src/DataBase/Schemas/user.schema';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly DBMethods: DataBaseMethods,
    private jwt: JwtService,
  ) {}

  getAuthData(): string {
    return 'Hello from AuthService';
  }

  async getUserData(req:any,res: any): Promise<object> {
    // const users = await this.userModel.find();
    console.log(req.authUser);
    
    return res.status(200).json({ message: 'Done', UserData:req.authUser });
  }

  addUserService(req: any, res: any): Promise<object> {
    const { name } = req.body;
    const { age } = req.query;

    return res.status(200).json({ message: 'Done', name: name + '__12', age });
  }

  async signUp(body: any, res: any): Promise<object> {
    const { name, email, password, age, gender } = body;
    // Check if Email exists or not
    const isUserExists = await this.DBMethods.findOneDocument(this.userModel, {
      email,
    });
    if (isUserExists) {
      throw new BadRequestException('This Email already exists');
    }
    // Hash Password
    const hashedPassword = bcrypt.hashSync(password as string, 8 as number);

    // const user = await this.userModel.create(userObject);
    const userObject = { name, email, password: hashedPassword, age, gender };
    const user = await this.DBMethods.saveDocument(this.userModel, userObject);
    if (!user) {
      throw new BadRequestException('Fail to add User');
    }
    return res
      .status(201)
      .json({ message: 'User successfully signedUp', user });
  }

  async signIn(req: any, res: any): Promise<object> {
    const { email, password } = req.body;
    // Check if Email already exists
    const isUserExists = await this.DBMethods.findOneDocument(this.userModel, {
      email,
    });
    if (!isUserExists) {
      throw new BadRequestException('Invalid Login Credentials');
    }

    // Check on Password
    const isPassMatch = bcrypt.compareSync(password, isUserExists.password);
    if (!isPassMatch) {
      throw new BadRequestException('Invalid Login Credentials');
    }
    // generate token
    const token = this.jwt.sign(
      {
        id: isUserExists._id,
        email: isUserExists.email,
      },
      {
        secret: 'SIGN_IN_TOKEN',
      },
    );

    return res.status(200).json({ message: 'Done', token });
  }
}
