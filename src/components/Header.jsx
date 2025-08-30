import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({darkMode, setDarkMode}) => {
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate
    return (
        <div className = "fixed top-5 left-5 px-4 right-5 h-[70px] dark:bg-zinc-800 bg-zinc-200 rounded-xl shadow-[0_2px_3px_1px_rgba(0,0,0,0.3)] flex justify-between">
            <div className = "flex max-sm:hidden">
                <button onClick = {() => {window.open('https://linkedin.com/in/aditshrm', '_blank')}} className = "flex items-center justify-center px-4 font-bold hover:scale-[90%] hover:bg-neutral-950/10 hover:rounded-xl">LinkedIn</button>
                <button onClick = {() => {window.open('https://github.com/officialaditshrm', '_blank')}} className = "flex items-center justify-center px-4 font-bold hover:scale-[90%] hover:bg-neutral-950/10 hover:rounded-xl">GitHub</button>
                <button onClick = {() => {window.open('https://aditya-sharma-webportfolio.vercel.app', '_blank')}} className = "flex items-center justify-center px-4 font-bold hover:scale-[90%] hover:bg-neutral-950/10 hover:rounded-xl">Portfolio</button>
            </div>
            <button 
            onClick = {() => setToggle(!toggle)}
            className = "relative sm:hidden flex flex-col justify-evenly items-center">
                <div className = {`h-[6px] ${toggle && "hidden"} rounded-full w-[50px] bg-zinc-700 dark:bg-zinc-300`}></div>
                <div className = {`h-[6px] ${toggle && "-rotate-45"} rounded-full w-[50px] bg-zinc-700 dark:bg-zinc-300`}></div>
                <div className = {`absolute ${toggle && "rotate-45"} h-[6px] rounded-full w-[50px] bg-zinc-700 dark:bg-zinc-300`}></div>
                <div className = {`h-[6px] ${toggle && "hidden"} rounded-full w-[50px] bg-zinc-700 dark:bg-zinc-300`}></div>
            </button>
            <button
            onClick = {() => {setDarkMode(!darkMode)}} //Toggle Dark Mode
            className = "relative w-[120px] flex items-center">
                <div className = "absolute w-full rounded bg-zinc-400 shadow z-40 h-[10px]"></div>
                <div className = {`h-[50px] text-[12px] font-bold text-black bg-zinc-300 w-[50px] rounded-full z-50 shadow-[0_0_3px_1px_rgba(0,0,0,0.3)] ml-[5px] dark:translate-x-[60px] flex items-center justify-center`}>
                    {!darkMode ? 
                    <span className="material-symbols-outlined">
                        sunny
                    </span>
                    :
                    <span className="material-symbols-outlined">
                        bedtime
                    </span>
                    }
                </div>
            </button>
            {toggle && 
            <nav className = "flex flex-col fixed top-[100px] left-[20px] shadow-[0_2px_3px_1px_rgba(0,0,0,0.3)] gap-4 rounded-xl bg-zinc-200 dark:bg-zinc-800 p-4">
                <button onClick = {() => {window.open('https://linkedin.com/in/aditshrm', '_blank')}} className = "flex items-center justify-center px-4 font-bold hover:scale-[90%] hover:bg-neutral-950/10 hover:rounded-xl">LinkedIn</button>
                <button onClick = {() => {window.open('https://github.com/officialaditshrm', '_blank')}} className = "flex items-center justify-center px-4 font-bold hover:scale-[90%] hover:bg-neutral-950/10 hover:rounded-xl">GitHub</button>
                <button onClick = {() => {window.open('https://aditya-sharma-webportfolio.vercel.app', '_blank')}} className = "flex items-center justify-center px-4 font-bold hover:scale-[90%] hover:bg-neutral-950/10 hover:rounded-xl">Portfolio</button>
            </nav>
            }
        </div>
    )
}

export default Header;