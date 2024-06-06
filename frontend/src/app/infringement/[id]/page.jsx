"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Cookies from 'js-cookie';

const InfringementPage = ({params}) => {
    const infringement_id = params.id;
    const [infringementData, setInfringementData] = useState(null);

    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log("bonjour" +params.id);

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
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Erreur : {error}</p>;
    }

    return (
        <>
            <Navbar />
            <div>
                {infringementData && (
                    <div>
                        <p>{infringementData.title}</p>
                        <p>{infringementData.description}</p>
                        <p>{infringementData.infringement_id}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default InfringementPage;
