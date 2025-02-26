import EmailBar from '@/components/Emailbar' 
import SideBar from '@/components/Sidebar'

function App() {
  return (
      <div className="absolute flex w-full h-full">
        <SideBar />
        <EmailBar />
        <div className="w-full h-full">
          <div className="w-full h-11/12">
            <div className="flex w-full h-1/16">
            </div>
          </div>
        </div>
      </div>
  )
}

export default App
