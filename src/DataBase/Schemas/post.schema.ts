import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

@Schema()
class Post {
  @Prop({
    type: String,
    required: true,
    min: 5,
    max: 25,
  })
  title: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: User;
}

const postSchema = SchemaFactory.createForClass(Post);

// const postModel=MongooseModule.forFeature([{name:Post.name,schema:postSchema}])

export { Post, postSchema };
