"use client"

import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto mt-10 mb-8">
        <h1 className="border-b py-6 text-4xl font-semibold">Profil</h1>
        <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
          <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="pt-4">
              <h1 className="py-2 text-2xl font-semibold">Informations personnelles</h1>
              <p className="font- text-slate-600">Retrouvez ici toutes vos informations, avec la possibilité de les modifier</p>
            </div>
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Identifiants de connexion</p>
            <hr className="mt-4 mb-8" />
            <div className="grid gap-y-6 gap-x-3 sm:grid-cols-2 lg:px-8 mb-8">
              <label className="block" htmlFor="name">
                <p className="text-sm">Email</p>
                <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="Shakir Ali" />
              </label>
              <label className="block" htmlFor="name">
                <p className="text-sm">Mot de passe</p>
                <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="shakir.ali@corpora.de" />
              </label>


            </div>
            <p className="py-2 text-xl font-semibold">Identité et localisation</p>
            <hr className="mt-4 mb-8" />
            <div className="grid gap-y-6 gap-x-3 sm:grid-cols-2 lg:px-8 mb-8">
              <label className="block" htmlFor="name">
                <p className="text-sm">Nom</p>
                <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="Shakir Ali" />
              </label>
              <label className="block" htmlFor="name">
                <p className="text-sm">Prénom</p>
                <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="shakir.ali@corpora.de" />
              </label>
              <label className="block" htmlFor="name">
                <p className="text-sm">Date de naissance</p>
                <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="6346322" />
              </label>
              <label className="block" htmlFor="name">
                <p className="text-sm">Téléphone</p>
                <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="Germany" />
              </label>
              <label className="block sm:col-span-2" htmlFor="name">
                <p className="text-sm">Adresse</p>
                <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="82844 Boyle Extension Suite 541 - Covington, HI / 28013" />
              </label>
              
            </div>



            <p className="py-2 text-xl font-semibold">Moyen de paiement</p>
            <hr className="mt-4 mb-8" />
            <div className="grid gap-y-6 gap-x-3 sm:grid-cols-2 lg:px-8 mb-8">
              <label className="block" htmlFor="name">
                <p className="text-sm">Numéro de carte bancaire</p>
                <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="Shakir Ali" />
              </label>
              <label className="block" htmlFor="name">
                <p className="text-sm">Date d'expiration</p>
                <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="shakir.ali@corpora.de" />
              </label>
              <label className="block" htmlFor="name">
                <p className="text-sm">Cryptogramme</p>
                <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="6346322" />
              </label>
             
              
            </div>


            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Sauvegarder</button>
            <hr className="mt-4 mb-8" />
          </div>
        </div>
      </div>




      <div className="mx-4 max-w-screen-xl sm:mx-8 xl:mx-auto">
        <h1 className="border-b py-6 text-4xl font-semibold">Paiements</h1>
        <div className="grid grid-cols-8 pt-3 pb-10 sm:grid-cols-10">
          <div className="col-span-8 rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="pt-4">
              <h1 className="py-2 text-2xl font-semibold">Moyen de paiement</h1>
              <p className="font- text-slate-600">Votre moyen de paiement fourni, modifiez-le si nécessaire</p>
            </div>
            <hr className="mt-4 mb-8" />
            <div className="mb-10 grid gap-y-8 lg:grid-cols-2 lg:gap-y-0">
              <div className="space-y-8">
                <div>
                  <div className="flex">
                    <p className="font-medium mb-1">Billing Period</p>
                    <button className="ml-auto inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
                  </div>
                  <div className="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                    <p className="ml-4 w-56">
                      <strong className="block text-lg font-medium">MONTHLY</strong>
                      <span className="text-xs text-gray-400"> Next Renewal: 4 Jan 2022 </span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <p className="font-medium mb-1">Payment Method</p>
                    <button className="ml-auto inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
                  </div>
                  <div className="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                    <img className="h-10 object-contain pl-4" src="/images/kt10d0A1TgzZpAoNM_YPX.png" alt="" />
                    <p className="ml-4 w-56">
                      <strong className="block text-lg font-medium">**** **** **** 453 </strong>
                      <strong className="block text-lg font-medium">ALBERT K. DANIEL </strong>
                      <span className="text-xs text-gray-400"> Expires on: Dec 2024 </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-y-6 gap-x-3 sm:grid-cols-2 lg:px-8">
                <label className="block" htmlFor="name">
                  <p className="text-sm">Name</p>
                  <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="Shakir Ali" />
                </label>
                <label className="block" htmlFor="name">
                  <p className="text-sm">Email Address</p>
                  <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="shakir.ali@corpora.de" />
                </label>
                <label className="block sm:col-span-2" htmlFor="name">
                  <p className="text-sm">Billing Address</p>
                  <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="82844 Boyle Extension Suite 541 - Covington, HI / 28013" />
                </label>
                <label className="block" htmlFor="name">
                  <p className="text-sm">VAT #</p>
                  <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="6346322" />
                </label>
                <label className="block" htmlFor="name">
                  <p className="text-sm">Country</p>
                  <input className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1" type="text" value="Germany" />
                </label>
              </div>
            </div>
            <div className="mx-auto mb-10 overflow-hidden rounded-lg border bg-white">
              <p className="mb-6 bg-gray-100 py-1 text-center text-lg font-medium">Historique des paiements</p>
              <table className="w-full">
                <thead>
                  <tr>
                    <td className="text-center font-semibold">Invoice #</td>
                    <td className="text-center font-semibold">Amount</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b py-2 text-center text-sm">X-543242</td>
                    <td className="border-b py-2 text-center text-sm">$99.00</td>
                  </tr>
                  <tr>
                    <td className="border-b py-2 text-center text-sm">X-543242</td>
                    <td className="border-b py-2 text-center text-sm">$99.00</td>
                  </tr>
                  <tr>
                    <td className="border-b py-2 text-center text-sm">X-543242</td>
                    <td className="border-b py-2 text-center text-sm">$99.00</td>
                  </tr>
                  <tr>
                    <td className="border-b py-2 text-center text-sm">X-543242</td>
                    <td className="border-b py-2 text-center text-sm">$99.00</td>
                  </tr>
                  <tr>
                    <td className="border-b py-2 text-center text-sm">X-543242</td>
                    <td className="border-b py-2 text-center text-sm">$99.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
