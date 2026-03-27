import { createBrowserRouter, RouterProvider } from "react-router";
import RootIndex from "@/routes/index";
import MailLayout from "@/routes/mail/layout";
import InboxPage from "@/routes/mail/inbox";
import EmailViewPage from "@/routes/mail/thread";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <RootIndex /> },
      {
        path: "mail",
        element: <MailLayout />,
        children: [
          { path: "inbox", element: <InboxPage /> },
          { path: "inbox/:emailId", element: <EmailViewPage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
