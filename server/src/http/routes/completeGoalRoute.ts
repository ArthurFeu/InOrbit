import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { completeGoal } from "../../services/completeGoal";

export const completeGoalRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/completions",
		{
			schema: {
				body: z.object({
					goalId: z.string(),
				}),
			},
		},
		async (request) => {
			const { goalId } = request.body;

			await completeGoal({
				goalId,
			});
		},
	);
};
