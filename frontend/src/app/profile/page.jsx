"use client"

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DecodeJwtTokenPayload from "../../../utils/jwtDecoder";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [card_number, setCardNumber] = useState("");
  const [cryptogram, setCryptogram] = useState("");
  const [expiration_date, setExpirationDate] = useState("");
  const [user_id, setUserId] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  const isValidCardNumber = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\D/g, '');
    
    if (cleanNumber.length !== 16) {
      return false;
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i));

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const editPassword = async (e) => {
    e.preventDefault();
    console.log("Password submited");

    try {
      const bodyData = {
        currentPassword,
        newPassword,
      };

      console.log("Request body : ", bodyData);

      const response = await fetch(`http://127.0.0.1:8000/api/change_password`, {
        method: "POST",
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
      setCurrentPassword("")
      setNewPassword("")
    } catch (error) {
      setApiError(error.message);
    } finally {
      // router.push("/signin");
    }
  };

  const editSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!isValidCardNumber(card_number)) {
      setApiError("Numéro de carte bancaire invalide. Il doit contenir exactement 16 chiffres.");
      return;
    }

    let roles = ["ROLE_USER"];

    try {
      const bodyData = {
        roles,
        email,
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

      const response = await fetch(`http://127.0.0.1:8000/api/users/${user_id}`, {
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
    const decodedToken = await DecodeJwtTokenPayload(Cookies.get('token'))
    console.log(decodedToken);
    const response = await fetch(`http://127.0.0.1:8000/api/users?page=1&email=${decodedToken.username}`, {
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

  const init = async () => {
    try {
      let data = await getUser();
      data = data["hydra:member"][0]
      setEmail(data.email);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setBirthdate(data.birthdate);
      setPhone(data.phone);
      setAdress(data.adress);
      setCardNumber(data.card_number);
      setCryptogram(data.cryptogram);
      setExpirationDate(data.expiration_date);
      setUserId(data.id);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
              <form onSubmit={editPassword} action="#">
                <p class="py-2 text-xl font-semibold">Mot de passe</p>
                <div class="flex items-center">
                  <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <label for="login-password">
                      <span class="text-sm text-gray-500">Mot de passe actuel</span>
                      <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword} />
                      </div>
                    </label>
                    <label for="login-password">
                      <span class="text-sm text-gray-500">Nouveau mot de passe</span>
                      <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                        <input type="password" id="login-password" class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="***********" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                      </div>
                    </label>
                  </div>
                </div>
                <button class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Sauvegarder</button>
                <hr class="mt-4 mb-8" />
              </form>
              <form onSubmit={editSubmit} action="#">
                <div className="grid gap-y-6 gap-x-3 sm:grid-cols-2 lg:px-8 mb-8">
                  <label className="block" htmlFor="email">
                    <p className="text-xl font-bold">Email</p>
                    <input
                      className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
                      type="text"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
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
      </main>
    </>
  );
}
