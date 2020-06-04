import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// import { Container } from './styles';

function Header() {
    const { pathname } = useRouter()
    console.log(pathname)
    return (
        <div className="p-2 bg-gray-300 flex justify-between items-center">
            <Link href="/">
                <div className="flex align-middle items-center cursor-pointer">
                    <img className="ml-4" width={50} src="https://i.pinimg.com/originals/b1/5e/ed/b15eedbdafbbdbca3249e3942f4faf3b.png" alt="github logo" />
                    <h1 className="text-xl ml-4">Github Profile Search</h1>
                </div>
            </Link>
            {
                pathname === '/profile' && <div className="text-xl mr-4">Perfil Privado</div>
            }
        </div>
    )
}

export default Header
