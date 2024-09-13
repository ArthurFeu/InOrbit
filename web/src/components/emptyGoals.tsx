import logo from "../assets/logo-in-orbit.svg";
import rocketGirl from "../assets/rocket-girl.svg";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { DialogTrigger } from "../components/ui/dialog";

export function EmptyGoals() {
	return (
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
	);
}
