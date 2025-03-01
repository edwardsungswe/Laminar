import { createContext, useContext, useState } from "react"

const EmailDisplayContext = createContext<any>(null)

export function useEmailDisplayContext() {
    if (EmailDisplayContext === null) throw new Error("useEmailDisplayContext must be used within a EmailDisplayProvider")
    return useContext(EmailDisplayContext)
}

export default function EmailDisplayProvider({ children }: { children: any }) {
    const [inbox, setInbox] = useState<string>("all")
    const [emailInView, setEmailInView] = useState<string | null>(null)
    const [selectedEmails, setSelectedEmails] = useState<string[]>([])

    return (
        <EmailDisplayContext.Provider
            value={{
                inbox,
                setInbox,
                emailInView,
                setEmailInView,
                selectedEmails,
                setSelectedEmails,
            }}
        >
            {children}
        </EmailDisplayContext.Provider>
    )
}
