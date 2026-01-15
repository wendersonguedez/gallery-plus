import { z } from "zod";

export const photoNewFormSchema = z.object({
	title: z.string().min(1, { message: "O título é obrigatório!" }),

	file: z.instanceof(FileList).refine((file) => file.length > 0, {
		message: "A imagem é obrigatória!",
	}),

	albumsIds: z.array(z.string().uuid()).optional(),
});

/**
 * Tipo inferido automaticamente a partir do schema de validação acima.
 *
 * Utilizado para tipar o formulário (React Hook Form), garantindo que o TypeScript
 * reconheça os campos (autocomplete) e valide os dados antes do envio.
 */
export type PhotoNewFormData = z.infer<typeof photoNewFormSchema>;
