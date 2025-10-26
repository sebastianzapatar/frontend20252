import { z } from "zod";
import { validateStrongPassword } from "@/app/lib/auth-password";

const strongPwd = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .refine((v) => /[a-z]/.test(v), { message: "Debe incluir al menos 1 minúscula" })
  .refine((v) => /[A-Z]/.test(v), { message: "Debe incluir al menos 1 mayúscula" })
  .refine((v) => /\d/.test(v),   { message: "Debe incluir al menos 1 número" })
  .refine((v) => (v.match(/[^A-Za-z0-9]/g) || []).length >= 2, { message: "Debe incluir al menos 2 símbolos" })
  .refine((v) => validateStrongPassword(v).ok, { message: "La contraseña no cumple los requisitos" });

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: strongPwd,
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: strongPwd, // igual a tu DTO de login
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema    = z.infer<typeof loginSchema>;
