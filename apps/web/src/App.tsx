import { createBrowserRouter, RouterProvider } from "react-router";
import RootIndex from "@/routes/index";
import MailLayout from "@/routes/mail/layout";
import InboxPage from "@/routes/mail/inbox";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <RootIndex /> },
      {
        path: "mail",
        element: <MailLayout />,
        children: [{ path: "inbox", element: <InboxPage /> }],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
