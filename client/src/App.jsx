import { Routes, Route } from "react-router-dom"
import AdminLayout from "./page/AdminLayout"
import ClientLayout from "./page/ClientLayout"

import Home from "./page/client/Home"
import EventsAndPrograms from "./page/client/EventsAndPrograms"
import Announcements from "./page/client/Announcements"
import About from "./page/client/About"

import Login from "./page/admin/Login"
import Dashboard from "./page/admin/Dashboard"
import CitizenInformation from "./page/admin/CitizenInformation"
import Reports from "./page/admin/Reports"
import AdminActivities from "./page/admin/Activities"
import Settings from "./page/admin/Settings"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ClientLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events-and-programs/:id?" element={<EventsAndPrograms />} />
        <Route path="/announcements/:id?" element={<Announcements />} />
      </Route>
      <Route path="/rbim/" element={<AdminLayout />}>
        <Route path="/rbim/" element={<Dashboard />} />
        <Route path="/rbim/citizen-information" element={<CitizenInformation />} />
        <Route path="/rbim/reports" element={<Reports />} />
        <Route path="/rbim/activities" element={<AdminActivities />} />
        <Route path="/rbim/settings/:path?" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
