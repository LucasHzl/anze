"use client"

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Cookies from 'js-cookie';
import DecodeJwtTokenPayload from '../../../../utils/jwtDecoder';
import { useRouter } from 'next/navigation';

const InfringementPage = ({ params }) => {
    const infringement_id = params.id;
    const [infringementData, setInfringementData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiError, setApiError] = useState("");
    const [apiSuccess, setApiSuccess] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (infringement_id) {
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
                    setInfringementData(data["hydra:member"][0]);
                } catch (error) {
                    console.error('Error fetching infringement data:', error);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchInfringementData();
        } else {
            console.log('infringement_id is null');
            setLoading(false);
        }
    }, [infringement_id]);

    const assignUserToInfringement = async (e) => {
        e.preventDefault();
        setLoading(true);
        setApiError("");
        setApiSuccess("");

        try {
            const decodedToken = await DecodeJwtTokenPayload(Cookies.get('token'));
            console.log(decodedToken);

            const bodyData = {
                title: infringementData.title,
                description: infringementData.description,
                amount: infringementData.amount,
                infringement_id: infringementData.infringement_id,
                user: `api/users/43`,
                infringementId: `${infringementData.infringement_id}`
            };

            console.log("Request body : ", bodyData);

            const response = await fetch(`http://127.0.0.1:8000/api/infringements/${infringementData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/merge-patch+json",
                    "Authorization": "Bearer " + Cookies.get('token')
                },
                body: JSON.stringify(bodyData),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                throw new Error(`Erreur http, status : ${response.status}`);
            }

            setApiSuccess("Payement soumis");
        } catch (error) {
            setApiError(error.message);
        } finally {
            setLoading(false);
            // router.push("/profile");
        }
    };

    if (loading) {
        return <p>Chargement ...</p>;
    }

    if (error) {
        return <p>Erreur : {error}</p>;
    }

    return (
        <>
            <Navbar />
            <main className='flex justify-center items-center w-screen h-screen -mt-16'>
                {infringementData && (
                    <div>
                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-8 p-8">
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Infraction n° {infringementData.infringement_id}</h2>
                            <hr className="mt-4 mb-8" />
                            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Motif : {infringementData.title}</h3>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg">Détail : {infringementData.description}</p>
                            <h4 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">À régler : {infringementData.amount}€</h4>
                            <button onClick={assignUserToInfringement} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Payer</button>
                        </div>
                    </div>
                )}
                {apiError && <p className="text-red-500">{apiError}</p>}
                {apiSuccess && <p className="text-green-500">{apiSuccess}</p>}
            </main>
        </>
    );
};

export default InfringementPage;
