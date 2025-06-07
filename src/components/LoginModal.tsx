import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = "login" | "signup";

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<"client" | "stylist">("client");
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setUserType("client");
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (authMode === "signup" && !name) {
      toast({
        variant: "destructive",
        title: "Missing name",
        description: "Please enter your name to sign up.",
      });
      return;
    }

    setIsLoading(true);

    try {
      let result;
      
      if (authMode === "login") {
        result = await login(email, password);
      } else {
        result = await signup(email, password, name, userType);
      }

      if (result.success) {
        toast({
          title: authMode === "login" ? "Login successful" : "Account created",
          description: authMode === "login" 
            ? "You have been logged in successfully." 
            : "Your account has been created successfully.",
        });
        
        handleClose();

        // Redirect based on user type for beauticians
        if (userType === "stylist") {
          navigate("/beautician");
        }
      } else {
        toast({
          variant: "destructive",
          title: `${authMode === "login" ? "Login" : "Signup"} failed`,
          description: result.error || "Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unexpected error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {authMode === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription>
            {authMode === "login" 
              ? "Sign in to your account to continue."
              : "Create a new account to get started."
            }
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="p-6">
            {authMode === "signup" && (
              <>
                <div className="space-y-4 mb-6">
                  <div className="text-center">
                    <Label className="text-base font-medium">Account Type</Label>
                    <p className="text-sm text-muted-foreground">Choose your account type</p>
                  </div>
                  <Tabs value={userType} onValueChange={(value) => setUserType(value as "client" | "stylist")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="client">Client</TabsTrigger>
                      <TabsTrigger value="stylist">Beautician</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <Separator className="mb-6" />
              </>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  minLength={6}
                />
                {authMode === "signup" && (
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 6 characters long.
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {authMode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {authMode === "login" ? "Don't have an account?" : "Already have an account?"}
                <Button 
                  variant="link" 
                  className="p-0 ml-1" 
                  onClick={switchAuthMode}
                  disabled={isLoading}
                >
                  {authMode === "login" ? "Sign up" : "Sign in"}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
