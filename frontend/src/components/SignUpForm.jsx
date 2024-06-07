"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { requestAsyncStorage } from "next/dist/client/components/request-async-storage-instance";

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [phone, setPhone] = useState("");
    const [adress, setAdress] = useState("");
    const [card_number, setCardNumber] = useState("");
    const [cryptogram, setCryptogram] = useState("");
    const [expiration_date, setExpirationDate] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [apiError, setApiError] = useState("");

    const [apiSuccess, setApiSuccess] = useState("");

    const router = useRouter();

    const signUpSubmit = async (e) => {
        e.preventDefault();

        console.log("Form submitted");

        let roles = ["ROLE_USER"]

        try {
            const bodyData = {
                roles,
                email,
                password,
                first_name,
                last_name,
                birthdate,
                phone,
                adress,
                card_number,
                cryptogram,
                expiration_date,
            };

            console.log("Request body :", bodyData);

            const response = await fetch("http://127.0.0.1:8000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/ld+json",
                },
                body: JSON.stringify(bodyData),
            });

            console.log("Response status :", response.status);

        } finally {
            router.push("/signin");
        }
    };

    return (
            <div className="flex flex-col items-center h-screen justify-center  px-6 py-8 mx-auto md:h-screen border-2 lg:py-0 -mt-8">
                <div className="w-full bg-white rounded-lg h-full border-2 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 h-full border-2 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Création de compte ANZE
                        </h1>
                        <form onSubmit={signUpSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
                                <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sarah" required value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                                <input type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Courci" required value={last_name} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@exemple.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Téléphone</label>
                                <input type="phone" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0601020304" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date de naissance</label>
                                <input type="date" name="birthdate" id="birthdate" placeholder="07/06/1999" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="adress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse</label>
                                <input type="text" name="adress" id="adress" placeholder="3 Rue des Potiers, 44600 Nantes" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={adress} onChange={(e) => setAdress(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numéro de carte bancaire</label>
                                <input type="text" name="cardNumber" id="cardNumber" placeholder="8726 xxxx xxxx xxxx" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={card_number} onChange={(e) => setCardNumber(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="cryptogram" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cryptogramme</label>
                                <input type="text" name="cryptogram" id="cryptogram" placeholder="123" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={cryptogram} onChange={(e) => setCryptogram(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="expirationDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date d'expiration</label>
                                <input type="date" name="expirationDate" id="expirationDate" placeholder="2023-07" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={expiration_date} onChange={(e) => setExpirationDate(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Créer un compte</button>
                            {apiError && <div className="text-red-600">{apiError}</div>}
                            {apiSuccess && <div className="text-green-600">{apiSuccess}</div>}
                        </form>
                    </div>
                </div>
            </div>
    );
}
