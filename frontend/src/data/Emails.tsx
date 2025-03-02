export type EmailType = {
    id: string
    title: string
    sender: {
        name: string
        email: string
        icon?: string // Optional field for sender icon (URL)
    }
    content: string
    read: boolean
    timestamp: string
}

export const Emails: EmailType[] = [
    {
        id: "1",
        title: "Your Amazon Fresh order has been received",
        sender: {
            name: "Amazon.com",
            email: "order-update@amazon.com",
            icon: "https://logo.clearbit.com/amazon.com",
        },
        content: `Hi Ryan,
Thank you for shopping with us. We're thrilled to have you as our valued customer.
You can add more items until we start packing your order.
Please store your items promptly upon delivery to keep them fresh and delicious.
You won't be disturbed when the delivery is made.`,
        read: false,
        timestamp: "2/25/25",
    },
    {
        id: "2",
        title: "Hey Ryan! Regrello and Twitch are looking for candidates like you!",
        sender: {
            name: "Untapped",
            email: "untapped@untapped.com",
            icon: "https://logo.clearbit.com/untapped.com",
        },
        content: `Feb 24th, 2025

New jobs on Untapped
Not seeing the jobs you're looking for? Search for thousands more`,
        read: false,
        timestamp: "2/24/25",
    },
    {
        id: "3",
        title: "END OF SEASON SALE - 24 HOURS REMAINING",
        sender: {
            name: "Cole Buxton",
            email: "colebuxston@colebuxton.com",
            icon: "https://logo.clearbit.com/colebuxton.com",
        },
        content: `End of Season Sale, Up to 50% off
24 hours remaining`,
        read: true,
        timestamp: "2/22/25",
    },
]
