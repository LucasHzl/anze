import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-blue-200 w-full p-4 flex flex-col items-center md:flex-row md:justify-between">
            <div className="flex flex-col items-center md:items-start">
                <Link href={"/"}>
                    <div className="text-2xl font-semibold cursor-pointer">ANZE</div>
                </Link>
                <Link href={"/"}>
                    <div className="text-sm font-medium cursor-pointer">Agence Nationale des Zinzins de l'Espace</div>
                </Link>
            </div>
            <div className="flex flex-col md:flex-row md:gap-8 items-center md:items-center">
                <div className="flex flex-col md:flex-row md:gap-8 items-center">
                    <Link href={"/infringement"}>
                        <div className="font-medium hover:text-blue-600 transition cursor-pointer">Contravention</div>
                    </Link>
                    <Link href={"/profile"}>
                        <div className="font-medium hover:text-blue-600 transition cursor-pointer mt-2 md:mt-0">Mon compte</div>
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row md:gap-8 items-center mt-2 md:mt-0">
                    <Link href={"/signin"}>
                        <div className="font-medium hover:text-blue-600 transition cursor-pointer">Connexion</div>
                    </Link>
                    <Link href={"/signup"}>
                        <div className="font-medium hover:text-blue-600 transition cursor-pointer mt-2 md:mt-0">Inscription</div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
