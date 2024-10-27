import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@jayantdotcom/medium_common";
import { cors } from "hono/cors";



interface Env {
	Bindings: {
		DATABASE_URL: string; 
		JWT_SECRET: string;
	};
}

export const userRouter = new Hono<Env>();


// SignUp Route that take email, password and send back jwt token
userRouter.post("/signup", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "Input not correct"
		})
	}

	try {
		// Trying to ensure that user with the same email dose not exist

		const user = await prisma.user.create({
			data: {
				name: body.name,
				email: body.username,
				password: body.password,
			},
		});

		const token = await sign({
            id: user.id 
        }, c.env.JWT_SECRET);

		return c.json({ jwt: token });
	} catch (err) {

		c.status(411);
		return c.json({
			message: "User already exists with this email"
		});
	}
});




// SignIn Route that take correct username password and send back jwt token
userRouter.post("/signin", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if ( !success ) {
		c.status(411);
		return c.json({
			message: "Input not correct"
		})
	}

	try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.username,
        password: body.password,
      },
    });
  
    if (!user) {
      c.status(403);
      return c.json({ errro: "user not found" });
    }
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  
    return c.json({ jwt: jwt });
  } catch (err) {

    c.status(411);
    return c.json({
		message: 'Invalid'
  	});
  }
});