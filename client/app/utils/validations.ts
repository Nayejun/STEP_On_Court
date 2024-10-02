import { z } from "zod";

const signupSchema = z.object({
   username: z.string().min(1, { message: "이름은 필수입니다." }),
   email: z.string().email({ message: "이메일 주소를 확인해주세요." }),
   password: z
      .string()
      .min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
});

type SignupData = z.infer<typeof signupSchema>;

export const validateSignup = (data: SignupData) => {
   try {
      signupSchema.parse(data);
      return { success: true, errors: null };
   } catch (e) {
      if (e instanceof z.ZodError) {
         return { success: false, errors: e.errors };
      }
      return { success: false, errors: [{ message: "Unknown error" }] };
   }
};
const loginSchema = z.object({
   email: z.string().email({ message: "이메일 주소를 확인해주세요." }),
   password: z
      .string()
      .min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
});

type LoginData = z.infer<typeof loginSchema>;

export const validateLogin = (data: LoginData) => {
   try {
      loginSchema.parse(data);
      return { success: true, errors: null };
   } catch (e) {
      if (e instanceof z.ZodError) {
         return { success: false, errors: e.errors };
      }
      return { success: false, errors: [{ message: "Unknown error" }] };
   }
};
