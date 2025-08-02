import {Social} from '../../components/social'
import { FaGithub, FaInstagram, FaYoutube} from 'react-icons/fa'
import {useState, useEffect} from "react"
import {
    collection,
    query,
    orderBy,
    getDocs,
    doc,
    getDoc
} from 'firebase/firestore'
import {db} from "../../services/firebase"
import { type ListaDataProps } from '../Admin'
import { Link } from 'react-router-dom'

interface Socialprops{
    youtube: string,
    instagram: string,
    github: string
}

export function Home(){
    const [links, setLinks] = useState<ListaDataProps[]>([])
    const [socialLinks, setSocialLinks] = useState<Socialprops>()

    useEffect(()=>{
        function loadsocialLinks(){
            const docRef = doc(db, 'social', 'link')
        getDoc(docRef)
        .then((snapshot)=>{
            if (snapshot.data() !== undefined){
                setSocialLinks({
                    youtube: snapshot.data()?.youtubeurl,
                    instagram: snapshot.data()?.instagramurl,
                    github: snapshot.data()?.githuburl
                })
            }
        })
        }

        loadsocialLinks()
    }, [])

    useEffect(()=>{
       function loadLinks(){
        const linksref = collection(db, 'links')
        const queryref = query(linksref, orderBy('created', "asc"))
    
        getDocs(queryref)
        .then((snapshot)=>{
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
       }

       loadLinks()
    }, [])

    return(
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">DevLink</h1>
            <span className="text-gray-50 mb-5 mt-3">meus links 👇</span>

            <main className="flex flex-col text-center w-11/12 max-w-xl">
                {links.map((item)=>(
                    <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 ease-in-out duration-500 cursor-pointer" style={{backgroundColor: item.bg, color: item.color}}>
                    <a href={item.url} target='_blank' rel='noopener noreferrer'>
                        <p className="text-base md:text-lg font-medium">{item.name}</p>
                    </a>
                </section>
                ))}
                <button className="bg-blue-500 p-1 w-[30%] m-auto rounded-md text-white font-medium cursor-pointer" ><Link to="/Login">Login</Link></button>
                
                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">
                    <Social url={socialLinks?.instagram ?? ""}>
                        <FaInstagram size={35} color='white'/>
                    </Social>

                    <Social url={socialLinks?.youtube ?? ""}>
                        <FaYoutube size={35} color='white'/>
                    </Social>

                    <Social url={socialLinks?.github ?? ""}>
                        <FaGithub size={35} color='white'/>
                    </Social>
                </footer>
                )}
            </main>
        </div>
    )
}