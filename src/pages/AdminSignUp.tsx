
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminSignUp = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
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
      setError("Only authorized admin emails can create admin accounts");
      setLoading(false);
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      console.log("Starting admin signup process...");
      
      // Sign up with email and password
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin-login`,
          data: {
            display_name: displayName || "Admin",
            role: 'admin'
          }
        }
      });

      if (signUpError) {
        console.error("Admin sign up error:", signUpError);
        setError(signUpError.message || "Sign up failed. Please try again.");
        setLoading(false);
        return;
      }

      console.log("User created successfully:", data.user?.id);

      // Create admin profile if user was created
      if (data.user) {
        console.log("Creating admin profile...");
        
        // Wait a moment for the user to be fully created
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .upsert([{
            id: data.user.id,
            email: email,
            display_name: displayName || "Admin",
            role: 'admin',
            is_approved: true
          }], {
            onConflict: 'id'
          })
          .select()
          .single();

        if (profileError) {
          console.error("Error creating admin profile:", profileError);
          console.error("Profile error details:", JSON.stringify(profileError, null, 2));
          
          // Try to delete the user account if profile creation failed
          try {
            await supabase.auth.admin.deleteUser(data.user.id);
          } catch (deleteError) {
            console.error("Failed to cleanup user after profile error:", deleteError);
          }
          
          setError(`Failed to set up admin profile: ${profileError.message}`);
          setLoading(false);
          return;
        }

        console.log("Admin profile created successfully:", profileData);
        toast.success("Admin account created successfully! Please check your email to confirm your account.");
        
        // Redirect to admin login after successful signup
        setTimeout(() => {
          navigate('/admin-login');
        }, 2000);
      }
    } catch (error) {
      console.error("Admin signup failed:", error);
      setError("Sign up failed. Please try again.");
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
                Create Admin Account
              </h1>
              <p className="text-neutral-600">
                Set up your HomeMatch admin account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                  className="mt-1"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="email">Admin Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your authorized admin email"
                  required
                  className="mt-1"
                  disabled={loading}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Only admin@mecwebcraft.com and admin@bobbieberry.com are authorized
                </p>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min. 6 characters)"
                  required
                  className="mt-1"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
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
                {loading ? "Creating Account..." : "Create Admin Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-neutral-600">
                Already have an admin account?{" "}
                <a href="/admin-login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
