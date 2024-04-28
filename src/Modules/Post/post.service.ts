import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataBaseMethods } from 'src/DataBase/DataBaseMethods';
import { Post } from 'src/DataBase/Schemas/post.schema';

@Injectable()
class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private readonly DBMethods: DataBaseMethods,
  ) {}
  getPostData(): string {
    return 'Hello from Post Controller';
  }

  async addPost(req: any, res: any) {
    const { title, description } = req.body;
    const { userId } = req.params;
    const postObject = { title, description, userId };
    const post = await this.DBMethods.createDocument(
      this.postModel,
      postObject,
    );

    return res.status(201).json({ message: 'Post added successfully', post });
  }

  async getPosts(req: any, res: any) {
    const { userId } = req.params;
    const posts = await this.DBMethods.findOneDocument(this.postModel, {
      userId,
    });
    res.status(200).json({ message: 'Done', posts });
  }
}

export { PostService };
