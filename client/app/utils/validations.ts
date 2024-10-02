import { z } from "zod";

const signupSchema = z.object({
   username: z.string().min(1, { message: "Username is required" }),
   email: z.string().email({ message: "Invalid email address" }),
   password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
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
