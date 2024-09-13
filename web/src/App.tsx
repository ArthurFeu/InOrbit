import { Dialog } from "./components/ui/dialog";
import { CreateGoal } from "./components/createGoal";
import { Summary } from "./components/summary";
import { EmptyGoals } from "./components/emptyGoals";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/getSummaryRequest";
// import React from 'react';
// import Confetti from 'react-confetti';

export function App() {
	const { data } = useQuery({
		queryKey: ["summary"],
		queryFn: getSummary,
		staleTime: 60000, // validar o quao obsoleto eh o dado para nao fazer a mesma requisicao varias vezes
	});

  console.log(data?.total)

	return (
		<Dialog>
			{data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}
      {/* <Confetti /> */}
			<CreateGoal />
		</Dialog>
	);
}

export default App;
