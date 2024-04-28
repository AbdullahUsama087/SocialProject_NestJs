import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: Number,
  })
  age: number;

  @Prop({
    type: String,
    enum: ['Male', 'Female'],
  })
  gender: string;
}

export const userSchema = SchemaFactory.createForClass(User);

// export const userModel=MongooseModule.forFeature([{name:User.name,schema:userSchema}])
