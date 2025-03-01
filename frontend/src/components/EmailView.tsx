import { useState, useEffect } from "react"
import { useEmailDisplayContext } from "@/context/EmailDisplayContext"

import EmailViewHeader from "@/components/EmailViewHeader"

import { Emails, EmailType } from "@/data/Emails"

export default function EmailView() {
    const [email, setEmail] = useState<EmailType | null>(null)
    const { emailInView } = useEmailDisplayContext()

    useEffect(() => {
        setEmail(Emails.find((email: EmailType) => email.id === emailInView) || email)
    }, [emailInView])

    return (
        <div className={`relative flex flex-col w-${emailInView ? "full" : "0"} h-full`}>
            {email && (
                <div
                    className={`absolute top-0 left-0 w-full h-full overflow-y-scroll transition-opacity duration-500 ${
                        emailInView ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <EmailViewHeader />
                    <div className="w-full h-32 p-16">
                        <h1>{email.title}</h1>
                        <span>
                            <h1>{email.sender}</h1>
                            <h3>{email.timestamp} </h3>
                        </span>
                    </div>
                    <div className="w-full p-16">
                        <p>{email.content}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
