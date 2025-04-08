import { LogOut, MessageSquare, Settings, User } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="bg-base-100 border-b border-base-300 sticky top-0 w-full z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container m-auto px-6 h-16">
        <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
        <Link to={"/"} className="flex items-center gap-2.5 hover:opacity-80 transition-all">
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-primary"/>
          </div>
          <h1 className="text-lg font-bold">Chatty</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
        <Link to={"/settings"} className="btn flex items-center btn-sm gap-2 transition-colors">
        <Settings className="w-4 h-4"/>
        <span className="hidden sm:inline">Settings</span>
        </Link>
        <Link to={"/profile"} className="btn flex items-center btn-sm gap-2 transition-colors">
        <User className="w-4 h-4"/>
        <span className="hidden sm:inline">Profile</span>
        </Link>
        <Link to={"/"} className="btn flex items-center btn-sm gap-2 transition-colors">
        <LogOut className="w-4 h-4"/>
        <span className="hidden sm:inline">Log Out</span>
        </Link>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
