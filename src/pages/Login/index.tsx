import { Link } from "react-router-dom"
import { Input } from "../../components/enter"
import { Button } from "../../components/button"
import { useState, type FormEvent } from "react"
import {auth} from '../../services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom"

export function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e:FormEvent){
        e.preventDefault()

        if (email === '' || senha === ""){
            alert('preencha todos os campos')
            return
        }

        signInWithEmailAndPassword(auth, email, senha) //Essa requisição irá analisar se o meu email e e senha estão dentro da minha autenticação, se esses dados já foram cadastrados antes
        .then(()=>{
            console.log("Logado com sucesso")
            navigate('/Admin', {replace: true}) //Não permite que exista função de "voltar" pois a rota anterior foi removida do historico de navegação, para isso que serve o replace
        })
        .catch(error => {
            console.log("erro ao fazer o login: ", error)
        })

        setEmail("")
        setSenha("")
    }

    return(
        <div className="flex w-full h-screen items-center flex-col justify-center" flex-col>
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev<span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span></h1>
            </Link>

           <form onSubmit={handleSubmit} className="w-[60%] max-w-xl flex flex-col px-2">
                <Input type="text" placeholder="Digite seu email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />

                <Input type="password" placeholder="*****" 
                value={senha}
                onChange={(e)=> setSenha(e.target.value)}
                />
                <Button type="submit">Acessar</Button>
           </form>
        </div>
    )
}