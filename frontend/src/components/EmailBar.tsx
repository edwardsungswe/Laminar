import { useState } from "react"
import { Emails, EmailType } from "@/data/Emails"
import { Search } from 'lucide-react'

import EmailRow from "@/components/EmailRow"

export default function EmailBar() {
    const [inbox, setInbox] = useState<string>("all")
    const [emailInView, setEmailInView] = useState<string|null>(null)
    const [selectedEmails, setSelectedEmails] = useState<string[]>([])

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
                    <Search className="absolute left-3 top-3 h-4 w-4 text-med" />
                    <input className="w-full h-10 pl-10 border-1 border-med rounded-md text-sm font-light" placeholder='Looking for something?' />
                </div>
            </form>
            <div className="flex flex-col gap-4 px-4">
                {Emails.map((email: EmailType) => {
                    return (
                        <EmailRow 
                            key={email.id}
                            id={email.id}
                            selected={emailInView}
                            title={email.title}
                            sender={email.sender}
                            content={email.content}
                            timestamp={email.timestamp}
                            selectedEmails={selectedEmails}
                            setSelectedEmails={setSelectedEmails}
                            setEmailInView={setEmailInView}
                        />
                    )
                })} 
            </div>
        </div>
    )
}