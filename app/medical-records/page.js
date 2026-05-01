"use client";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function MedicalRecords() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  //  AI states
  const [aiResult, setAiResult] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const records = [
    {
      id: 1,
      title: "Annual Health Checkup",
      doctor: "Dr. Emma Johnson",
      type: "Checkup",
      status: "Normal",
      date: "March 15, 2026",
    },
    {
      id: 2,
      title: "Echocardiogram (ECG)",
      doctor: "Dr. Sarah Chen",
      type: "Cardiology",
      status: "Normal",
      date: "February 20, 2026",
    },
    {
      id: 3,
      title: "Blood Glucose Test",
      doctor: "Dr. Raj Patel",
      type: "Lab Test",
      status: "Borderline",
      date: "January 10, 2026",
    },
  ];

  //  AI function
  const handleAI = async () => {
  setLoadingAI(true);

  // fake delay (AI jaisa feel)
  setTimeout(() => {
    setAiResult(
      "Patient health records show mostly normal results. No major issues detected. Regular monitoring recommended."
    );
    setLoadingAI(false);
  }, 1500);
};

  const filtered = records.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.doctor.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" || r.type === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />

        <div className="p-6 bg-gray-50 min-h-screen">

          {/* HEADER */}
          <h1 className="text-2xl font-bold">Medical Records</h1>
          <p className="text-gray-500 mb-4">
            Your complete health history and lab results
          </p>

          {/* ✅ AI BUTTON */}
          <button
            onClick={handleAI}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Summarize Records (AI)
          </button>

          {/*  AI RESULT */}
          {loadingAI && (
            <p className="text-blue-500 mb-4">Loading AI...</p>
          )}

          {aiResult && (
            <div className="bg-white p-4 rounded-xl shadow mb-6">
              {aiResult}
            </div>
          )}

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { title: "Total Records", value: 24 },
              { title: "Normal Results", value: 19 },
              { title: "Follow-ups", value: 3 },
              { title: "Pending", value: 2 },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-bold">{item.value}</h2>
                <p className="text-gray-500 text-sm">{item.title}</p>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3">
            <input
              type="text"
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border p-2 rounded-lg"
            />
            <button className="bg-gray-100 px-4 rounded-lg">
              Filter
            </button>
          </div>

          {/* CATEGORY */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {["All", "Checkup", "Cardiology", "Lab Test", "Consultation"].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm ${
                  category === c
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* RECORDS */}
          <div className="space-y-5">
            {filtered.map((rec) => (
              <div
                key={rec.id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{rec.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {rec.doctor} • {rec.type}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      rec.status === "Normal"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {rec.status}
                  </span>

                  <p className="text-gray-400 text-sm mt-1">
                    {rec.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}