import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingGoals } from "../http/getPendingGoalsRequest";
import { completeGoal } from "../http/completeGoalRequest";
import { useState } from "react";

export function PendingGoals() {
	const { data } = useQuery({
		queryKey: ["pendingGoals"],
		queryFn: getPendingGoals,
	});

	const queryClient = useQueryClient();

	if (!data) {
		return null;
	}

	async function handleCompleteGoal(goalId: string) {
		await completeGoal(goalId);
		queryClient.invalidateQueries({ queryKey: ["summary"] }); // faco a query do summary de novo para atualizar a pagina
		queryClient.invalidateQueries({ queryKey: ["pendingGoals"] });
	}

	return (
		<div className="flex flex-wrap gap-3">
			{data.map((goal) => {
				return (
					<OutlineButton
						key={goal.id}
						disabled={goal.completionCount === goal.desiredWeeklyFrequency}
						onClick={() => {
							handleCompleteGoal(goal.id);
						}} // arrow function para passar o parametro
					>
						<Plus />
						{goal.title}
					</OutlineButton>
				);
			})}
		</div>
	);
}
