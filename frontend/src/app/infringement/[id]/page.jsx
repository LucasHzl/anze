"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Cookies from 'js-cookie';
import Link from 'next/link';

const InfringementPage = ({ params }) => {
    const infringement_id = params.id;
    let [infringementData, setInfringementData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


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
                    setInfringementData(data);
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

    console.log('infringementData:', infringementData);

    if (loading) {
        return <p>Chargement ...</p>;
    }

    if (error) {
        return <p>Erreur : {error}</p>;
    }

    infringementData = infringementData["hydra:member"][0]

    return (
        <>
            <Navbar />
            <main className='flex justify-center items-center w-screen h-screen -mt-16'>
                {infringementData && (
                    <div>
                        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-8 p-8">
                                <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Infraction n° {infringementData.infringement_id}</h2>
                                <hr className="mt-4 mb-8" />
                                <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Motif : {infringementData.title}</h3>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg"><p>Détail : {infringementData.description}</p></p>
                            <h4 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">À régler : {infringementData.amount}€</h4>
                            <button class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Payer</button>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default InfringementPage;
