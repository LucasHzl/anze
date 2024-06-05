"use client"

import Navbar from "@/components/Navbar";
import { useEffect } from "react";

export default function Home() {

  const DecodeJwtTokenPayload = async (token) =>
  {
    const [decodedHeader, decodedPayload, signature] = token.split('.')
    const [header, payload] = [decodedHeader, decodedPayload].map(DecodeTokenComponent)
    console.log(payload)
    return payload
  }
  
  const DecodeTokenComponent = (value) =>
  {
    const buff = new Buffer(value, 'base64')
    const text = buff.toString('ascii')
    return JSON.parse(text)
  }
  


  return (
    <main>
      <Navbar />
    </main>
  );
}
