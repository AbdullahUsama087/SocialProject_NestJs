import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import {PostService} from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly post: PostService) {}

  @Get()
  postController() {
    return this.post.getPostData();
  }

  @Get('/:userId')
  getPosts(
    @Req() req:Request,
    @Res() res:Response
  ){
    return this.post.getPosts(req,res)
  }

  @Post('add/:userId')
  addPost(
    @Req() req:Request,
    @Res() res:Response
  ){
    return this.post.addPost(req,res)
  }
}
