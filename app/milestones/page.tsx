import { MilestoneBoard, type Milestone } from "@/components/ui/milestones";
import milestoneData from "@/lib/mock-milestones-data.json";

export default function MilestonesPage() {
  const milestones = milestoneData as Milestone[];

  return (
    <div className="container mx-auto px-4 py-8">
      <MilestoneBoard
        milestones={milestones}
        title="Your Big Debt Milestones"
        className="min-h-screen"
      />
    </div>
  );
}
