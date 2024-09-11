import z from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);

// ZOD garante que a variavel existe ou entao retorna uma excessao.