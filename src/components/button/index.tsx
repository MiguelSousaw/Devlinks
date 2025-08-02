import type {ReactNode} from 'react'

interface ButtonProps{
    type?: "submit" | "reset" | "button",
    children: ReactNode
}

export function Button({type, children}: ButtonProps){
    return(
        <button type={type} className="w-full bg-blue-500 p-1 mb-2 text-white font-medium text-1xl cursor-pointer flex items-center justify-center">
            {children}
        </button>
    )
}