## Week 13 (Planning & Design)
# 🏥 VitalSync – Healthcare Patient Dashboard

## 🚀 Project Description

VitalSync is a modern healthcare dashboard designed to help patients manage and monitor their health data efficiently. The application provides a clean and intuitive interface where users can track vital health metrics, book appointments, view prescriptions, and analyze their medical history in a structured manner.

This project focuses on delivering a seamless frontend experience with a professional UI/UX design inspired by real-world healthcare applications.

---

## 👨‍💻 My Role

**Frontend Developer**

This project is developed as part of my frontend track internship. I am responsible for:

* UI/UX Design (Figma)
* Frontend Development using Next.js
* State management and data handling (mock/local storage)
* Responsive design implementation

---

## 🛠️ Tech Stack

### Frontend:

* Next.js
* React.js
* Tailwind CSS

### State Management:

* React Hooks (useState, useEffect)
* Context API (if needed)

### Data Handling:

* LocalStorage (Mock Database)

---

## 🎯 Core Features (PRD)

### 🔐 Authentication System (UI Only)

* User login interface
* Role selection (Patient / Doctor)
* Form validation (basic frontend level)

---

### 📊 Patient Dashboard

* Overview of health metrics:

  * Blood Pressure
  * Sugar Level
  * Heart Rate
* Display last updated values
* Clean card-based UI

---

### 📅 Appointment Management

* View upcoming appointments
* Book new appointments (UI flow)
* Select date and time slots

---

### 👨‍⚕️ Doctor Availability

* List of doctors
* Show availability status (Online / Offline)
* Simple interaction UI for booking

---

### 📋 Medical History Timeline

* Timeline view of past records
* Organized chronological layout
* Easy readability for users

---

### 💊 Prescriptions Viewer

* View prescribed medicines
* Display dosage and instructions
* Clean and structured card layout

---

### 👤 Profile Section

* View user details
* Edit basic information (UI only)

---

## 🎨 Figma Design

Figma Link:
👉 https://www.figma.com/make/GTXAICOcXi5FAOwhl9txMO/Healthcare-Patient-Dashboard-UI?t=ee88fFmJ05lmWGNd-20&fullscreen=1&preview-route=%2Fprescriptions

The design follows:

* Modern SaaS dashboard style
* Clean layout with proper spacing
* Card-based UI components
* Consistent color system
* Mobile-responsive structure

---

## 🧠 Frontend Architecture

User
↓
Next.js Application
↓
React Components (UI Layer)
↓
State Management (useState / Context API)
↓
LocalStorage (Mock Data Storage)

---

## 📦 Data Structure (Mock Schema)

### Users

* id
* name
* email
* role (patient/doctor)

### Health Records

* id
* userId
* date
* bloodPressure
* sugarLevel
* heartRate

### Appointments

* id
* userId
* doctorName
* date
* time
* status

### Prescriptions

* id
* userId
* medicineName
* dosage
* instructions

---

## 📱 Responsiveness Plan

* Mobile-first design approach
* Optimized layouts for:

  * Mobile devices
  * Tablets
  * Desktop screens

---

## 🔮 Future Enhancements

* Backend integration (API + database)
* Real-time data sync
* AI-based health suggestions
* Notifications system

---

## 🎯 Goal of the Project

To build a production-like healthcare dashboard that demonstrates strong frontend development skills, UI/UX understanding, and the ability to design scalable applications.

---

## 🧠 Frontend Architecture

### 📊 Architecture Diagram

<img width="1536" height="1024" alt="Healthcare app frontend architecture diagram (1)" src="https://github.com/user-attachments/assets/6d9581de-3ed6-4178-9504-b58c12c6f88f" />


---

### 🔌 Mock API Endpoints

* POST   /login
* GET    /user
* GET    /health-records
* POST   /health-records
* GET    /appointments
* POST   /appointments
* GET    /doctors
* GET    /prescriptions

---

### 📌 Explanation

The application follows a frontend-only architecture using Next.js and React. The user interface interacts with the application state managed using React hooks and Context API.

The state is divided into multiple modules such as authentication, health records, appointments, doctors, and prescriptions. All data is stored in LocalStorage to simulate a backend database.

Mock API endpoints are defined to replicate real-world API behavior, making the application scalable for future backend integration.


## Week 14 (Development)
- Next.js setup
- Firebase Authentication
- Login & Register pages
