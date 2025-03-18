import { useState, useRef } from "react"
import { useEmailDisplayContext } from "@/context/EmailDisplayContext"
import { updateEmailReadStatus } from "@/services/email"
type EmailRowProps = {
    id: string
    title: string
    sender: {
        name: string
        email: string
        icon?: string // Optional field for sender icon (URL)
    }
    content: string
    timestamp: string
    read: boolean
}

export default function EmailRow({ id, title, sender, content, timestamp, read }: EmailRowProps) {
    const { selectedEmails, setSelectedEmails, emailInView, setEmailInView } = useEmailDisplayContext()
    const [checked, setChecked] = useState<boolean>(false)
    const checkboxRef = useRef<HTMLInputElement>(null)

    let emailStyle = `flex flex-col gap-2 w-full h-34 p-4 border-1 border-med rounded-lg cursor-pointer
    ${emailInView === id ? "bg-med-dark" : read ? "hover:bg-dark" : "bg-gray-600"}` //Change unread email color to something better later
    //we can choose between colored background or the white dot that I added as well

    function handleEmailRowClick(event: any) {
        if (event.target !== checkboxRef.current) {
            setEmailInView(id)
        }
        if (read === false) {
            updateEmailReadStatus(id, true)
            console.log("Read Status Changed")
        }
    }

    function handleCheckboxClick(event: any) {
        event.stopPropagation()
        if (!checked) {
            setChecked(true)
            setSelectedEmails([...selectedEmails, id])
        } else {
            setChecked(false)
            setSelectedEmails(selectedEmails.filter((emailId: string) => emailId !== id))
        }
    }

    return (
        <div
            className={emailStyle}
            onClick={(e) => {
                handleEmailRowClick(e)
            }}
        >
            <div className="flex justify-between items-center">
                <span className="flex gap-2 items-center">
                    <label
                        className="flex items-center cursor-pointer relative"
                        onClick={(e) => {
                            handleCheckboxClick(e)
                        }}
                    >
                        <input
                            ref={checkboxRef}
                            type="checkbox"
                            className="peer h-6 w-6 cursor-pointer appearance-none rounded shadow hover:shadow-md border border-med-light checked:bg-light checked:border-white"
                        />
                        <span className="absolute text-black opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </span>
                    </label>
                    <h4 className="text-sm truncate">{sender.name}</h4>
                    {!read && <span className="ml-2 w-2 h-2 bg-white rounded-full"></span>}
                </span>
                <p className="text-xs text-light font-semibold">{timestamp}</p>
            </div>
            <h2 className="truncate font-bold">{title}</h2>
            <p className="text-xs text-light line-clamp-2 leading-5">{content}</p>
        </div>
    )
}
