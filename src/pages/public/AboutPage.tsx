export default function AboutPage() {
  return (
    <div className="container py-12 max-w-3xl space-y-8">
      <h1 className="font-display text-4xl font-bold text-center">About LankaBites</h1>

      <div className="prose prose-neutral max-w-none space-y-4 text-muted-foreground">
        <p className="text-lg">
          Born from a love for authentic Sri Lankan cuisine, LankaBites brings the vibrant flavours of the island
          straight to your table. Our kitchen is fuelled by traditional recipes passed down through generations,
          combined with a modern twist.
        </p>

        <h2 className="font-display text-2xl font-semibold text-foreground">Our Story</h2>
        <p>
          Founded in 2023 in the heart of Colombo, LankaBites started as a small family kitchen with a big dream —
          to share the rich, aromatic flavours of Sri Lanka with everyone. From our signature Chicken Kottu to our
          slow-cooked Lamb Biriyani, every dish is prepared with love and the freshest ingredients.
        </p>

        <h2 className="font-display text-2xl font-semibold text-foreground">What Makes Us Special</h2>
        <ul className="space-y-2">
          <li>🌶️ Authentic recipes from across Sri Lanka</li>
          <li>🥘 Fresh ingredients sourced daily</li>
          <li>👨‍🍳 Experienced chefs with decades of expertise</li>
          <li>🚚 Fast, reliable delivery across Colombo</li>
          <li>💚 Vegetarian and vegan-friendly options</li>
        </ul>

        <h2 className="font-display text-2xl font-semibold text-foreground">Our Mission</h2>
        <p>
          To make authentic Sri Lankan food accessible to everyone, one delicious meal at a time.
          Whether you're craving a quick lunch or planning a family feast, LankaBites has you covered.
        </p>
      </div>
    </div>
  );
}
