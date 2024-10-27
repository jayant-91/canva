import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@jayantdotcom/medium_common";
import { cors } from "hono/cors";

interface Env {
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}

export const blogRouter = new Hono<Env>();

// Authentication Middlewire
blogRouter.use("/*", async (c, next) => {
	// get the header
	// verify the header
	// if the header is correct, we need can proceed
	// if not, we return the user a 403 status code
	try {
		const header = c.req.header("authorization") || "";
		const token = header.split(" ")[1];

		const payload = await verify(token, c.env.JWT_SECRET);
		if (!payload) {
			c.status(401);
			return c.json({ error: "unauthorized" });
		}
		// @ts-ignore
		c.set("userId", payload.id); // In this line giving me a type error squegly line under set function
		await next();
	} catch (err) {
		c.status(411);
		return c.json({
			message: "something went wrong",
		});
	}
});

// For creating Blog it take bolog information and return blogId
blogRouter.post("/", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = createBlogInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "title and content are Invalid",
		});
	}
	const authorId = c.get("userId");
	try {
		const blog = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: authorId,
			},
		});

		return c.json({
			id: blog.id,
		});
	} catch (err) {
		c.status(411);
		c.json({
			message: "something went wrong wile creating blog",
		});
	}
});

// Route for update a blog it take blogid and update meterial
blogRouter.put("/", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = updateBlogInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "blog title or content is not correct",
		});
	}

	try {
		const blog = await prisma.post.update({
			where: {
				id: body.id,
			},
			data: {
				title: body.title,
				content: body.content,
			},
		});

		return c.json({
			id: blog.id,
		});
	} catch (err) {
		c.status(411);
		return c.json({
			message: "something went wrong while updating",
		});
	}
});

// Route to get all the blogs
// Todo: add pagination
blogRouter.get("/bulk", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const blogs = await prisma.post.findMany({
			select: {
				content: true,
				title: true,
				id: true,
				author: {
					select: {
						name: true,
					},
				},
			},
		});

		return c.json({
			blogs,
		});
	} catch (err) {
		c.status(411);
		return c.json({
			message: "something went wrong",
		});
	}
});

// Route for get a single blog
blogRouter.get("/:id", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const blogId = c.req.param("id");

	try {
		const blog = await prisma.post.findFirst({
			where: {
				id: blogId,
			},
			select: {
				content: true,
				title: true,
				id: true,
				author: {
					select: {
						name: true,
					},
				},
			},
		});

		return c.json({
			blog,
		});
	} catch (err) {
		c.status(401);
		return c.json({
			message: "Error while fetching blog post",
		});
	}
});


