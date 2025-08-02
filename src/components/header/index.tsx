import {BiLogOut} from 'react-icons/bi'
import {Link} from 'react-router-dom'

import { auth } from "../../services/firebase"
import { signOut } from 'firebase/auth' 

export function Header(){

    async function handleLogout(){
        await signOut(auth)
    }

    return(
        <header className="w-full max-w-2xl mt-4 px-1">
            <nav className="bg-white w-full flex h-12 items-center justify-between rounded-md px-3">
                <div className="flex justify-around w-[60%]">
                    <Link to="/">Home</Link>
                    <Link to="/Admin">Admin</Link>
                    <Link to="/Admin/Acesso">Redes Sociais</Link>
                </div>

                <button onClick={handleLogout} className="cursor-pointer">
                    <BiLogOut size={28} color='red'/>
                </button>
            </nav>
        </header>
    )
        
}