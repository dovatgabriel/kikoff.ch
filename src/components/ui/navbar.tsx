import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import logo from '@/images/logo.png';
import { cn } from '@/lib/utils';
import {
  ChevronRight,
  Dumbbell,
  Flame,
  Footprints,
  Percent,
  Shirt,
  ShoppingCart,
} from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavbarProps {
  transparent?: boolean;
}

const categories = [
  {
    key: 'footwear',
    label: 'Chaussures',
    icon: <Footprints className="h-4 w-4" />,
    highlight: {
      title: 'Nouveaux crampons',
      subtitle: 'Grip pro, tige Flyknit',
      image:
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop',
      to: '/c/footwear/new',
      badge: 'Nouveau',
    },
    links: [
      { title: 'Football', to: '/c/footwear/football' },
      { title: 'Running', to: '/c/footwear/running' },
      { title: 'Basketball', to: '/c/footwear/basketball' },
      { title: 'Randonnée', to: '/c/footwear/hiking' },
      { title: 'Lifestyle', to: '/c/footwear/lifestyle' },
    ],
  },
  {
    key: 'apparel',
    label: 'Textile',
    icon: <Shirt className="h-4 w-4" />,
    highlight: {
      title: 'Collection été',
      subtitle: 'T-shirts respirants & shorts',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      to: '/c/apparel/summer',
      badge: '-20%',
    },
    links: [
      { title: "Maillots d'équipe", to: '/c/apparel/teams' },
      { title: 'Compression', to: '/c/apparel/compression' },
      { title: 'Vestes & sweats', to: '/c/apparel/outerwear' },
      { title: 'Pantalons', to: '/c/apparel/pants' },
      { title: 'Accessoires', to: '/c/apparel/accessories' },
    ],
  },
  {
    key: 'equipment',
    label: 'Équipement',
    icon: <Dumbbell className="h-4 w-4" />,
    highlight: {
      title: 'Home Gym Essentials',
      subtitle: 'Haltères réglables & tapis',
      image:
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
      to: '/c/equipment/home-gym',
      badge: 'Populaire',
    },
    links: [
      { title: 'Ballons', to: '/c/equipment/balls' },
      { title: 'Gants & protections', to: '/c/equipment/protection' },
      { title: 'Sacs de sport', to: '/c/equipment/bags' },
      { title: 'Cardio', to: '/c/equipment/cardio' },
      { title: 'Yoga & mobilité', to: '/c/equipment/yoga' },
    ],
  },
  {
    key: 'deals',
    label: 'Promos',
    icon: <Percent className="h-4 w-4" />,
    highlight: {
      title: '🔥 Destockage',
      subtitle: "Jusqu'à -60% sur 500+ articles",
      image:
        'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
      to: '/deals',
      badge: 'HOT',
    },
    links: [
      { title: 'Dernière chance', to: '/deals/last-call' },
      { title: 'Packs', to: '/deals/bundles' },
      { title: 'Meilleurs prix', to: '/deals/best-prices' },
      { title: 'Outlet', to: '/deals/outlet' },
    ],
  },
];

const HighlightCard: FC<{
  title: string;
  subtitle: string;
  image: string;
  to: string;
  badge?: string | null;
}> = ({ title, subtitle, image, to, badge }) => {
  return (
    <Link to={to} className="group relative overflow-hidden rounded-2xl shadow-sm">
      <img
        src={image}
        alt="highlight"
        className="h-48 mb-4 w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
      />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div>
          <div className="text-white font-semibold leading-tight">{title}</div>
          <div className="text-white/80 text-xs">{subtitle}</div>
        </div>
        {badge ? <Badge className="bg-white text-black hover:bg-white/90">{badge}</Badge> : null}
      </div>
    </Link>
  );
};

const LinkItem: FC<{ title: string; to: string }> = ({ title, to }) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        to={to}
        className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="text-sm font-medium flex items-center gap-1">
          {title}
          <ChevronRight className="h-3 w-3" />
        </div>
      </Link>
    </NavigationMenuLink>
  </li>
);

const Navbar: FC<NavbarProps> = ({ transparent = true }) => {
  return (
    <div
      className={cn(
        'fixed top-0 z-50 w-full py-5',
        transparent ? 'bg-transparent text-white' : 'bg-card shadow text-foreground',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <motion.img
            src={logo}
            alt="logo"
            className="w-auto"
            animate={{
              height: transparent ? 48 : 32,
            }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
            }}
          />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {categories.map((cat) => (
              <NavigationMenuItem key={cat.key}>
                <NavigationMenuTrigger className="gap-2">
                  <span className="mr-1 inline-flex items-center gap-2">
                    {cat.icon}
                    {cat.label}
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[680px] grid-cols-5 gap-4 p-4 md:w-[760px]">
                    <div className="col-span-3 space-y-4">
                      <HighlightCard
                        title={cat.highlight.title}
                        subtitle={cat.highlight.subtitle}
                        image={cat.highlight.image}
                        to={cat.highlight.to}
                        badge={cat.highlight.badge}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        {cat.links.slice(0, 4).map((l) => (
                          <Link
                            to={l.to}
                            key={l.to}
                            className="group overflow-hidden rounded-xl border"
                          >
                            <div className="flex items-center justify-between p-3">
                              <div className="text-sm font-medium group-hover:underline">
                                {l.title}
                              </div>
                              <ChevronRight className="h-4 w-4 opacity-60 transition group-hover:translate-x-0.5" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="rounded-2xl border p-3">
                        <div className="mb-2 text-xs uppercase text-muted-foreground">
                          Catégories
                        </div>
                        <ul className="grid gap-1">
                          {cat.links.map((l) => (
                            <LinkItem key={l.to} title={l.title} to={l.to} />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/help">Aide</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/cart" aria-label="Panier">
              <ShoppingCart size={30} />
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                3
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
