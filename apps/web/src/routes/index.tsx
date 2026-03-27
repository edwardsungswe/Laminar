import { Navigate } from "react-router";

export default function RootIndex() {
  return <Navigate to="/mail/inbox" replace />;
}
