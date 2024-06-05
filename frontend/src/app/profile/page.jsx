"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Profile() {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const editSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    let roles = ["ROLE_USER"];

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

      console.log("Request body : ", bodyData);

      const response = await fetch("http://127.0.0.1:8000/api/users/33", {
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

      setApiSuccess("Profil mis à jour avec succès");
    } catch (error) {
      setApiError(error.message);
    } finally {
      // router.push("/signin");
    }
  };

  const getUser = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/users/33", {
      method: "GET",
      headers: {
        "Content-Type": "application/ld+json",
        "Authorization": "Bearer " + Cookies.get('token')
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ! status: ${response.status}`);
    }

    const bodyData = await response.json();
    return bodyData;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getUser();
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setBirthdate(data.birthdate);
        setPhone(data.phone);
        setAdress(data.adress);
        setCardNumber(data.card_number);
        setCryptogram(data.cryptogram);
        setExpirationDate(data.expiration_date);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <main className="">
        <Navbar />
        <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto mt-10 mb-8 ">
          <h1 className="border-b py-6 text-4xl font-semibold">Profil</h1>
          <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
            <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
              <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">Informations personnelles</h1>
                <p className="font- text-slate-600">
                  Retrouvez ici toutes vos informations, avec la possibilité de
                  les modifier
                </p>
              </div>
              <hr className="mt-4 mb-8" />
              <p className="py-2 text-xl font-semibold">Identifiants de connexion</p>
              <hr className="mt-4 mb-8" />
              <form onSubmit={editSubmit} action="#">
                <div className="grid gap-y-6 gap-x-3 sm:grid-cols-2 lg:px-8 mb-8">
                  <label className="block" htmlFor="email">
                    <p className="text-sm">Email</p>
                    <input
                      className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                      type="text"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label className="block" htmlFor="password">
                    <p className="text-sm">Mot de passe</p>
                    <input
                      className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                      type="password"
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                </div>
                <p className="py-2 text-xl font-semibold">Identité et localisation</p>
                <hr className="mt-4 mb-8" />
                <div className="grid gap-y-6 gap-x-3 sm:grid-cols-2 lg:px-8 mb-8">
                  <label className="block" htmlFor="last_name">
                    <p className="text-sm">Nom</p>
                    <input
                      className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                      type="text"
                      defaultValue={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <label className="block" htmlFor="first_name">
                    <p className="text-sm">Prénom</p>
                    <input
                      className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                      type="text"
                      defaultValue={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                  <label className="block" htmlFor="birthdate">
                    <p className="text-sm">Date de naissance</p>
                    <input
                      className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                      type="text"
                      defaultValue={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                    />
                  </label>
                  <label className="block" htmlFor="phone">
                    <p className="text-sm">Téléphone</p>
                    <input
                      className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                      type="text"
                      defaultValue={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </label>
                  <label className="block sm:col-span-2" htmlFor="adress">
                    <p className="text-sm">Adresse</p>
                    <input
                      className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                      type="text"
                      defaultValue={adress}
                      onChange={(e) => setAdress(e.target.value)}
                    />
                  </label>
                </div>
                <p className="py-2 text-xl font-semibold">Moyen de paiement</p>
                <hr className="mt-4 mb-8" />
                <div className="grid gap-y-6 gap-x-3 sm:grid-cols-2 lg:px-8 mb-8">
                  <label className="block" htmlFor="card_number">
                    <p className="text-sm">Numéro de carte bancaire</p>
                    <input
                      className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                      type="text"
                      defaultValue={card_number}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </label>
                  <label className="block" htmlFor="expiration_date">
                    <p className="text-sm">Date d'expiration</p>
                    <input
                      className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                      type="text"
                      defaultValue={expiration_date}
                      onChange={(e) => setExpirationDate(e.target.value)}
                    />
                  </label>
                  <label className="block" htmlFor="cryptogram">
                    <p className="text-sm">Cryptogramme</p>
                    <input
                      className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                      type="text"
                      defaultValue={cryptogram}
                      onChange={(e) => setCryptogram(e.target.value)}
                    />
                  </label>
                </div>
                <div className="my-8">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-blue-700 py-3 text-center text-white shadow"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
              {apiSuccess && <p className="text-green-500">{apiSuccess}</p>}
              {apiError && <p className="text-red-500">{apiError}</p>}
            </div>
            <div className="hidden col-span-2 lg:block"></div>
          </div>
        </div>




        <div className="mx-4 max-w-screen-xl sm:mx-8 xl:mx-auto">
          <h1 className="border-b py-6 text-4xl font-semibold">Paiements</h1>
          <div className="grid grid-cols-8 pt-3 pb-10 sm:grid-cols-10">
            <div className="col-span-8 rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
              <div className="mx-auto mb-10 overflow-hidden rounded-lg border bg-white mt-8 p-1">
                <p className="mb-6 bg-gray-100 py-1 text-center text-lg font-medium">
                  Historique des paiements
                </p>
                <table className="w-full">
                  <thead>
                    <tr>
                      <td className="text-center font-semibold">N° de contravention</td>
                      <td className="text-center font-semibold">Intitulé</td>
                      <td className="text-center font-semibold">Description</td>
                      <td className="text-center font-semibold">Montant réglé</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b py-2 text-center text-sm">KW2024_22_78</td>
                      <td className="border-b py-2 text-center text-sm">Drifts excessifs sur la route lunaire</td>
                      <td className="border-b py-2 text-center text-sm">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Dolores in cumque facere sapiente id sit blanditiis officia
                        totam quod, soluta praesentium ratione aliquam excepturi
                        obcaecati sequi unde accusamus, quam vero?
                      </td>
                      <td className="border-b py-2 text-center text-sm">$99.00</td>
                    </tr>
                    <tr>
                      <td className="border-b py-2 text-center text-sm">KW2024_22_78</td>
                      <td className="border-b py-2 text-center text-sm">Drifts excessifs sur la route lunaire</td>
                      <td className="border-b py-2 text-center text-sm">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Dolores in cumque facere sapiente id sit blanditiis officia
                        totam quod, soluta praesentium ratione aliquam excepturi
                        obcaecati sequi unde accusamus, quam vero?
                      </td>
                      <td className="border-b py-2 text-center text-sm">$99.00</td>
                    </tr>
                    <tr>
                      <td className="border-b py-2 text-center text-sm">KW2024_22_78</td>
                      <td className="border-b py-2 text-center text-sm">Drifts excessifs sur la route lunaire</td>
                      <td className="border-b py-2 text-center text-sm">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Dolores in cumque facere sapiente id sit blanditiis officia
                        totam quod, soluta praesentium ratione aliquam excepturi
                        obcaecati sequi unde accusamus, quam vero?
                      </td>
                      <td className="border-b py-2 text-center text-sm">$99.00</td>
                    </tr>
                    <tr>
                      <td className="border-b py-2 text-center text-sm">KW2024_22_78</td>
                      <td className="border-b py-2 text-center text-sm">Drifts excessifs sur la route lunaire</td>
                      <td className="border-b py-2 text-center text-sm">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Dolores in cumque facere sapiente id sit blanditiis officia
                        totam quod, soluta praesentium ratione aliquam excepturi
                        obcaecati sequi unde accusamus, quam vero?
                      </td>
                      <td className="border-b py-2 text-center text-sm">$99.00</td>
                    </tr>
                    <tr>
                      <td className="border-b py-2 text-center text-sm">KW2024_22_78</td>
                      <td className="border-b py-2 text-center text-sm">Drifts excessifs sur la route lunaire</td>
                      <td className="border-b py-2 text-center text-sm">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Dolores in cumque facere sapiente id sit blanditiis officia
                        totam quod, soluta praesentium ratione aliquam excepturi
                        obcaecati sequi unde accusamus, quam vero?
                      </td>
                      <td className="border-b py-2 text-center text-sm">$99.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
