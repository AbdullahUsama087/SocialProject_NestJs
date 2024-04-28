import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class signUpBodyDTO {
  @IsString()
  @MinLength(3, { message: 'Your Name must be at least 3 chars' })
  @MaxLength(20, { message: 'Your Name must not exceed 20 characters' })
  name: string;

  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsEnum(['Female', 'Male'])
  gender: string;
}

export { signUpBodyDTO };
