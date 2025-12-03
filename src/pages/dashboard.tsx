import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, type User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { auth } from '@/firebase.config';

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async (e: React.FormEvent) => {
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
      <main className="flex flex-1 items-center justify-center">
        <p className="text-2xl font-semibold">Hello admin</p>
      </main>
    </div>
  );
};
