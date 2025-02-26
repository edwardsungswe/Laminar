import Emails from "@/data/Emails"
import EmailRow from "@/components/EmailRow"

export default function EmailBar() {
    return (
        <div className="flex flex-col w-1/4 h-full py-8 border-x-2 border-gray-200">
            <div className="w-full px-4">
                <input className="w-full h-10 px-2 border-2 border-gray-300 rounded-md" placeholder='Looking for something?' />
            </div>
            <div className="flex flex-col">
                {Emails.map((email) => {
                    return (
                        <EmailRow key={email.id} title={email.title} sender={email.sender} content={email.content} timestamp={email.timestamp} />
                    )
                })} 
            </div>
        </div>
    )
}