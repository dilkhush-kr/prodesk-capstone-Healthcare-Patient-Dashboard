// "use client";

// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../lib/firebase";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push("/dashboard");
//     } catch (error) {
//     console.log(error); 

//     if (error.code === "auth/user-not-found") {
//       alert("User not found. Please register first.");
//     } else if (error.code === "auth/wrong-password") {
//       alert("Incorrect password.");
//     } else {
//       alert("Login failed. Check your email and password.");
//     }
//   }

// };

//   return (
//     <div className="p-10">
//       <h1>Login</h1>

//       <input
//         type="email"
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 block mb-2"
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 block mb-2"
//       />

//       <button
//         onClick={handleLogin}
//         className="bg-blue-500 text-white px-4 py-2"
//       >
//         Login
//       </button>

    
//       <p className="mt-4">
//         Don't have an account?{" "}
//         <Link href="/register" className="text-blue-500">
//           Register
//         </Link>
//       </p>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      router.push("/dashboard");

    } catch (error) {
      console.log(error);

      if (error.code === "auth/user-not-found") {
        alert("User not found");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password");
      } else {
        alert("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f7ff] px-4 relative overflow-hidden">

      {/* GRID BG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#dbe3ff_1px,transparent_1px),linear-gradient(to_bottom,#dbe3ff_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-[32px] shadow-xl border border-gray-100 p-8">

        {/* LOGO */}
        <div className="flex flex-col items-center">

          <div className="flex items-center gap-3 mb-3">
            {/* <Image
              src="/logo.png"
              alt="VitalSync Logo"
              width={52}
              height={52}
              priority
            /> */}

            <div>
              <h1 className="text-3xl font-bold text-blue-600">
                VitalSync
              </h1>

              <p className="text-sm text-purple-500 font-medium">
                HEALTHCARE
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-8">
            Track your health seamlessly
          </p>
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 border border-gray-200 text-black rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <button className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </button>
          </div>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 text-black rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.01] transition"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold"
          >
            Create Account
          </Link>
        </p>

      </div>
    </main>
  );
}