import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema/schema";
import { and, lte, gte, sql, eq } from "drizzle-orm";

export async function getWeekSummary() {
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
        .where(lte(goals.createdAt, lastDayOfWeek)) //lower than or equal
    );

  const goalsCompletedInWeek = db.$with("goal_completed_in_week").as(
    db
      .select({
        goalId: goals.id,
        title: goals.title,
        goalCreatedAt: goals.createdAt, // Especifica a tabela goals
        completedAt: sql`${goalCompletions.createdAt}`.as(
          "completedAt"
        ), // Especifica a tabela goalCompletions
        completedAtDate: sql`DATE(${goalCompletions.createdAt})`.as(
          "completedAtDate"
        ),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek), // greater than or equal
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
  );

  const goalsCompletedByWeekDay = db.$with("goals_completed_by_week_day").as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ${goalsCompletedInWeek.goalId},
              'title', ${goalsCompletedInWeek.title},
              'completedAt', ${goalsCompletedInWeek.completedAt}
            )
          )
        `.as("completions"),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
  );

  const result = await db
    .with(
      goalsCreatedUntilCurrentWeek,
      goalsCompletedInWeek,
      goalsCompletedByWeekDay
    )
    .select({
      completed: sql`(SELECT COUNT(*) FROM ${goalsCompletedInWeek})`.mapWith(Number),
      total: sql`(SELECT SUM(${goalsCreatedUntilCurrentWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUntilCurrentWeek})`.mapWith(Number),
      goalsPerDay: sql`JSON_OBJECT_AGG(
        ${goalsCompletedByWeekDay.completedAtDate},
        ${goalsCompletedByWeekDay.completions}
      )` // criei um objeto com os valores
    })
    .from(goalsCompletedByWeekDay);

  return {
    summary: result,
  };
}
