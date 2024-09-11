import { db } from "../db";
import { goals } from "../db/schema/schema";

interface CreateGoalRequest {
	title: string;
	desiredWeeklyFrequency: number;
}

// response "desestrturada"
export async function createGoal({
	title,
	desiredWeeklyFrequency,
}: CreateGoalRequest) {
	// sempre retorna um array, mesmo que seja de um unico elemento
	const result = await db
		.insert(goals)
		.values({
			title,
			desiredWeeklyFrequency,
		})
		.returning();

	const goal = result[0];

	return {
		goal,
	};
}
