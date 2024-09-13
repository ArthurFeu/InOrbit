import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
	RadioGroup,
	RadioGroupIndicator,
	RadioGroupItem,
} from "../components/ui/radio-group";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGoal } from "../http/createGoalRequest";
import { useQueryClient } from "@tanstack/react-query";

export function CreateGoal() {
	const createGoalForm = z.object({
		title: z.string().min(1, "Informe a atividade que deseja realizar"),
		desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
	});

	const { register, control, handleSubmit, formState, reset } =
		useForm<CreateGoalForm>({
			// control => objeto que tem varias funcoes para acessar itens do formulario
			resolver: zodResolver(createGoalForm),
		});

	type CreateGoalForm = z.infer<typeof createGoalForm>;

	const queryClient = useQueryClient();

	async function handleCreateGoal(data: CreateGoalForm) {
		await createGoal({
			title: data.title,
			desiredWeeklyFrequency: data.desiredWeeklyFrequency,
		});

		queryClient.invalidateQueries({ queryKey: ["summary"] });
		queryClient.invalidateQueries({ queryKey: ["pendingGoals"] });

		reset();
	}

	return (
		<DialogContent>
			<div className="flex flex-col gap-6 h-full">
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<DialogTitle>Cadastrar Meta</DialogTitle>
						<DialogClose>
							<X className="size-3 text-zinc-50" />
						</DialogClose>
					</div>

					<DialogDescription>
						Adicione atividades que te fazem bem e que você quer continuar
						praticando toda semana.
					</DialogDescription>
				</div>

				<form
					onSubmit={handleSubmit(handleCreateGoal)}
					className="flex-1 flex flex-col justify-between"
				>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Qual a atividade?</Label>
							<Input
								id="title"
								placeholder="Praticar exercícios, meditar, etc..."
								{...register("title")} // para valores nativos do html
							/>

							{formState.errors.title && (
								<p className="text-red-600 text-sm">
									{formState.errors.title.message}
								</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Quantas vezes na semana?</Label>
							<Controller
								defaultValue={1}
								control={control}
								name="desiredWeeklyFrequency"
								render={({ field }) => {
									return (
										<RadioGroup
											onValueChange={field.onChange}
											value={String(field.value)}
										>
											{/* agora consigo pegar o value dos botoes */}
											<RadioGroupItem value="1">
												<RadioGroupIndicator />
												<span>1x na semana</span>
												<span>🥱</span>
											</RadioGroupItem>
											<RadioGroupItem value="2">
												<RadioGroupIndicator />
												<span>2x na semana</span>
												<span>😌</span>
											</RadioGroupItem>
											<RadioGroupItem value="3">
												<RadioGroupIndicator />
												<span>3x na semana</span>
												<span>🙂</span>
											</RadioGroupItem>
											<RadioGroupItem value="4">
												<RadioGroupIndicator />
												<span>4x na semana</span>
												<span>😊</span>
											</RadioGroupItem>
											<RadioGroupItem value="5">
												<RadioGroupIndicator />
												<span>5x na semana</span>
												<span>😁</span>
											</RadioGroupItem>
											<RadioGroupItem value="6">
												<RadioGroupIndicator />
												<span>6x na semana</span>
												<span>🔥</span>
											</RadioGroupItem>
											<RadioGroupItem value="7">
												<RadioGroupIndicator />
												<span>Meta diária</span>
												<span>💪</span>
											</RadioGroupItem>
										</RadioGroup>
									);
								}}
							/>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<Button className="flex-1">Salvar</Button>

						<DialogClose asChild>
							<Button className="flex-1" variant="secondary">
								Fechar
							</Button>
						</DialogClose>
					</div>
				</form>
			</div>
		</DialogContent>
	);
}
