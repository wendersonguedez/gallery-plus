import { z } from "zod";

export const albumNewFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: "O título é de preenchimento obrigatório!" })
		.max(255),

	photosIds: z.array(z.string().uuid()).optional(),
});

export type AlbumNewFormData = z.infer<typeof albumNewFormSchema>;
