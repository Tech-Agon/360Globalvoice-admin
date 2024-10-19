import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    text: z.string().min(1, 'Text is required'),
    featuredImage: z
        .instanceof(File)
        .refine((file) => !!file, {
            message: 'An image is required. Please upload an image file.',
        })
        .refine((file) => file.size <= 3 * 1024 * 1024, {
            message: 'The selected file exceeds the maximum size of 3MB. Please choose a smaller image.',
        })
        .refine((file) => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type), {
            message: 'Invalid file type. Please upload a JPEG, PNG, or GIF image.',
        })
});
