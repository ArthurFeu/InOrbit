import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema/schema";
import { and, count, lte, gte, sql, eq } from "drizzle-orm";

export async function getWeekPendingGoals() {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	const goalsCreatedUntilCurrentWeek = db
		.$with("goals_created_until_current_week")
		.as(
			db
				.select({
					id: goals.id,
					title: goals.title,
					desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
					createdAt: goals.createdAt,
				})
				.from(goals)
				.where(lte(goals.createdAt, lastDayOfWeek)), //lower than or equal
		);

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
				),
			)
			.groupBy(goalCompletions.goalId),
	);

	const pendingGoals = await db
		.with(goalsCreatedUntilCurrentWeek, goalCompletionCount)
		.select({
			id: goalsCreatedUntilCurrentWeek.id,
			title: goalsCreatedUntilCurrentWeek.title,
			desiredWeeklyFrequency:
				goalsCreatedUntilCurrentWeek.desiredWeeklyFrequency,
			completionCount: sql`
			COALESCE(${goalCompletionCount.completionCount}, 0)`.mapWith(Number), // se for nulo, retornamos 0 e transformamos em number
		})
		.from(goalsCreatedUntilCurrentWeek)
		.leftJoin(
			goalCompletionCount,
			eq(goalCompletionCount.goalId, goalsCreatedUntilCurrentWeek.id),
		); // entendemos que registros de completion possam nao existir, mas ainda quero retorna que nao houveram metas completas. Um inner join nao retornaria nem a meta em si.

	return {
		pendingGoals,
	};
}
