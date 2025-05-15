import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FileText,
  Layers,
  Settings,
  Palette,
  LogOut,
  ChevronRight,
  PlusCircle,
  Clock,
} from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  count?: number;
  linkTo: string;
}

const DashboardCard = ({
  title,
  description,
  icon,
  count,
  linkTo,
}: DashboardCardProps) => (
  <Card className="bg-white hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
      <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{count || 0}</div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </CardContent>
    <CardFooter>
      <Link to={linkTo} className="w-full">
        <Button variant="outline" className="w-full justify-between">
          Manage
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

interface RecentActivityProps {
  type: string;
  title: string;
  time: string;
  user: string;
}

const RecentActivity = ({
  activities = [],
}: {
  activities?: RecentActivityProps[];
}) => {
  const defaultActivities: RecentActivityProps[] = [
    {
      type: "page",
      title: "Home Page",
      time: "2 hours ago",
      user: "Admin",
    },
    {
      type: "section",
      title: "Hero Banner",
      time: "3 hours ago",
      user: "Editor",
    },
    {
      type: "config",
      title: "Navigation Menu",
      time: "1 day ago",
      user: "Admin",
    },
    {
      type: "theme",
      title: "Dark Theme",
      time: "2 days ago",
      user: "Admin",
    },
  ];

  const displayActivities =
    activities.length > 0 ? activities : defaultActivities;

  return (
    <div className="space-y-4">
      {displayActivities.map((activity, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              {activity.type === "page" && <FileText className="h-4 w-4" />}
              {activity.type === "section" && <Layers className="h-4 w-4" />}
              {activity.type === "config" && <Settings className="h-4 w-4" />}
              {activity.type === "theme" && <Palette className="h-4 w-4" />}
            </div>
            <div>
              <p className="font-medium">{activity.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
                <span>{activity.user}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
};

interface AdminDashboardProps {
  username?: string;
  role?: string;
  stats?: {
    pages?: number;
    sections?: number;
    configs?: number;
    themes?: number;
  };
  activities?: RecentActivityProps[];
}

const AdminDashboard = ({
  username = "Admin",
  role = "Administrator",
  stats = { pages: 5, sections: 12, configs: 4, themes: 2 },
  activities = [],
}: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
            CM
          </div>
          <h1 className="text-xl font-bold">CMS Admin</h1>
        </div>

        <div className="space-y-1">
          <Link to="/admin">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/admin/pages">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Pages
            </Button>
          </Link>
          <Link to="/admin/sections">
            <Button variant="ghost" className="w-full justify-start">
              <Layers className="mr-2 h-4 w-4" />
              Sections
            </Button>
          </Link>
          <Link to="/admin/config">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Configuration
            </Button>
          </Link>
          <Link to="/admin/themes">
            <Button variant="ghost" className="w-full justify-start">
              <Palette className="mr-2 h-4 w-4" />
              Themes
            </Button>
          </Link>
        </div>

        <div className="mt-auto">
          <Separator className="my-4" />
          <div className="flex items-center gap-3 mb-4 p-2">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{username}</p>
              <p className="text-xs text-muted-foreground">{role}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Page
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <DashboardCard
                  title="Pages"
                  description="Total website pages"
                  icon={<FileText className="h-5 w-5" />}
                  count={stats.pages}
                  linkTo="/admin/pages"
                />
                <DashboardCard
                  title="Sections"
                  description="Reusable content blocks"
                  icon={<Layers className="h-5 w-5" />}
                  count={stats.sections}
                  linkTo="/admin/sections"
                />
                <DashboardCard
                  title="Configurations"
                  description="Global site settings"
                  icon={<Settings className="h-5 w-5" />}
                  count={stats.configs}
                  linkTo="/admin/config"
                />
                <DashboardCard
                  title="Themes"
                  description="Visual style options"
                  icon={<Palette className="h-5 w-5" />}
                  count={stats.themes}
                  linkTo="/admin/themes"
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest changes to your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity activities={activities} />
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setActiveTab("activity")}
                  >
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Recent Activity</CardTitle>
                  <CardDescription>
                    Complete history of changes to your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity activities={activities} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
