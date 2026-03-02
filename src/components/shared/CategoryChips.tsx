import { Button } from "@/components/ui/button";
import type { Category } from "@/types";
import { useProductsStore } from "@/store/useProductsStore";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryChipsProps {
  categories: Category[];
}

export function CategoryChips({ categories }: CategoryChipsProps) {
  const categoryId = useProductsStore((s) => s.categoryId);
  const setCategoryId = useProductsStore((s) => s.setCategoryId);

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        <Button
          variant={categoryId === null ? "default" : "outline"}
          size="sm"
          onClick={() => setCategoryId(null)}
          className="rounded-full"
        >
          All
        </Button>
        {categories.map((c) => (
          <Button
            key={c.id}
            variant={categoryId === c.id ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryId(categoryId === c.id ? null : c.id)}
            className="rounded-full"
          >
            {c.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
