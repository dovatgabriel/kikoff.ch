import { useEffect, useState, type FormEvent } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, type User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase.config';
import { useProducts } from '@/data/useProducts';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus } from 'lucide-react';
import type { ProductCategory } from '@/types/product';

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sizesInput, setSizesInput] = useState('');

  const [colorInputs, setColorInputs] = useState<{ name: string; value: string }[]>([
    { name: '', value: '' },
  ]);
  const [imageInputs, setImageInputs] = useState<string[]>(['']);

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { products, addProduct, deleteProduct, loading: loadingProducts } = useProducts();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoadingLogin(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError((err as { message: string })?.message ?? 'Erreur lors de la connexion');
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setCategory('');
    setSizesInput('');
    setColorInputs([{ name: '', value: '' }]);
    setImageInputs(['']);
    setCreateError(null);
  };

  const handleCreateProduct = async (e: FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    setCreating(true);

    try {
      const parsedPrice = Number(price);
      if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
        setCreateError('Le prix doit être un nombre positif');
        setCreating(false);
        return;
      }

      const sizes = sizesInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const colors = colorInputs
        .map((c) => ({
          name: c.name.trim(),
          value: c.value.trim(),
        }))
        .filter((c) => c.name && c.value);

      const images = imageInputs.map((i) => i.trim()).filter(Boolean);

      await addProduct({
        name,
        price: parsedPrice,
        description,
        category: (category || undefined) as ProductCategory,
        sizes,
        colors,
        images,
      });

      resetForm();
      setIsDialogOpen(false);
    } catch (err) {
      setCreateError(
        (err as { message?: string }).message ??
          'Une erreur est survenue lors de la création du produit',
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
    } catch (e) {
      console.error('Error deleting product', e);
    }
  };

  const handleColorChange = (index: number, field: 'name' | 'value', value: string) => {
    setColorInputs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addColorField = () => {
    setColorInputs((prev) => [...prev, { name: '', value: '' }]);
  };

  const handleImageChange = (index: number, value: string) => {
    setImageInputs((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addImageField = () => {
    setImageInputs((prev) => [...prev, '']);
  };

  if (initializing) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground text-sm">Chargement…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-background flex min-h-[80vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Connexion admin</CardTitle>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="mt-5 flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={loadingLogin}>
                {loadingLogin ? 'Connexion…' : 'Se connecter'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-[80dvh] flex-col">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-lg font-semibold">Dashboard Kikoff</h1>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-sm">{user.email}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Produits</h2>
            <p className="text-muted-foreground text-sm">
              Gérez les produits affichés sur la boutique.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau produit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Créer un produit</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateProduct} className="space-y-4 pt-2">
                {createError && (
                  <Alert variant="destructive">
                    <AlertDescription>{createError}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (CHF)</Label>
                    <Input
                      id="price"
                      type="number"
                      min={0}
                      step="0.05"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Input
                      id="category"
                      placeholder="men, women, unisex…"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sizes">Tailles</Label>
                  <Input
                    id="sizes"
                    placeholder="XS,S,M,L,XL"
                    value={sizesInput}
                    onChange={(e) => setSizesInput(e.target.value)}
                  />
                  <p className="text-muted-foreground text-[11px]">Séparées par des virgules.</p>
                </div>

                <div className="space-y-2">
                  <Label>Couleurs</Label>
                  <div className="space-y-2">
                    {colorInputs.map((c, index) => (
                      <div key={index} className="grid gap-2 md:grid-cols-2">
                        <Input
                          placeholder="Nom couleur (Noir, Beige…)"
                          value={c.name}
                          onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                        />
                        <Input
                          placeholder="#000000"
                          value={c.value}
                          onChange={(e) => handleColorChange(index, 'value', e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-1"
                    onClick={addColorField}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Ajouter une couleur
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Images (URL)</Label>
                  <div className="space-y-2">
                    {imageInputs.map((img, index) => (
                      <Input
                        key={index}
                        placeholder={`Image ${index + 1}`}
                        value={img}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                      />
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-1"
                    onClick={addImageField}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Ajouter une image
                  </Button>
                </div>

                <DialogFooter className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(false);
                    }}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={creating}>
                    {creating ? 'Création…' : 'Créer'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-base">Liste des produits</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingProducts ? (
              <div className="text-muted-foreground py-10 text-center text-sm">
                Chargement des produits…
              </div>
            ) : !products || products.length === 0 ? (
              <div className="text-muted-foreground py-10 text-center text-sm">
                Aucun produit pour le moment.
              </div>
            ) : (
              <ScrollArea className="max-h-[60vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Tailles</TableHead>
                      <TableHead>Couleurs</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="flex items-center gap-3">
                          {product.images?.[0] && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium">{product.name}</div>
                            {product.description && (
                              <div className="text-muted-foreground line-clamp-1 text-xs">
                                {product.description}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {typeof product.price === 'number'
                            ? `${product.price.toFixed(2)} CHF`
                            : '—'}
                        </TableCell>
                        <TableCell>
                          {product.category ? (
                            <Badge variant="outline">{product.category}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-xs">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {product.sizes?.map((size: string) => (
                              <Badge key={size} variant="secondary" className="text-[11px]">
                                {size}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {product.colors?.map((c: { name: string; value: string }) => (
                              <div
                                key={`${c.name}-${c.value}`}
                                className="flex items-center gap-1 rounded-full border px-2 py-0.5"
                              >
                                <span
                                  className="h-3 w-3 rounded-full border"
                                  style={{ backgroundColor: c.value }}
                                />
                                <span className="text-[11px]">{c.name}</span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteProduct(String(product.id))}
                          >
                            <Trash2 className="text-destructive h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
