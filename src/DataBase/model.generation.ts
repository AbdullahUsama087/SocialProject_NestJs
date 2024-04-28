import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './Schemas/user.schema';
import { Post, postSchema } from './Schemas/post.schema';

const models = MongooseModule.forFeature([
  { name: User.name, schema: userSchema },
  { name: Post.name, schema: postSchema },
]);

export default models;
