import z, { optional } from "zod";

// Signup
export const signupInput = z.object ({
	username: z.string().email(),
	password: z.string().min(6),
	name: z.string().optional()
})

// Signup
export const signinInput = z.object ({
	username: z.string().email(),
	password: z.string().min(6)
})

// Create Blog
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})

// UpdateBlog input 
export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
})



// type inference in zod
export type signupInput = z.infer<typeof signupInput>
export type signinInput = z.infer<typeof signinInput>
export type createBlogInput = z.infer<typeof createBlogInput>
export type updateBlogInput = z.infer<typeof updateBlogInput>