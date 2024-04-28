import { Body, Controller, Get, Post, Query, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/Guards/auth.guard';
import { signUpBodyDTO } from './auth.dto';
import { ZodValidationPipe } from 'src/Pipes/validation.pipe';
import { signInSchema, signUpSchema } from './auth.validationSchema';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  // API Routers
  @Get()
  testAuthGet(): string {
    // call method from Auth Service
    return this.auth.getAuthData();
  }

  @Get('user')
  @UseGuards(AuthGuard)
  getUserData(
    @Req() req:Request,
    @Res() res:Response
  ): object {
    return this.auth.getUserData(req,res);
  }

  @Post()
  addUserData(
    // ================== Way One =================
    // @Body() body:object,
    // @Query() query:object

    // ================== Way Two =================
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // console.log(req,res);

    // const {name}=req.body
    // const{age}=req.query

    // console.log({name,age});

    // return res.status(200).json({message:'done',name:name+'__445'})
    return this.auth.addUserService(req, res);
  }

  @Post('signUp')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  signUpHandler(
    @Body() body:any,
    
    @Res() res:Response
  ){
    return this.auth.signUp(body,res)
  }

  @Post('signIn')
  @UsePipes(new ZodValidationPipe(signInSchema))
  signInHandler(
@Req() req:Request,
@Res() res:Response
  ){
    return this.auth.signIn(req,res)
  }
}
