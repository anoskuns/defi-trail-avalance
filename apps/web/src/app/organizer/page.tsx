import type { Metadata } from "next";
import { OrganizerWorkspace } from "@/components/organizer";

export const metadata: Metadata = {
  title: "Organizer Workspace — DeFi Trail",
  description: "Versioned engagement content authoring for seasons and trails.",
};

export default function OrganizerPage() {
  return <OrganizerWorkspace />;
}
