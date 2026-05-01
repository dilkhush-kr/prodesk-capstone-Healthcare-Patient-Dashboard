"use client";


import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import { useEffect } from "react";

export default function Appointments() {

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Cardiologist",
      price: 120,
      time: "Today, 2:00 PM",
      img: "https://i.pravatar.cc/60?img=1",
      rating: "4.9 (248)",
      hospital: "City Medical Center",
      exp: "12 years exp.",
    },
    {
      id: 2,
      name: "Dr. Raj Patel",
      role: "Endocrinologist",
      price: 130,
      time: "Apr 15, 10:00 AM",
      img: "https://i.pravatar.cc/60?img=2",
      rating: "4.9 (176)",
      hospital: "Diabetes Care Center",
      exp: "10 years exp.",
    },
    {
      id: 3,
      name: "Dr. Emma Johnson",
      role: "General Practice",
      price: 80,
      time: "Today, 4:30 PM",
      img: "https://i.pravatar.cc/60?img=3",
      rating: "4.8 (312)",
      hospital: "HealthFirst Clinic",
      exp: "8 years exp.",
    },
  ];

 

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

    const [appointments, setAppointments] = useState([]);

   const handleConfirm = async () => {
  if (!selectedDoctor || !selectedDate || !selectedTime) return;

  try {
    await addDoc(collection(db, "appointments"), {
      doctorName: selectedDoctor.name,
      role: selectedDoctor.role,
      date: selectedDate,
      time: selectedTime,
      userId: auth.currentUser?.uid || "guest",
      createdAt: new Date(),
    });

    toast.success("Appointment Booked ✅");

    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);

    fetchAppointments(); // refresh list
  } catch (err) {
    console.error(err);
    toast.error("Booking failed ❌");
  }
};

const fetchAppointments = async () => {
  const snapshot = await getDocs(collection(db, "appointments"));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setAppointments(data);
};

useEffect(() => {
  fetchAppointments();
}, []);


 

  const filteredDoctors = doctors.filter((doc) => {
    const matchSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.role.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" || doc.role === category;

    return matchSearch && matchCategory;
  });

  // const handleConfirm = () => {
  //   toast.success("Appointment Booked ✅");
  //   setSelectedDoctor(null);
  //   setSelectedDate(null);
  //   setSelectedTime(null);
  // };

 

  return (
    <>
      <Toaster position="top-right" />

      <div className="flex h-screen">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN */}
         <div className="flex-1 flex flex-col ml-64">
          <Navbar />

          <div className="p-6 bg-gray-50 min-h-screen">

            <h1 className="text-2xl font-bold mb-2">Appointments</h1>
            <p className="text-gray-500 mb-6">
              Book consultations with top healthcare specialists
            </p>

            {/* SEARCH */}
            <div className="bg-white p-4 rounded-2xl shadow mb-6 flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search doctors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border p-3 rounded-xl outline-none"
              />

              <button className="bg-gray-100 px-4 py-2 rounded-xl">
                Filter
              </button>
            </div>

            {/* CATEGORY */}
            <div className="flex gap-3 flex-wrap mb-6">
              {["All", "Cardiologist", "Neurologist", "General Practice", "Endocrinologist"].map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    category === item
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* DOCTORS */}
            <div className="space-y-5">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-5 rounded-2xl shadow"
                >
                  <div className="flex justify-between items-start flex-wrap gap-4">

                    {/* LEFT */}
                    <div className="flex gap-4">
                      <img src={doc.img} className="w-16 h-16 rounded-xl" />

                      <div>
                        <h2 className="font-semibold">{doc.name}</h2>
                        <p className="text-blue-500 text-sm">{doc.role}</p>

                        <p className="text-gray-500 text-sm">
                          ⭐ {doc.rating} • {doc.hospital} • {doc.exp}
                        </p>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="text-right">
                      <p className="font-semibold text-lg">${doc.price}</p>
                      <p className="text-gray-400 text-sm">/visit</p>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-between items-center mt-5 flex-wrap gap-3">
                    <p className="text-green-500 text-sm">
                      🕒 {doc.time}
                    </p>

                    <button
                      onClick={() => setSelectedDoctor(doc)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-xl"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* UPCOMING APPOINTMENTS */}
<div className="mt-10 bg-white p-5 rounded-2xl shadow">
  <h2 className="font-semibold text-lg mb-4">Upcoming</h2>

  {appointments.length === 0 ? (
    <p className="text-gray-500">No appointments yet</p>
  ) : (
    <div className="space-y-4">
      {appointments.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border p-3 rounded-xl"
        >
          <div>
            <h3 className="font-medium">{item.doctorName}</h3>
            <p className="text-sm text-gray-500">{item.role}</p>
            <p className="text-blue-500 text-sm">
              {item.date} - {item.time}
            </p>
          </div>

          <span className="text-green-500 text-sm">
            Scheduled
          </span>
        </div>
      ))}
    </div>
  )}
</div>

          </div>
        </div>

        {/* RIGHT PANEL */}
        {selectedDoctor && (
          <div className="fixed right-0 top-0 w-[400px] h-screen bg-white shadow-lg p-5 z-50 overflow-y-auto">

            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4"
            >
              ✖
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Book with {selectedDoctor.name}
            </h2>

            {/* DATE */}
            <h3 className="mb-2 font-medium">Select Date</h3>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(30)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(i + 1)}
                  className={`p-2 rounded ${
                    selectedDate === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* TIME */}
            {selectedDate && (
              <>
                <h3 className="mt-6 mb-2 font-medium">Select Time</h3>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    "9:00 AM",
                    "10:00 AM",
                    "2:00 PM",
                    "4:00 PM",
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`p-2 rounded ${
                        selectedTime === t
                          ? "bg-green-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* CONFIRM */}
            {selectedTime && (
              <button
                onClick={handleConfirm}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl"
              >
                Confirm Booking
              </button>
            )}
          </div>
        )}

      </div>
    </>
  );
}