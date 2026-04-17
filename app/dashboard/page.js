"use client";

import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user && <p>Welcome: {user.email}</p>}

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mt-4"
      >
        Logout
      </button>
    </div>
  );
}