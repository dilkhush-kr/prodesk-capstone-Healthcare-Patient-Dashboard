"use client";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Prescriptions() {
  const [tab, setTab] = useState("active");
  const [search, setSearch] = useState("");

  const meds = [
    {
      id: 1,
      name: "Metformin",
      dose: "500mg",
      type: "Tablet",
      status: "active",
      doctor: "Dr. Raj Patel",
      refill: "Apr 15, 2026",
      stock: "28 / 60 tablets",
      purpose: "Type 2 Diabetes management",
    },
    {
      id: 2,
      name: "Aspirin",
      dose: "75mg",
      type: "Tablet",
      status: "expired",
      doctor: "Dr. Sarah Chen",
      refill: "Jan 10, 2026",
      stock: "0 / 30 tablets",
      purpose: "Heart health",
    },
  ];

  const filtered = meds.filter((m) => {
    const matchSearch = m.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchTab =
      tab === "active"
        ? m.status === "active"
        : m.status === "expired";

    return matchSearch && matchTab;
  });

  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        <Navbar />

        <div className="p-6 bg-gray-50 min-h-screen">

          {/* HEADER */}
          <h1 className="text-2xl font-bold">Prescriptions</h1>
          <p className="text-gray-500 mb-6">
            Manage your medications and dosage schedules
          </p>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { title: "Active Meds", value: 4 },
              { title: "Refill Soon", value: 1 },
              { title: "Expired", value: 1 },
              { title: "Total Meds", value: 5 },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-bold">{item.value}</h2>
                <p className="text-gray-500 text-sm">{item.title}</p>
              </div>
            ))}
          </div>

          {/* ALERT */}
          <div className="bg-yellow-100 text-yellow-700 px-4 py-3 rounded-xl flex justify-between mb-6">
            <span>⚠ 1 medication running low and need refill soon</span>
            <button className="bg-orange-400 text-white px-3 py-1 rounded">
              Refill Now
            </button>
          </div>

          {/* SEARCH */}
          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* TABS */}
          <div className="flex mb-6 bg-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setTab("active")}
              className={`flex-1 py-2 ${
                tab === "active"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : ""
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setTab("expired")}
              className={`flex-1 py-2 ${
                tab === "expired"
                  ? "bg-gray-300"
                  : ""
              }`}
            >
              Expired
            </button>
          </div>

          {/* CARDS */}
          <div className="space-y-5">
            {filtered.map((m) => (
              <div
                key={m.id}
                className="bg-white p-5 rounded-xl shadow border-t-4 border-blue-500"
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h2 className="font-semibold text-lg">
                      {m.name} {m.dose}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {m.name} • {m.type}
                    </p>

                    <div className="flex gap-2 mt-2 text-xs text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        Twice daily
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        With meals
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        Refill: {m.refill}
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {m.doctor}
                      </span>
                    </div>

                    <p className="mt-3 text-sm bg-blue-50 p-2 rounded">
                      <span className="font-medium">Purpose:</span>{" "}
                      {m.purpose}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      m.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>

                <div className="mt-4 text-sm flex justify-between">
                  <span>Remaining Stock</span>
                  <span className="text-orange-500">{m.stock}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}