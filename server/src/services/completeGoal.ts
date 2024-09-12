import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema/schema";
import { and, count, lte, gte, sql, eq } from "drizzle-orm";

interface CompleteGoalRequest {
	goalId: string;
}

// response "desestrturada"
export async function completeGoal({ goalId }: CompleteGoalRequest) {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	const goalCompletionCount = db.$with("goal_completion_count").as(
		db
			.select({
				goalId: goalCompletions.goalId,
				completionCount: count(goalCompletions.id).as("completionCount"), // common table expression -> precisam sempre de um AS, ou seja, um nome
			})
			.from(goalCompletions)
			.where(
				and(
					gte(goalCompletions.createdAt, firstDayOfWeek), // greater than or equal
					lte(goalCompletions.createdAt, lastDayOfWeek),
					eq(goalCompletions.goalId, goalId),
				),
			)
			.groupBy(goalCompletions.goalId),
	);

	const result = await db
		.with(goalCompletionCount)
		.select({
			desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
			completionCount: sql`
			COALESCE(${goalCompletionCount.completionCount}, 0)`.mapWith(Number), // se for nulo, retornamos 0 e transformamos em number
		})
		.from(goals)
		.leftJoin(goalCompletionCount, eq(goalCompletionCount.goalId, goals.id))
		.where(eq(goals.id, goalId))
		.limit(1);

	const { completionCount, desiredWeeklyFrequency } = result[0];

	if (completionCount >= desiredWeeklyFrequency) {
		throw new Error("Goal already completed this week!");
	}

	//sempre retorna um array, mesmo que seja de um unico elemento
	const insertResult = await db
		.insert(goalCompletions)
		.values({
			goalId,
		})
		.returning();

	const goalCompletion = insertResult[0];

	return {
		goalCompletion,
	};
}
