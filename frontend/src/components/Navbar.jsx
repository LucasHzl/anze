import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="flex justify-center items-center space-x-96 gap-96 pl-12 pr-12 pt-4 pb-4 bg-blue-200 w-screen h-20">
            <Link href={"/"}>
                <h1 className="text-xl font-normal">ANZE</h1>
                <h2 className="text-sm font-normal">Agence Nationale des Zinzins de l'Espace</h2>
            </Link>
            <div className="flex gap-6 font-normal text-md">
                <Link href={"/signin"}>Connexion</Link>
                <Link href={"/signup"}>Inscription</Link>
            </div>
        </nav>
    )
}