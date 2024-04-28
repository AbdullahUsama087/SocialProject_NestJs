import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { DataBaseMethods } from 'src/DataBase/DataBaseMethods';
import models from 'src/DataBase/model.generation';

@Module({
  imports: [models],
  controllers: [PostController],
  providers: [PostService, DataBaseMethods],
})
export class PostModule {}
