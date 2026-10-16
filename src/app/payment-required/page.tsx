export const metadata = {
  title: "Access Temporarily Restricted | R-SPLM/F Campaign",
  description: "This website is temporarily restricted pending payment. Please complete payment to regain access.",
  robots: "noindex, nofollow",
};

import PaymentRequiredClient from "./payment-required-client";

export default function PaymentRequiredPage() {
  return <PaymentRequiredClient />;
}
