import { z } from 'zod';

const signUpSchema = z
  .object({
    name: z.string().min(3).max(10),
    email: z.string().email(),
    password: z.string(),
    cPassword: z.string(),
    age: z.number(),
  })
  .required()
  .superRefine((val: any, ctx: any) => {
    console.log(val);

    if (val.password !== val.cPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password mismatch cPassword',
        path: ['cPassword'],
      });
    }
  });

const signInSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .required();

export { signUpSchema, signInSchema };
