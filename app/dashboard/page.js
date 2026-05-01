
"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  LineChart,
  Line,
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


const latest = records[records.length - 1];

const chartData = records.slice(-7).map((item, index) => {
  return {
    day: `D${index + 1}`,
    sugar: Number(item.sugar),
    heart: Number(item.heart),
    bp: Number(item.bp?.split("/")[0]),
  };
});

return ( 
  <div className="flex h-screen">

    {/* SIDEBAR */}
      <Sidebar />

   {/* MAIN */}   
  <div className="flex-1 flex flex-col ml-64">
  <Navbar />
<div className="p-4 md:p-6 bg-gray-50 min-h-screen overflow-y-auto flex-1"> <h1 className="text-2xl font-bold">Dashboard</h1>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

  {/* BP CARD */}
  <div className="bg-white p-6 rounded-2xl shadow relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full opacity-30"></div>

    <div className="flex items-center justify-between mb-4">
      <div className="bg-blue-100 p-3 rounded-xl">💓</div>
    </div>

    <h2 className="text-3xl font-bold text-black">
      {latest?.bp || "--"}
      <span className="text-sm ml-1 text-gray-500">mmHg</span>
    </h2>

    <p className="text-gray-500 mt-1">Blood Pressure</p>

    <div className="flex items-center justify-between mt-3">
      <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-lg">
        Normal
      </span>
      <span className="text-red-500 text-sm">+2%</span>
    </div>

    <div className="mt-3 h-1 bg-blue-200 rounded-full"></div>
  </div>

  {/* SUGAR */}
  <div className="bg-white p-6 rounded-2xl shadow relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full opacity-30"></div>

    <div className="bg-orange-100 p-3 rounded-xl w-fit mb-4">🔥</div>

    <h2 className="text-3xl font-bold text-black">
      {latest?.sugar || "--"}
      <span className="text-sm ml-1 text-gray-500">mg/dL</span>
    </h2>

    <p className="text-gray-500 mt-1">Sugar Level</p>

    <div className="flex items-center justify-between mt-3">
      <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-lg">
        Normal
      </span>
      <span className="text-red-500 text-sm">-3%</span>
    </div>

    <div className="mt-3 h-1 bg-orange-200 rounded-full"></div>
  </div>

  {/* HEART */}
  <div className="bg-white p-6 rounded-2xl shadow relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full opacity-30"></div>

    <div className="bg-red-100 p-3 rounded-xl w-fit mb-4">❤️</div>

    <h2 className="text-3xl font-bold text-black">
      {latest?.heart || "--"}
      <span className="text-sm ml-1 text-gray-500">bpm</span>
    </h2>

    <p className="text-gray-500 mt-1">Heart Rate</p>

    <div className="flex items-center justify-between mt-3">
      <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-lg">
        Normal
      </span>
      <span className="text-green-500 text-sm">+1%</span>
    </div>

    <div className="mt-3 h-1 bg-red-200 rounded-full"></div>
  </div>

  {/* CHECKUP */}
  <div className="bg-white p-6 rounded-2xl shadow relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full opacity-30"></div>

    <div className="bg-green-100 p-3 rounded-xl w-fit mb-4">📅</div>

    <h2 className="text-2xl font-bold text-black">
      Mar 15 <span className="text-sm text-gray-500">2026</span>
    </h2>

    <p className="text-gray-500 mt-1">Last Checkup</p>

    <div className="flex items-center justify-between mt-3">
      <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded-lg">
        26 days ago
      </span>
      <span className="text-green-500 text-sm">On schedule</span>
    </div>
  </div>

</div>

  {user && <p>Welcome: {user.email}</p>}

  {/* FORM */}
  
{records.length === 0 && (
  <p className="text-center text-gray-500">
    No records yet
  </p>
)}

  {/* RECORD LIST */}


  {/* CHART */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

  {/* LEFT - CHART */}
  <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow">

    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-lg font-semibold text-black">Health Trends</h2>
        <p className="text-gray-600 text-sm">Last 7 days overview</p>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-1 rounded-lg bg-blue-500  text-sm">Heart</button>
        <button className="px-3 py-1 rounded-lg bg-red-500 text-sm">Blood</button>
        <button className="px-3 py-1 rounded-lg bg-orange-500 text-white text-sm">Sugar</button>
      </div>
    </div>

    {/* Line Chart */}
   {chartData.length === 0 ? (
  <p className="text-gray-500 text-center py-10">
    No data available
  </p>
) : (
  
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
       data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />
        <YAxis />

        <Tooltip />

        <Line
  type="monotone"
  dataKey="sugar"
  stroke="#f59e0b"
  strokeWidth={3}
  dot={{ r: 4 }}
/>

<Line
  type="monotone"
  dataKey="heart"
  stroke="#ef4444"
  strokeWidth={2}
/>

<Line
  type="monotone"
  dataKey="bp"
  stroke="#3b82f6"
  strokeWidth={2}
/>
      </LineChart>
    </ResponsiveContainer>
)}
  </div>

  {/* RIGHT - UPCOMING */}
  <div className="bg-white p-6 rounded-2xl shadow text-black">

    <div className="flex justify-between mb-4">
      <h2 className="text-lg   text-black font-semibold">Upcoming</h2>
      
      <span className="text-blue-500 text-sm cursor-pointer">View all</span>
    </div>

    {/* CARD 1 */}
    <div className="flex items-center gap-3 mb-4 p-3 border rounded-xl">
      <img src="https://i.pravatar.cc/40" className="rounded-full" />
      <div className="flex-1">
        <p className="font-medium text-black">Dr. Sarah Chen</p>
        <p className="text-gray-600 text-sm">Cardiologist</p>
        <p className="text-blue-500 text-sm">Today, 2:00 PM</p>
      </div>
      <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded">
        Video Call
      </span>
    </div>

    {/* CARD 2 */}
    <div className="flex items-center gap-3 mb-4 p-3 border rounded-xl">
      <img src="https://i.pravatar.cc/41" className="rounded-full" />
      <div className="flex-1">
        <p className="font-medium text-black">Dr. Raj Patel</p>
        <p className="text-gray-600 text-sm">Endocrinologist</p>
        <p className="text-purple-500 text-sm">Apr 15, 10:00 AM</p>
      </div>
      <span className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded">
        In-Person
      </span>
    </div>

    {/* CARD 3 */}
    <div className="flex items-center gap-3 p-3 border rounded-xl">
      <img src="https://i.pravatar.cc/42" className="rounded-full" />
      <div className="flex-1">
        <p className="font-medium text-black">Dr. Emma Johnson</p>
        <p className="text-gray-600 text-sm">General Practice</p>
        <p className="text-green-500 text-sm">Apr 22, 3:30 PM</p>
      </div>
      <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded">
        Video Call
      </span>
    </div>

  </div>

</div>

  <button
    onClick={handleLogout}
    className="bg-black text-white px-4 py-2 mt-6"
  >
    Logout
  </button>
</div>
</div>
</div>
);
}
