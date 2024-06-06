"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";

export default function SignInForm() {
    const [infringement_id, setInfringementId] = useState("");
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");

    const router = useRouter();

    const sendInfringementId = async (e) => {
        e.preventDefault();
                router.push(`/infringement/${infringement_id}`);
    };

    return (
        <>
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Espace contravention
                            </h1>
                            <form onSubmit={sendInfringementId} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="infringement_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Saisissez votre numéro de contravention au format suivant</label>
                                    <input
                                        type="text"
                                        name="infringement_id"
                                        id="infringement_id"
                                        placeholder="KW2024_22_78"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        value={infringement_id}
                                        onChange={(e) => setInfringementId(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Suivant</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
