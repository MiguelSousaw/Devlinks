import { Header } from "../../components/header"
import { Input } from "../../components/enter"
import { useState, type FormEvent, useEffect } from "react"
import { Button } from "../../components/button"
import {BiLink} from "react-icons/bi"
import {BiTrash} from "react-icons/bi"
import {db} from "../../services/firebase"
import {addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore'

export interface ListaDataProps{
    id: string,
    name: string,
    url: string,
    bg: string,
    color: string
}

export function Admin(){
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textcolor, setTextcolor] = useState("#f1f1f1")
    const [backgroundLink, setBackgroundLink] = useState("#000")
   
    const [links, setLinks] = useState<ListaDataProps[]>([])
    
    useEffect(()=>{
        const linksref = collection(db, 'links')
        const queryref = query(linksref, orderBy('created', "asc"))

        const onsub = onSnapshot(queryref, (snapshot)=>{
            let lista = [] as ListaDataProps[];
            snapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(lista)
        })

        return () => {
            onsub()
        } //Essa função serve unicamente para limpar olheiros
    }, [])

    function handleLink(e: FormEvent){
        e.preventDefault()
        if(nameInput === "" || urlInput === ""){
            alert("preencha todos os campos")
            return
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundLink,
            color: textcolor,
            created: new Date()
        })
        .then(()=>{
            console.log("cadastrado com sucesso")
            setNameInput("")
            setUrlInput("")
        })
        .catch((error)=>{
            console.log("Erro ao cadastrar banco" + error)
        })
    }

    async function deleteLink(id: string){
        const docRef = doc(db, 'links', id)
        await deleteDoc(docRef)
    }

    return(
        <div className="flex flex-col items-center min-h-screen pb-7 px-2">
            <Header/>

            <form onSubmit={handleLink} className="flex flex-col w-full max-w-xl mt-8 mb-3 ">
                <label className="text-white font-medium mt-2 mb-2">Nome do Link:</label>
                <Input type="text" placeholder="Digite o nome do Link..."
                value={nameInput}
                onChange={(e)=> setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">URL do Link:</label>
                <Input type="url" placeholder="Digite a URL..."
                value={urlInput}
                onChange={(e)=> setUrlInput(e.target.value)}
                />

                <section className="flex mt-8 justify-between">
                    <div className="flex gap-4">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do Link:</label>
                        <Input type="color" value={backgroundLink}
                        onChange={(e)=> setBackgroundLink(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4">
                        <label className="text-white font-medium mb-2 mt-2">Cor do Link:</label>
                        <Input type="color" value={textcolor} onChange={(e)=> setTextcolor(e.target.value)}/>
                    </div>
                </section>

                {nameInput !== "" && (
                    <div className="flex flex-col justify-start items-center mb-7 p-1 border-gray-100/25 border rounded-md">
                    <label className="text-white font-medium mt-2 mb-2">Preview Link:</label>
                    <article className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px1 py-3" style={{marginBottom: 8, marginTop: 8, backgroundColor: backgroundLink}
                    }>
                        <p className="text-white font-medium"
                        style={{color: textcolor}}>
                            {nameInput}
                        </p>
                    </article>
                </div>
                )}
                
                <Button type="submit">Cadastrar<BiLink size={20} color="white"/></Button>
            </form>

            <h2 className="font-bold text-white text-2xl mb-4">
                Meus Links
            </h2>

            {links && (
                links.map((item) => (
                <article className="flex items-center justify-between w-11/12
                max-w-xl rounded py-3 px-2 mb-2 select-none" style={{backgroundColor: item.bg, color: item.color}} key={item.id}>
                <p><a href={item.url} target="_blank" rel="noopener noreferrer" className="font-medium">{item.name}</a></p>
                <div>
                    <button onClick={()=> deleteLink(item.id)} className="border border-dashed p-1 rounded cursor-pointer">
                        <BiTrash size={18} color="white"/>
                    </button>
                </div>
                </article>
            ))
            )}            
        </div>
    )
}