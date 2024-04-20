import { Button } from "@/components/ui/button";
import { RssIcon } from "lucide-react";

export async function RSSButton() {
  return (
    <Button variant="outline" className="gap-x-1">
      <RssIcon className="h-5" />
      Subscribe to RSS
    </Button>
  );
}
