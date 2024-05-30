import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="flex flex-col justify-center items-center md:flex-row md:justify-between md:pl-12 md:pr-12 md:pt-4 md:pb-4 bg-blue-200 w-screen h-20">
            <div className="md:mr-auto">
                <Link href={"/"}>
                    <h1 className="text-2xl font-normal">ANZE</h1>
                </Link>
                <Link href={"/"}>
                    <h2 className="text-sm font-normal">Agence Nationale des Zinzins de l'Espace</h2>
                </Link>
            </div>
            <div className="flex gap-6 font-normal text-md">
                <Link href={"/signin"}>Connexion</Link>
                <Link href={"/signup"}>Inscription</Link>
            </div>
        </nav>
    )
}
