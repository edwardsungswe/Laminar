import { useState } from "react";
import EmailDetail from "./EmailDetail";

const emails = [
  { id: 1, sender: "alice@example.com", subject: "Meeting Reminder", body: "Don't forget our meeting at 3 PM!" },
  { id: 2, sender: "bob@example.com", subject: "Invoice Due", body: "Your invoice is due on the 15th." },
];

const EmailList = () => {
  const [selectedEmail, setSelectedEmail] = useState(emails[0]);

  return (
    <div className="flex">
      {/* Email List */}
      <div className="w-1/3 border-r">
        {emails.map((email) => (
          <div
            key={email.id}
            className="p-4 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedEmail(email)}
          >
            <h3 className="font-bold">{email.subject}</h3>
            <p className="text-sm text-gray-600">{email.sender}</p>
          </div>
        ))}
      </div>

      {/* Email Detail */}
      <div className="w-2/3 p-4">
        <EmailDetail email={selectedEmail} />
      </div>
    </div>
  );
};

export default EmailList;
