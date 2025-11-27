import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Header } from '@/components/header';
import { SizeFilter } from '@/components/filters/size-filter';
import { AvailabilityFilter } from '@/components/filters/availability-filter';
import { CollapsibleFilter } from '@/components/filters/collapsible-filter';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/data/products';

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2X'];
const QUICK_CATEGORIES = [
  'NOUVEAU',
  'T-SHIRTS SPORT',
  'SHORTS SPORT',
  'VESTES SPORT',
  'PANTALONS SPORT',
  'MEILLEURES VENTES',
  'TENUES COMPLÈTES',
  'ACCESSOIRES',
  'CHAUSSURES SPORT',
  'SURVÊTEMENTS',
];

export const Products = () => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'men' | 'women' | 'kids' | null>(null);
  const [selectedQuickCategory, setSelectedQuickCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSizes.some((size) => p.sizes.includes(size))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by quick category (for now, just reset category filter)
    // In a real app, this would filter by product type/tags

    // Filter by availability (mock - all products are in stock for now)
    if (inStock && !outOfStock) {
      // Show only in stock
    } else if (outOfStock && !inStock) {
      // Show only out of stock (empty for now)
      filtered = [];
    }

    return filtered;
  }, [selectedSizes, inStock, outOfStock, searchQuery, selectedCategory, selectedQuickCategory]);

  const inStockCount = products.length; // Mock count
  const outOfStockCount = 0; // Mock count

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-24">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-6">
            <nav className="mb-4 text-sm text-gray-600">
              <Link to="/" className="hover:text-black">
                Accueil
              </Link>
              <span className="mx-2">/</span>
              <span className="text-black">Produits</span>
            </nav>
            <h1 className="text-4xl font-bold uppercase">Produits</h1>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="rounded-lg bg-white p-6">
                <h2 className="mb-6 text-lg font-semibold">Filtres</h2>

                <SizeFilter
                  sizes={ALL_SIZES}
                  selectedSizes={selectedSizes}
                  onSizeToggle={handleSizeToggle}
                />

                <AvailabilityFilter
                  inStock={inStock}
                  outOfStock={outOfStock}
                  inStockCount={inStockCount}
                  outOfStockCount={outOfStockCount}
                  onInStockToggle={() => setInStock(!inStock)}
                  onOutOfStockToggle={() => setOutOfStock(!outOfStock)}
                />

                <CollapsibleFilter title="Catégorie">
                  <div className="space-y-2">
                    {[
                      { value: 'men' as const, label: 'Homme' },
                      { value: 'women' as const, label: 'Femme' },
                      { value: 'kids' as const, label: 'Enfant' },
                    ].map((cat) => (
                      <label key={cat.value} className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat.value}
                          onChange={() =>
                            setSelectedCategory(selectedCategory === cat.value ? null : cat.value)
                          }
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <span className="text-sm">{cat.label}</span>
                      </label>
                    ))}
                  </div>
                </CollapsibleFilter>

                <CollapsibleFilter title="Couleurs">
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      new Set(products.flatMap((p) => p.colors.map((c) => c.value)))
                    ).map((colorValue) => {
                      const color = products
                        .flatMap((p) => p.colors)
                        .find((c) => c.value === colorValue);
                      return (
                        <button
                          key={colorValue}
                          className="h-8 w-8 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: colorValue }}
                          title={color?.name}
                        />
                      );
                    })}
                  </div>
                </CollapsibleFilter>

                <CollapsibleFilter title="Gamme de prix">
                  <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span className="text-sm">€0 - €50</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span className="text-sm">€50 - €100</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span className="text-sm">€100 - €150</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span className="text-sm">€150+</span>
                    </label>
                  </div>
                </CollapsibleFilter>

                <CollapsibleFilter title="Collections">
                  <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span className="text-sm">Running</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span className="text-sm">Fitness</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span className="text-sm">Football</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span className="text-sm">Basketball</span>
                    </label>
                  </div>
                </CollapsibleFilter>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              {/* Quick Category Links */}
              <div className="mb-6 flex flex-wrap gap-2">
                {QUICK_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedQuickCategory(selectedQuickCategory === category ? null : category);
                      setSelectedCategory(null); // Reset category filter when using quick category
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selectedQuickCategory === category
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-gray-500">Aucun produit trouvé</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

