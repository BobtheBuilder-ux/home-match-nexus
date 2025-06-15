
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminLogin = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    // Check if the email is authorized for admin access
    const authorizedEmails = ['admin@mecwebcraft.com', 'admin@bobbieberry.com'];
    if (!authorizedEmails.includes(email)) {
      setError("Only authorized admin emails can access this portal");
      setLoading(false);
      return;
    }

    try {
      // Sign in with email and password
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        console.error("Admin sign in error:", signInError);
        setError(signInError.message || "Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      // Check if user profile exists and has admin role
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError || !profile) {
          // Create admin profile if it doesn't exist
          const { error: createError } = await supabase
            .from('profiles')
            .insert([{
              id: data.user.id,
              email: email,
              display_name: "Admin",
              role: 'admin',
              is_approved: true
            }]);

          if (createError) {
            console.error("Error creating admin profile:", createError);
            setError("Failed to create admin profile");
            setLoading(false);
            return;
          }
        } else if (profile.role !== 'admin') {
          // Update existing profile to admin role
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: 'admin', is_approved: true })
            .eq('id', data.user.id);

          if (updateError) {
            console.error("Error updating user role:", updateError);
            setError("Failed to update user role");
            setLoading(false);
            return;
          }
        }

        toast.success("Admin login successful!");
        // Navigation will be handled by the useEffect hook
      }
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
                  placeholder="Enter your admin email address"
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
