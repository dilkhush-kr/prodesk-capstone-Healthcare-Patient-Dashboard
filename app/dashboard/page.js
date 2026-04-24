
"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
Legend,
ResponsiveContainer,
} from "recharts";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc,
} from "firebase/firestore";

export default function Dashboard() {
const router = useRouter();

const [user, setUser] = useState(null);
const [bp, setBp] = useState("");
const [sugar, setSugar] = useState("");
const [heart, setHeart] = useState("");
const [records, setRecords] = useState([]);
const [editId, setEditId] = useState(null);

//  Auth check
useEffect(() => {
const currentUser = auth.currentUser;

if (!currentUser) {
  router.push("/login");
} else {
  setUser(currentUser);
  fetchRecords();
}


}, []);

//  CREATE + UPDATE
const handleSubmit = async () => {
if (!bp || !sugar || !heart) {
alert("Fill all fields");
return;
}


if (editId) {
  // UPDATE
  const docRef = doc(db, "healthRecords", editId);

  await updateDoc(docRef, {
    bp,
    sugar,
    heart,
  });

  setEditId(null);
} else {
  // CREATE
  await addDoc(collection(db, "healthRecords"), {
    bp,
    sugar,
    heart,
    userId: auth.currentUser.uid,
  });
}

setBp("");
setSugar("");
setHeart("");

fetchRecords();
};

// READ
const fetchRecords = async () => {
const snapshot = await getDocs(collection(db, "healthRecords"));

const data = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

setRecords(data);

};

//  DELETE
const deleteRecord = async (id) => {
const confirmDelete = confirm("Are you sure?");
if (!confirmDelete) return;

await deleteDoc(doc(db, "healthRecords", id));

setRecords((prev) => prev.filter((item) => item.id !== id));

};

//  EDIT
const handleEdit = (item) => {
setBp(item.bp);
setSugar(item.sugar);
setHeart(item.heart);
setEditId(item.id);
};

//  LOGOUT
const handleLogout = async () => {
await signOut(auth);
router.push("/login");
};

//  CHART DATA 
const chartData = records.map((item, index) => {
const bpParts = item.bp ? item.bp.split("/") : [0, 0];


return {
  name: `R${index + 1}`,
  sugar: Number(item.sugar),
  heart: Number(item.heart),
  systolic: Number(bpParts[0]),
};
});

return ( <div className="p-10"> <h1 className="text-2xl font-bold">Dashboard</h1>

  {user && <p>Welcome: {user.email}</p>}

  {/* FORM */}
  <div className="mt-6">
    <h2 className="font-semibold">Add / Edit Record</h2>

    <input
      value={bp}
      placeholder="Blood Pressure (120/80)"
      onChange={(e) => setBp(e.target.value)}
      className="border p-2 m-2"
    />

    <input
      value={sugar}
      placeholder="Sugar Level"
      onChange={(e) => setSugar(e.target.value)}
      className="border p-2 m-2"
    />

    <input
      value={heart}
      placeholder="Heart Rate"
      onChange={(e) => setHeart(e.target.value)}
      className="border p-2 m-2"
    />

    <button
      onClick={handleSubmit}
      className="bg-blue-500 text-white px-4 py-2"
    >
      {editId ? "Update" : "Add"}
    </button>
  </div>

  {/* RECORD LIST */}
  <div className="mt-6">
    <h2 className="font-semibold">Your Records</h2>

    {records.map((item) => (
      <div key={item.id} className="border rounded-xl p-4 shadow">
        <p>BP: {item.bp}</p>
        <p>Sugar: {item.sugar}</p>
        <p>Heart: {item.heart}</p>

        <button
          onClick={() => handleEdit(item)}
          className="bg-yellow-500 text-white px-2 py-1 mt-2"
        >
          Edit
        </button>

        <button
          onClick={() => deleteRecord(item.id)}
          className="bg-red-500 text-white px-2 py-1 mt-2 ml-2"
        >
          Delete
        </button>
      </div>
    ))}
  </div>

  {/* CHART */}
  <p className="text-gray-500 mb-2">
    This chart shows your recent health records.
  </p>

  <div className="mt-10 bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold mb-4">
      Health Overview Chart
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip />
        <Legend />

        <Bar dataKey="sugar" fill="#3b82f6" name="Sugar" />
        <Bar dataKey="heart" fill="#10b981" name="Heart Rate" />
        <Bar dataKey="systolic" fill="#f59e0b" name="BP (Upper)" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <button
    onClick={handleLogout}
    className="bg-black text-white px-4 py-2 mt-6"
  >
    Logout
  </button>
</div>

);
}
