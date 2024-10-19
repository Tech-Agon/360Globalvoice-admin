import { z } from "zod";

export const newsSchema = z.object({
	title: z
		.string()
		.min(1, 'Title is required'),
	image: z
	.instanceof(File)
	.refine((file) => file.size <= 3 * 1024 * 1024, 'Max file size is 3MB').optional(),
	description: z
		.string()
		.min(1, 'Description is required')

});

export type NewsFormValues = z.infer<typeof newsSchema>;