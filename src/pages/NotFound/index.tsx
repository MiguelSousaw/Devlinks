import {Link} from 'react-router-dom'

export function Error(){
    return(
        <div className="flex w-full justify-center items-center flex-col text-white min-h-screen ">
            <h1 className="font-bold text-6xl mb-2">404</h1>
            <h1 className="font-bold text-4xl mb-4">Página não encontrada</h1>
            <p className="italic text-1xl mb-4">Você caiu numa página que não existe</p>

            <Link to="/" className="bg-blue-500 p-1 rounded font-medium mt-2 mb-2 
            transition-transform duration-300 hover:scale-110 ease-in-out">
                Voltar a Home
            </Link>
        </div>
    )
}