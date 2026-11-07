import type { Metadata } from "next";
import { OperatorRedemptionView } from "@/components/sponsor";

export const metadata: Metadata = {
  title: "Sponsor Perk Redemption — DeFi Trail",
  description: "Authenticated sponsor operator redemption console.",
};

export default function SponsorOperatorPage() {
  return (
    <main
      style={{
        width: "min(760px, calc(100% - 32px))",
        margin: "0 auto",
        padding: "32px 0",
      }}
    >
      <OperatorRedemptionView />
    </main>
  );
}
