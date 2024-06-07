import Navbar from "@/components/Navbar";
import SignUpForm from "@/components/SignUpForm";

export default function SignIn() {
    return (
        <>
            <Navbar />
            <main className="flex justify-center items-center flex-col h-screen">
                <SignUpForm />
            </main>
        </>
    )
}