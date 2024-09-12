import logo from "./assets/logo-in-orbit.svg";
import rocketGirl from "./assets/rocket-girl.svg";
import { Plus, X } from "lucide-react";
import { Button } from "./components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "./components/ui/dialog";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import {
	RadioGroup,
	RadioGroupIndicator,
	RadioGroupItem,
} from "./components/ui/radio-group";

export function App() {
	return (
		<Dialog>
			<div className="h-screen flex flex-col items-center justify-center gap-8">
				<img src={logo} alt="in.orbit logo" />
				<img src={rocketGirl} alt="rocketGirl" />
				<p className="text-gray-300 leading-relaxed max-w-80 text-center">
					Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
					mesmo?
				</p>

				<DialogTrigger asChild>
					<Button>
						<Plus />
						Cadastrar Meta
					</Button>
				</DialogTrigger>
			</div>

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

					<form action="" className="flex-1 flex flex-col justify-between">
						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								<Label htmlFor="title">Qual a atividade?</Label>
								<Input
									id="title"
									placeholder="Praticar exercícios, meditar, etc..."
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label htmlFor="title">Quantas vezes na semana?</Label>
								<RadioGroup>
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
										<span>7x na semana</span>
										<span>💪</span>
									</RadioGroupItem>
								</RadioGroup>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<DialogClose asChild>
								<Button className="flex-1">Salvar</Button>
							</DialogClose>

							<Button className="flex-1" variant="secondary">
								Fechar
							</Button>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default App;
