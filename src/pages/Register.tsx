// File: src/pages/Register.tsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService"; // Corrected Path
import { UserPlus, Mail, Lock, Sparkles, Loader2 } from "lucide-react";

// Use the '@/' path alias for your UI library components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validateForm()) return;

    setIsLoading(true);
    authService.register(formData.email, formData.password)
      .then(() => {
        // On success, redirect to the login page with a success message
        navigate('/login', { state: { message: "Registration successful! Please log in." } });
      })
      .catch((error: any) => {
        const resMessage = error.response?.data?.message || "Registration failed. Please try again.";
        setServerError(resMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg particles px-4 relative overflow-hidden">
      <Card className="w-full max-w-md gradient-card animate-scale-in border-primary/20 shadow-2xl animate-glow relative z-10">
        <CardHeader className="text-center space-y-4 animate-fade-in">
          <div className="mx-auto h-16 w-16 rounded-xl bg-gradient-to-r from-primary to-primary-hover flex items-center justify-center mb-4 animate-float shadow-lg">
            <UserPlus className="text-primary-foreground h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            Create an Account
          </CardTitle>
          <CardDescription className="text-base">
            Join us and start your premium shopping experience
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2 animate-slide-up-delay-1">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
                <Input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} className={`pl-10 ${errors.email ? "border-destructive" : ""}`} disabled={isLoading} />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2 animate-slide-up-delay-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
                <Input id="password" name="password" type="password" placeholder="Create a password" value={formData.password} onChange={handleInputChange} className={`pl-10 ${errors.password ? "border-destructive" : ""}`} disabled={isLoading} />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>
            
            {/* Confirm Password Field */}
            <div className="space-y-2 animate-slide-up-delay-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleInputChange} className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`} disabled={isLoading} />
              </div>
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
            </div>

            {serverError && <p className="text-sm text-center text-destructive animate-slide-up">{serverError}</p>}

            {/* Submit Button */}
            <Button type="submit" className="w-full button-hover bg-gradient-to-r from-primary to-primary-hover text-primary-foreground font-semibold py-3" disabled={isLoading}>
              {isLoading ? (<><Loader2 className="animate-spin h-4 w-4 mr-2" /> Creating Account...</>) : ("Sign Up")}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.7s' }}>
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-primary-hover font-semibold transition-all duration-300 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;