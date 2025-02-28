import { useState } from "react"
import { Search } from "lucide-react"

import { useEmailDisplayContext } from "@/context/EmailDisplayContext"

import { SwitchButton } from "@/components/Buttons"
import EmailRow from "@/components/EmailRow"
import { Emails, EmailType } from "@/data/Emails"

export default function EmailBar() {
    const { inbox, setInbox } = useEmailDisplayContext()

    return (
        <div className="flex flex-col gap-4 w-1/4 h-full border-x-1 border-med">
            <div className="flex justify-between items-center w-full h-1/16 min-h-18 px-4 border-b-1 border-med">
                <h1 className="text-2xl">Inbox</h1>
                <SwitchButton
                    state={inbox}
                    setState={setInbox}
                    buttonNames={["All Mail", "Unread"]}
                    stateNames={["all", "unread"]}
                />
            </div>
            <form className="w-full px-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-med" />
                    <input
                        className="w-full h-10 pl-10 border-1 border-med rounded-md text-sm font-light"
                        placeholder="Looking for something?"
                    />
                </div>
            </form>
            <div className="flex flex-col gap-4 px-4">
                {Emails.map((email: EmailType) => {
                    return (
                        <EmailRow
                            key={email.id}
                            id={email.id}
                            title={email.title}
                            sender={email.sender}
                            content={email.content}
                            timestamp={email.timestamp}
                        />
                    )
                })}
            </div>
        </div>
    )
}
