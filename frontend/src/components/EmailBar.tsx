import Emails from "@/data/Emails"
import EmailRow from "@/components/EmailRow"
import { Search } from "@mui/icons-material"
import { useState } from "react"

export default function EmailBar() {
    const [inbox, setInbox] = useState<string>("all")

    return (
        <div className="flex flex-col gap-4 w-1/4 h-full border-x-1 border-med">
            <div className="flex justify-between items-center w-full h-1/16 px-4 border-b-1 border-med">
                <h1 className="text-2xl">Inbox</h1>
                <div className="flex gap-1 justify-evenly h-10 p-1 text-sm rounded-lg bg-dark">
                    <button
                        className={`w-16 cursor-pointer hover:bg-black hover:rounded-md ${inbox == "all" ? "bg-black rounded-md" : "transition duration-150 hover:bg-med-dark rounded-md"}`}
                        onClick={() => {setInbox("all")}}
                    >
                        All Mail
                    </button>
                    <button
                        className={`w-16 cursor-pointer hover:bg-black hover:rounded-md ${inbox == "unread" ? "bg-black rounded-md" : "transition duration-150 hover:bg-med-dark rounded-md"}`}
                        onClick={() => {setInbox("unread")}}
                    >
                        Unread
                    </button>
                </div>
            </div>
            <form className="w-full px-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2 h-4 w-4 text-med" />
                    <input className="w-full h-10 pl-10 border-1 border-med rounded-md text-sm font-light" placeholder='Looking for something?' />
                </div>
            </form>
            <div className="flex flex-col gap-4 px-4">
                {Emails.map((email, idx) => {
                    return (
                        <EmailRow key={email.id} selected={idx === 0} title={email.title} sender={email.sender} content={email.content} timestamp={email.timestamp} />
                    )
                })} 
            </div>
        </div>
    )
}