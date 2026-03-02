import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProductsStore } from "@/store/useProductsStore";
import { CategoryChips } from "@/components/shared/CategoryChips";
import { SearchBar } from "@/components/shared/SearchBar";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const { categories, products, status, loadCatalog } = useProductsStore();

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const popularProducts = products.filter((p) => p.tags.includes("popular")).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/30 py-16 md:py-24">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Authentic Sri Lankan
            <br />
            <span className="text-primary">Flavours</span> Delivered
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            From sizzling kottu to fragrant biriyani — taste the best of Lanka, right at your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link to="/menu">
                Order Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search + Categories */}
      <section className="container py-8 space-y-4">
        <div className="max-w-md mx-auto">
          <SearchBar />
        </div>
        <CategoryChips categories={categories} />
      </section>

      {/* Popular Items */}
      <section className="container pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">Popular Dishes</h2>
          <Button asChild variant="link" className="text-primary">
            <Link to="/menu">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <ProductGrid products={popularProducts} loading={status === "loading"} />
      </section>
    </div>
  );
}
