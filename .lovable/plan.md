

# LankaBites — Phase 1: Core Structure + Public Ordering App

## 1. Project Foundation
- Set up folder structure: `app/`, `pages/`, `components/`, `store/`, `api/`, `types/`, `lib/`
- Define all TypeScript types in `src/types/index.ts` (Category, Product, Addon, CartItem, Order, etc.)
- Remove React Query dependency; install Zustand and @tanstack/react-table
- Update `index.css` with warm food-themed color palette (warm oranges, earthy tones, cream backgrounds)

## 2. Mock API Layer
- **mockDb.ts**: In-memory seed data with realistic Sri Lankan menu (Mix Rice, Chicken Kottu, Egg Kottu, Cheese Kottu, Chicken Fried Rice, Lamb Biriyani, drinks like Faluda, etc.) across categories (Rice, Kottu, Fried Rice, Biriyani, Drinks, Desserts)
- **client.ts**: `mockFetch()` wrapper with configurable latency (200-800ms) and random failure rate
- **productsApi.ts**: `listProducts`, `getProduct`, `listCategories`, `listAddons`
- **ordersApi.ts**: `createOrder`, `getOrder` with localStorage persistence
- **adminApi.ts**: `login`, `logout` (stub for Phase 2)

## 3. Zustand Stores
- **useProductsStore**: categories, products, addons, filters (category, search, vegOnly, spicyLevel, sort), `loadCatalog()` with caching
- **useCartStore**: cart items, orderType, promoCode, customerDraft; localStorage persistence; add/remove/update actions
- **useOrdersStore**: `placeOrder()`, `loadOrder(id)` with status tracking
- **useAdminAuthStore**: token + login/logout with localStorage persistence (used in Phase 2)
- **useUIStore**: toast queue, modal/drawer states, mobile cart bar visibility

## 4. Router & Layouts
- **router.tsx**: Public routes (`/`, `/menu`, `/menu/:id`, `/cart`, `/checkout`, `/order/:id`, `/about`, `/contact`) + admin route stubs
- **PublicLayout.tsx**: Navbar with LankaBites branding, footer, and StickyMobileCartBar
- **AuthLayout.tsx** and **AdminLayout.tsx**: Placeholder for Phase 2
- **ProtectedRoute**: Redirect to `/admin/login` if no auth token

## 5. Public Pages

### Home (`/`)
- Hero section with food imagery background, tagline, and "Order Now" CTA
- Scrollable category chips for quick filtering
- "Popular Items" grid (top 6 products tagged "popular")
- Search bar

### Menu (`/menu`)
- Filter sidebar/panel: category pills, veg-only toggle, spicy level selector, sort dropdown
- Responsive product grid with skeleton loading
- "Quick View" modal showing product details + add-to-cart

### Product Detail (`/menu/:id`)
- Product image, name, description, price
- Spice level selector (mild/medium/hot radio buttons)
- Add-on checkboxes with prices
- Quantity stepper + optional note field
- "Add to Cart" button
- Related items carousel

### Cart (`/cart`)
- Cart item list with quantity controls, spice/addon summary, remove button
- Delivery vs. Pickup toggle
- Order summary: subtotal, delivery fee, discount, total (LKR formatting)
- "Proceed to Checkout" button
- Empty cart state illustration

### Checkout (`/checkout`)
- Multi-step stepper: Customer Details → Address (delivery only) → Scheduled Time → Payment Method → Review
- Form validation with react-hook-form + zod
- "Place Order" submits to mock API, clears cart, redirects to confirmation

### Order Confirmation (`/order/:id`)
- Order summary card
- Status timeline component with step icons (Pending → Accepted → Preparing → Ready → Delivered)
- Estimated delivery/pickup time

### About & Contact
- Simple informational pages with LankaBites story and contact form

## 6. Shared Components
- **Navbar**: Logo, nav links, cart icon with badge count
- **Footer**: Links, social icons, copyright
- **ProductCard**: Image, name, price, veg badge, spicy indicator, "Add" button
- **CategoryChips**: Horizontal scrollable filter pills
- **SearchBar**: Debounced search input
- **CartDrawer**: Slide-over cart summary accessible from navbar
- **StickyMobileCartBar**: Fixed bottom bar showing item count + total, visible on mobile when cart has items
- **OrderStatusTimeline**: Vertical timeline with status icons
- **Skeleton components**: For product grid, cart, order detail
- **EmptyState**: Reusable illustration + message + action button

## 7. UX Quality
- Loading skeletons on every data-fetching view
- Error banners with "Retry" buttons on API failures
- Empty states for no search results, empty cart, no orders
- Fully responsive: mobile-first layouts, collapsible filters, horizontally scrollable tables
- Accessibility: form labels, aria-labels on icon buttons, focus management
- Currency formatted as "LKR 1,250.00" throughout

