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
                    <div className="p-6 max-w-3xl mx-auto shadow-md rounded-lg">
                        {/* Sender Information */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                                {email.sender.icon && <img src={email.sender.icon} alt={email.sender.name} className="w-10 h-10 rounded-full" />}
                                <div>
                                    <p className="text-sm font-semibold">{email.sender.name}</p>
                                    <p className="text-xs text-gray-500">{email.sender.email}</p>
                                </div>
                            </div>
                            <p className="text-xs text-right">{email.timestamp}</p>
                        </div>

                        <h1 className="text-xl font-bold mt-2">{email.title}</h1>

                        <hr className="border-gray-300 my-4" />

                        <p className="whitespace-pre-wrap">{email.content}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
