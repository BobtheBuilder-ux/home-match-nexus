import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUserProfile } from "@/services/userService";
import { signInAnonymously } from "firebase/auth";
import { auth } from "@/lib/firebase";

const AdminLogin = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && userProfile) {
      if (userProfile.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, userProfile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email !== "admin@mecwebcraft.com") {
      setError("Only admin@mecwebcraft.com is authorized to access this portal");
      setLoading(false);
      return;
    }

    try {
      // Sign in anonymously first to get a user object
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      // Create admin profile
      await createUserProfile({
        id: user.uid,
        email: email,
        display_name: "Admin",
        role: 'admin',
        is_approved: true
      });

      // Navigation will be handled by the useEffect hook
    } catch (error) {
      console.error("Admin login failed:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <div className="flex items-center justify-center py-16">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">HM</span>
              </div>
              <h1 className="text-2xl font-poppins font-bold text-neutral-900 mb-2">
                Admin Portal
              </h1>
              <p className="text-neutral-600">
                Sign in to your HomeMatch admin account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <Button 
                type="submit"
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-neutral-600">
                Not an admin?{" "}
                <a href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Customer login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
