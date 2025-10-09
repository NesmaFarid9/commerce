import * as zod from "zod";

export const schemaReg = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name should at least 3 characters")
      .max(10, "Name should be at most 10 characters"),

    email: zod
      .string()
      .nonempty("Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/,
        "Email is invalid"
      ),

    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
        "Password is invalid"
      ),

    rePassword: zod.string().nonempty("Confirm password is required"),

    phone: zod.string().nonempty("Phone is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password and confirm password not match",
  });
