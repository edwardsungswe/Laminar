import { Emails } from "@/data/Emails"

//grabs read status of an email
export const getEmailReadStatus = (emailId: string): boolean | null => {
    const email = Emails.find(email => email.id === emailId);
    return email ? email.read : null;
};

//updates read status of an email
export const updateEmailReadStatus = (emailId: string, read: boolean): boolean => {
    const emailIndex = Emails.findIndex(email => email.id === emailId);
    if (emailIndex === -1) return false; // Email not found

    Emails[emailIndex].read = read;
    return true;
};
