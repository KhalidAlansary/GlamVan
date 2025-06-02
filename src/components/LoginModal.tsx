
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

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("client");
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, auto-fill credentials based on user type
    let loginEmail = email;
    let loginPassword = password;
    
    if (userType === "admin" && !email && !password) {
      loginEmail = "admin@example.com";
      loginPassword = "admin123";
    } else if (userType === "beautician" && !email && !password) {
      loginEmail = "beautician@example.com";
      loginPassword = "beauty123";
    }

    try {
      const isLoggedIn = await login(loginEmail, loginPassword);
      if (isLoggedIn) {
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
        });
        onClose();
        
        // Redirect based on user type
        if (userType === "admin") {
          navigate("/admin");
        } else if (userType === "beautician") {
          navigate("/beautician");
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An unexpected error occurred.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="client" onValueChange={setUserType}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="beautician">Beautician</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent value="client">
            <form onSubmit={handleLogin}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input
                    id="client-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client-password">Password</Label>
                  <Input
                    id="client-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Login as Client</Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="beautician">
            <form onSubmit={handleLogin}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="beautician-email">Email</Label>
                  <Input
                    id="beautician-email"
                    placeholder="beautician@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Demo: beautician@example.com / beauty123
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="beautician-password">Password</Label>
                  <Input
                    id="beautician-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Login as Beautician</Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="admin">
            <form onSubmit={handleLogin}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    placeholder="admin@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Demo: admin@example.com / admin123
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Login as Admin</Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
