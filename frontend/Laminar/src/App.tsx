import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Inbox from "./pages/Inbox";
import Sent from "./pages/Sent";

function App() {
  return (
    <Router>
      {/* Use flex to position Sidebar & Main Content side by side */}
      <div className="flex h-screen">
        {/* Sidebar takes up fixed width */}
        <Sidebar />

        {/* Main Content takes up remaining space */}
        <div className="flex-1 p-6 flex justify-center">
          <div className="w-full max-w-4xl">
            <Routes>
              <Route path="/" element={<Inbox />} />
              <Route path="/sent" element={<Sent />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
