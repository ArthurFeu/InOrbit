// Arquivo para popular o BD com dados ficticios

import { client, db } from ".";
import { goalCompletions, goals } from "./schema/schema";
import dayjs from "dayjs";

async function seed() {
	await db.delete(goalCompletions);
	await db.delete(goals);

	const goalResult = await db
		.insert(goals)
		.values([
			{
				title: "Acordar cedo",
				desiredWeeklyFrequency: 5,
			},
			{
				title: "Estudar programacao",
				desiredWeeklyFrequency: 7,
			},
			{
				title: "Academia",
				desiredWeeklyFrequency: 4,
			},
		])
		.returning();

	const startOfWeek = dayjs().startOf("week");

	await db.insert(goalCompletions).values([
		{
			goalId: goalResult[0].id,
			createdAt: startOfWeek.toDate(),
		},

		{
			goalId: goalResult[1].id,
			createdAt: startOfWeek.add(1, "day").toDate(),
		},
	]);
}

seed().finally(() => {
	client.end();
});
