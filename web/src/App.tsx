import logo from "./assets/logo-in-orbit.svg"
import rocketGirl from "./assets/rocket-girl.svg"
import { Plus } from "lucide-react"

export function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit logo"/>
      <img src={rocketGirl} alt="rocketGirl"/>
      <p className="text-gray-300 leading-relaxed max-w-80 text-center">
      Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora mesmo?
      </p>

      <button type="button" className="px-4 py-2.5 rounded-lg bg-indigo-500 text-indigo-50 flex items-center gap-2 text-sm font-medium tracking-tight
      hover:bg-indigo-900">
        <Plus className="size-4"/>
        Cadastrar Meta
      </button>

    </div>  
  )
}

export default App
