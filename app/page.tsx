import Tiptap from "@/components/editor";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="prose max-w-none">
      <ScrollArea>
        <Tiptap />
      </ScrollArea>
    </div>
  );
}
