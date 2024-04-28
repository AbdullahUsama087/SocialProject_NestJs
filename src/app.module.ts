import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Modules/Auth/auth.module';
import { PostModule } from './Modules/Post/post.module';
import { MongooseModule } from '@nestjs/mongoose';

// MongooseModule.forRoot('mongodb://127.0.0.1/NestJsProject'),
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://abdallah:Abdallah1122@cluster0.lkrnakk.mongodb.net/SocialProject_NestJs',
    ),
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
