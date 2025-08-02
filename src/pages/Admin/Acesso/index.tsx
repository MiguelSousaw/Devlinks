import { Input } from "../../../components/enter";
import { Header } from "../../../components/header";
import {useState, type FormEvent, useEffect} from "react"
import {
    setDoc,
    getDoc,
    doc
} from 'firebase/firestore'
import {db} from "../../../services/firebase"

export function Networks(){
    const [youtube, setYoutube] = useState("")
    const [instagram, setInstagram] = useState("")
    const [github, setGithub] = useState("")

    useEffect(()=>{
        function loadLinks(){
            const docRef = doc(db, 'social', 'link')
            getDoc(docRef)
            .then((snapshot)=>{
                if(snapshot.data() !== undefined){
                    setYoutube(snapshot.data()?.youtubeurl)
                    setInstagram(snapshot.data()?.instagramurl)
                    setGithub(snapshot.data()?.githuburl)
                }
                
            })
        }

        loadLinks()
    }, [])

    function handleRegister(e: FormEvent){
        e.preventDefault()
        if(youtube === "" || instagram === "" || github === ""){
            alert("preencha todos os campos")
            return
        }

        setDoc(doc(db, "social", 'link'), {
            youtubeurl: youtube,
            instagramurl: instagram,
            githuburl: github,
        }) //Ao invés de cadastrar algo novo, você só atualiza os dados já existentes usando o setDoc
        .then(()=>{
            console.log("cadastrado com sucesso")
        })
        .catch((error)=>{
            console.log("Erro ao cadastrar" + error)
        })
    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais</h1>

            <form className="flex flex-col max-w-xl w-full px-4" onSubmit={handleRegister}>
                <label className="text-left text-white font-medium mt-2 mb-2">Link do YouTube:</label>
                <Input type="url" placeholder="link do youtube"
                value={youtube}
                onChange={(e)=>setYoutube(e.target.value)}
                />

                <label className="text-left text-white font-medium mt-2 mb-2">Link do Instagram:</label>
                <Input type="url" placeholder="link do instagram"
                value={instagram}
                onChange={(e)=>setInstagram(e.target.value)}
                />

                <label className="text-left text-white font-medium mt-2 mb-2">Link do Github:</label>
                <Input type="url" placeholder="link do github"
                value={github}
                onChange={(e)=>setGithub(e.target.value)}
                />

                <button type="submit" className="text-white font-medium bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7">
                    Salvar links
                </button>
            </form>
        </div>
    )
}