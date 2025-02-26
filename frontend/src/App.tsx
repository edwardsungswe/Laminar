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
              <button className="w-1/4 h-full">Primary</button>
              <button className="w-1/4 h-full">Social</button>
              <button className="w-1/4 h-full">Promotions</button>
              <button className="w-1/4 h-full">Other</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default App
