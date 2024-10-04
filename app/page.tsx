import Tiptap from "@/components/editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tiptap2 } from "@/components/editor2";
import { Tiptap3 } from "@/components/editor3";

export default function Home() {
  return (
    <div className="prose max-w-none m-10">
      <ScrollArea>
        <Tiptap3 />
      </ScrollArea>
    </div>
  );
}
