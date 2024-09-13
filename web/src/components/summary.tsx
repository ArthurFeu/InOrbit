import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { DialogTrigger } from "../components/ui/dialog";
import logoBullet from "../assets/logo-bullet.svg";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/getSummaryRequest";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-BR";
import { PendingGoals } from "./pendingGoals";

dayjs.locale(ptBR);

export function Summary() {
	const { data } = useQuery({
		queryKey: ["summary"],
		queryFn: getSummary,
		staleTime: 60000, // validar o quao obsoleto eh o dado para nao fazer a mesma requisicao varias vezes
	});

	if (!data) {
		return null;
	}

	const firstDayOfWeek = dayjs().startOf("week").format("D MMMM");
	const lastDayOfWeek = dayjs().endOf("week").format("D MMMM");
	const goalProgressPercentage = (data?.completed / data?.total) * 100;

	return (
		<div className="py-10 max-w-lg px-5 mx-auto flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<img src={logoBullet} alt="bullet in.orbit logo" />
					<span className="text-lg font-semibold capitalize">
						{firstDayOfWeek} - {lastDayOfWeek}
					</span>
				</div>

				<DialogTrigger asChild>
					<Button size="sm">
						<Plus className="size-4" />
						Cadastrar Meta
					</Button>
				</DialogTrigger>
			</div>

			<div className="felx flex-col gap-3">
				<Progress value={10} max={15}>
					<ProgressIndicator style={{ width: `${goalProgressPercentage}%` }} />
				</Progress>

				<div className="flex items-center justify-between py-5 text-xs text-zinc-400">
					<span>
						Você completou{" "}
						<span className="text-zinc-100">{data?.completed}</span> de{" "}
						<span className="text-zinc-100">{data?.total}</span> metas nessa
						semana.
					</span>
					<span>{goalProgressPercentage.toFixed()}%</span>
				</div>

				<Separator />
				<br />

				<PendingGoals />
				<br />

				<Separator />
				<br />

				<div className="flex flex-col gap-6">
					<h1 className="text-2xl font-medium">Relatório semanal:</h1>

					{Object.entries(data.goalsPerDay).map(([date, goals]) => {
						const weekDay = dayjs(date).format("dddd");
						const dayAndMonth = dayjs(date).format("D[ de ]MMMM");

						return (
							<div key={date} className="flex flex-col gap-4">
								<h3 className="font-medium">
									<span className="capitalize">{weekDay} </span>
									<span className="text-zinc-400 text-xs">({dayAndMonth})</span>
								</h3>

								<ul className="flex flex-col gap-3">
									{goals.map((goal) => {
										const timeCompleted = dayjs(goal.completedAt).format(
											"HH[h]mm",
										);
										return (
											<li key={goal.id} className="flex items-center gap-2">
												<CheckCircle2 className="size-4 text-pink-500" />
												<span className="text-sm text-zinc-400">
													Você completou{" "}
													<span className="text-zinc-100">{goal.title}</span> às{" "}
													<span className="text-zinc-100">{timeCompleted}</span>
												</span>
											</li>
										);
									})}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
