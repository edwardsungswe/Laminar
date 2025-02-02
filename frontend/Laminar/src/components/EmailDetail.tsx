interface Email {
    id: number;
    sender: string;
    subject: string;
    body: string;
  }
  
  const EmailDetail = ({ email }: { email: Email }) => {
    return (
      <div>
        <h2 className="text-xl font-bold">{email.subject}</h2>
        <p className="text-gray-600">From: {email.sender}</p>
        <p className="mt-4">{email.body}</p>
      </div>
    );
  };
  
  export default EmailDetail;
  