// "use client";

// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../lib/firebase";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleRegister = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert("User Registered Successfully");
//       router.push("/login");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold mb-4">Register</h1>

//       <input
//         type="email"
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 block mb-3 w-64"
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 block mb-3 w-64"
//       />

//       <button
//         onClick={handleRegister}
//         className="bg-green-500 text-white px-4 py-2"
//       >
//         Register
//       </button>

      
//       <p className="mt-4">
//         Already have an account?{" "}
//         <Link href="/login" className="text-blue-500">
//           Login
//         </Link>
//       </p>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Registration Successful");

      router.push("/login");

    } catch (error) {
      alert(error.message);

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
        { <div className="flex flex-col items-center">

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
            Create your healthcare account
          </p>
        </div> }

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
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 border border-gray-200 text-black rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.01] transition"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  );
}