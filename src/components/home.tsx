import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  FileText,
  Settings,
  Palette,
  LayoutGrid,
} from "lucide-react";
import AdminDashboard from "./admin/AdminDashboard";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication check
    if (username === "Admin" && password === "password") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            File-Based CMS
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to access the admin panel
          </p>
        </div>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-gray-500 dark:text-gray-400">
            Default credentials: Admin / password
          </CardFooter>
        </Card>

        <div className="mt-8">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="structure">File Structure</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>CMS Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Page Management</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Create, edit, and organize website pages with custom
                        sections
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <LayoutGrid className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Section Management</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Build reusable content sections with customizable fields
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Settings className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Global Configuration</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage header, footer, navigation, and SEO settings
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Palette className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Theme Management</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Customize colors, typography, and styling across the
                        site
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="structure" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>File Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-xs">
                    {`/site-data
├── pages/
│   └── home.json, about.json, etc.
├── sections/
│   └── hero.json, testimonials.json, etc.
├── config/
│   ├── header.json
│   ├── footer.json
│   ├── navigation.json
│   └── seo.json
└── themes/
    └── light.json, dark.json, etc.`}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="about" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>About This CMS</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This file-based CMS provides a modern approach to content
                    management without requiring a traditional database. All
                    content is stored in JSON files, making it easy to version
                    control and deploy. The admin panel allows authorized users
                    to manage website content through an intuitive interface.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;
