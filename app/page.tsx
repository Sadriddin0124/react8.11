"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const redirectToSignUp =()=> {
    setTimeout(() => {
      router.push("/auth/signup")
    }, 1000);
  }
  redirectToSignUp()
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="relative w-[100%] h-[50%] main_container">
      <h1 className="welcome">Welcome To our website</h1>
      </div>
    </main>
  );
}
