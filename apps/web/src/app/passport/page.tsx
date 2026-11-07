import type { Metadata } from "next";
import { PassportClient } from "@/features/gameplay/passport/PassportClient";

export const metadata: Metadata = {
  title: "Trail Passport — DeFi Trail",
  description: "Review confirmed gameplay stamps, badge progress, and the next exploration goal.",
};

export default function PassportPage() {
  return <PassportClient />;
}

