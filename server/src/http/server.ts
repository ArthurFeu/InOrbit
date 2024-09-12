import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createGoalRoute } from "./routes/createGoalRoute";
import { completeGoalRoute } from "./routes/completeGoalRoute";
import { getWeekPendingGoalsRoute } from "./routes/getWeekPendingGoalsRoute";
import { getWeekSummaryRoute } from "./routes/getWeekSummaryRoute";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createGoalRoute);
app.register(completeGoalRoute);
app.register(getWeekPendingGoalsRoute);
app.register(getWeekSummaryRoute);

app
	.listen({
		port: 3333,
	})
	.then(() => {
		console.log("HTTP Server running on port 3333");
	});
