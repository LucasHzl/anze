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
  
  useEffect(() => {
          DecodeJwtTokenPayload("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MTc2MDQ4MzIsImV4cCI6MTcxNzYwODQzMiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibHVjYXNAZ21haWwuY29tIn0.RrxBsknR25isLNhqnb5ZJ0qVyE9HoCpIlYT4BEsnUFkIgmJIGBA6KQFqdTnyYWozj-KSmLlzTLlpTLb9dOLX2tEPwBP3tNVROXFX62LbV0WsfJp8vWB3rSSqS101ZiNTlL-C8QavTi0VvM_Ay83MbbN67odRqjUBI6XwpeFOTJl7JonHahenAWZHttpvzElu6uSI6BYoPhQnU_pbxrgoQZ_kfE5yfQya7FBlfA4QXZtrG_gqAZsgWE8nfXOFYy3EzQMEYvoJXpT6GssfpLq1BvrlwPHwlmpCiCJ73Lc2uwuQHsMoKGb5_dT9gsQntUYIPjWIJnq_22_ZBy5UEjarVg")
      }, [])

  return (
    <main>
      <Navbar />
    </main>
  );
}
