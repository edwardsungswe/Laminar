import EmailBar from "@/components/Emailbar"
import SideBar from "@/components/SideBar"
import EmailView from "@/components/EmailView"

import EmailDisplayProvider from "@/context/EmailDisplayContext"

function App() {
    return (
        <div className="absolute flex w-full h-full">
            <SideBar />
            <EmailDisplayProvider>
                <EmailBar />
                <EmailView />
            </EmailDisplayProvider>
        </div>
    )
}

export default App
