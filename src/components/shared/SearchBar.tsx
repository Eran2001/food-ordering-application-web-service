import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProductsStore } from "@/store/useProductsStore";
import { useRef, useEffect, useState } from "react";

export function SearchBar() {
  const setSearch = useProductsStore((s) => s.setSearch);
  const search = useProductsStore((s) => s.search);
  const [value, setValue] = useState(search);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timer.current = setTimeout(() => setSearch(value), 300);
    return () => clearTimeout(timer.current);
  }, [value, setSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search dishes..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9 pr-9"
        aria-label="Search menu"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          onClick={() => { setValue(""); setSearch(""); }}
          aria-label="Clear search"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
