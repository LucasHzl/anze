"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";

export default function SignInForm() {
    const [infringement_id, setInfringementId] = useState("");
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const validateInfringementId = (id) => {
        const currentYear = new Date().getFullYear();
        const regex = new RegExp(`^[A-Z]{2}${currentYear}_[0-9]{1,2}_[0-9]{1,2}$`);
        if (!regex.test(id)) {
            return "Le format du numéro de contravention est incorrect.";
        }
        const [letters, year, firstNumber, secondNumber] = id.match(/([A-Z]{2})(\d{4})_(\d+)_(\d+)/).slice(1);
        if (letters[0] >= letters[1]) {
            return "La première lettre doit être avant la seconde dans l'alphabet.";
        }
        if (parseInt(firstNumber) + parseInt(secondNumber) !== 100) {
            return "La somme des deux chiffres doit être égale à 100.";
        }
        return null;
    };

    const fetchInfringementData = async () => {
        try {
            console.log(`Fetching data for infringement_id: ${infringement_id}`);
            const response = await fetch(`http://127.0.0.1:8000/api/infringements/?page=1&infringement_id=${infringement_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/ld+json",
                    "Authorization": "Bearer " + Cookies.get('token')
                }
            });

            console.log(`Response status: ${response.status}`);

            if (!response.ok) {
                throw new Error('Failed to fetch infringement data');
            }

            const data = await response.json();
            console.log('Fetched data:', data);
            return data["hydra:member"].length > 0;
        } catch (error) {
            console.error('Error fetching infringement data:', error);
            throw new Error('Erreur lors de la récupération des données de contravention.');
        }
    };

    const sendInfringementId = async (e) => {
        e.preventDefault();
        setApiError("");
        setApiSuccess("");
        setLoading(true);

        const validationError = validateInfringementId(infringement_id);
        if (validationError) {
            setApiError(validationError);
            setLoading(false);
            return;
        }

        try {
            const existsInDatabase = await fetchInfringementData();
            if (!existsInDatabase) {
                setApiError("Le numéro de contravention n'existe pas dans notre base de données.");
                setLoading(false);
                return;
            }

            setApiSuccess("Numéro de contravention validé avec succès !");
            router.push(`/infringement/${infringement_id}`);
        } catch (error) {
            setApiError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Espace contravention
                            </h1>
                            <form onSubmit={sendInfringementId} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="infringement_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Saisissez votre numéro de contravention au format suivant
                                    </label>
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
                                {apiError && (
                                    <div className="text-red-500 text-sm">
                                        {apiError}
                                    </div>
                                )}
                                {apiSuccess && (
                                    <div className="text-green-500 text-sm">
                                        {apiSuccess}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    disabled={loading}
                                >
                                    {loading ? 'Chargement...' : 'Suivant'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
