"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Appointments", path: "/appointments", icon: Calendar },
    { name: "Medical Records", path: "/medical-records", icon: FileText },
    { name: "Prescriptions", path: "/prescriptions", icon: Pill },
  ];

  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-white border-r p-5 flex flex-col z-40">
      
      {/* LOGO */}
      <h1 className="text-xl font-bold mb-8">VitalSync</h1>

      {/* MENU */}
      <div className="flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition ${
                active
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}