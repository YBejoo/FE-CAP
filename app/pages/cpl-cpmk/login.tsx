import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth-context";
import { TOKEN_KEY } from "~/lib/api";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function Login() {
  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError("Email dan password harus diisi");
      return;
    }

    try {
      console.log("Login: Starting login process...");
      const user = await login(email, password);
      console.log("Login: Login successful, user:", user);
      
      // Verify token is actually saved
      const savedToken = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
      console.log("Login: Token verified in localStorage:", !!savedToken);
      console.log("Login: All localStorage keys:", typeof window !== 'undefined' ? Object.keys(localStorage) : []);
      
      if (!savedToken) {
        setLocalError("Token tidak tersimpan dengan benar. Silakan coba lagi.");
        return;
      }
      
      // Wait for auth context to fully update and localStorage to be stable
      console.log("Login: Waiting for state to stabilize...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log("Login: Navigating to dashboard...");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setLocalError(err instanceof Error ? err.message : "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">SI-CAP</CardTitle>
          <CardDescription className="text-base">
            Sistem Informasi Capaian Pembelajaran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {(localError || error) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {localError || error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                className="h-11"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
