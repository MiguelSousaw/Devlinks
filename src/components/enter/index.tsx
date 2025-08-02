import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps){
    return(
        <input className="p-[4px] mb-3 border-0 bg-white
        cursor-pointer outline-none rounded-md " {...props}/>
    )
}