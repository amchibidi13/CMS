import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Trash2,
  Save,
  Eye,
  Code,
  Link,
  Image,
  Globe,
  Search,
  FileCode,
  Settings,
} from "lucide-react";

interface ConfigManagerProps {
  onSave?: (configType: string, data: any) => void;
  initialData?: {
    header?: HeaderConfig;
    footer?: FooterConfig;
    navigation?: NavigationConfig;
    seo?: SEOConfig;
    scripts?: ScriptConfig;
  };
}

interface HeaderConfig {
  logo: string;
  favicon: string;
  isSticky: boolean;
}

interface FooterConfig {
  copyright: string;
  socialLinks: SocialLink[];
  columns: FooterColumn[];
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface FooterColumn {
  id: string;
  title: string;
  links: { id: string; text: string; url: string }[];
}

interface NavigationConfig {
  items: NavItem[];
}

interface NavItem {
  id: string;
  text: string;
  url: string;
  children?: NavItem[];
}

interface SEOConfig {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  ogImage: string;
  twitterHandle: string;
  enableSitemap: boolean;
  enableRobots: boolean;
}

interface ScriptConfig {
  headScripts: Script[];
  bodyScripts: Script[];
}

interface Script {
  id: string;
  name: string;
  content: string;
  isEnabled: boolean;
}

const ConfigManager: React.FC<ConfigManagerProps> = ({
  onSave,
  initialData = {},
}) => {
  // Default values for each configuration type
  const defaultHeader: HeaderConfig = {
    logo: "/logo.svg",
    favicon: "/favicon.ico",
    isSticky: true,
  };

  const defaultFooter: FooterConfig = {
    copyright: `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
    socialLinks: [
      {
        id: "1",
        platform: "Twitter",
        url: "https://twitter.com",
        icon: "twitter",
      },
      {
        id: "2",
        platform: "Facebook",
        url: "https://facebook.com",
        icon: "facebook",
      },
      {
        id: "3",
        platform: "Instagram",
        url: "https://instagram.com",
        icon: "instagram",
      },
    ],
    columns: [
      {
        id: "1",
        title: "Company",
        links: [
          { id: "1", text: "About", url: "/about" },
          { id: "2", text: "Contact", url: "/contact" },
        ],
      },
      {
        id: "2",
        title: "Resources",
        links: [
          { id: "1", text: "Blog", url: "/blog" },
          { id: "2", text: "Documentation", url: "/docs" },
        ],
      },
    ],
  };

  const defaultNavigation: NavigationConfig = {
    items: [
      { id: "1", text: "Home", url: "/" },
      { id: "2", text: "About", url: "/about" },
      { id: "3", text: "Services", url: "/services" },
      { id: "4", text: "Contact", url: "/contact" },
    ],
  };

  const defaultSEO: SEOConfig = {
    defaultTitle: "Your Website",
    defaultDescription: "Your website description goes here",
    defaultKeywords: "website, cms, content management",
    ogImage: "/og-image.jpg",
    twitterHandle: "@yourhandle",
    enableSitemap: true,
    enableRobots: true,
  };

  const defaultScripts: ScriptConfig = {
    headScripts: [
      {
        id: "1",
        name: "Google Analytics",
        content: "<!-- Google Analytics code -->",
        isEnabled: true,
      },
    ],
    bodyScripts: [
      {
        id: "1",
        name: "Chat Widget",
        content: "<!-- Chat widget code -->",
        isEnabled: false,
      },
    ],
  };

  // State for each configuration type
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>(
    initialData.header || defaultHeader,
  );
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(
    initialData.footer || defaultFooter,
  );
  const [navigationConfig, setNavigationConfig] = useState<NavigationConfig>(
    initialData.navigation || defaultNavigation,
  );
  const [seoConfig, setSeoConfig] = useState<SEOConfig>(
    initialData.seo || defaultSEO,
  );
  const [scriptConfig, setScriptConfig] = useState<ScriptConfig>(
    initialData.scripts || defaultScripts,
  );
  const [activeTab, setActiveTab] = useState("header");
  const [showPreview, setShowPreview] = useState(false);

  // Save handlers for each configuration type
  const saveHeaderConfig = () => {
    onSave?.("header", headerConfig);
  };

  const saveFooterConfig = () => {
    onSave?.("footer", footerConfig);
  };

  const saveNavigationConfig = () => {
    onSave?.("navigation", navigationConfig);
  };

  const saveSEOConfig = () => {
    onSave?.("seo", seoConfig);
  };

  const saveScriptConfig = () => {
    onSave?.("scripts", scriptConfig);
  };

  // Helper functions for managing arrays in configs
  const addNavItem = () => {
    const newItem = { id: Date.now().toString(), text: "New Item", url: "/" };
    setNavigationConfig({
      ...navigationConfig,
      items: [...navigationConfig.items, newItem],
    });
  };

  const removeNavItem = (id: string) => {
    setNavigationConfig({
      ...navigationConfig,
      items: navigationConfig.items.filter((item) => item.id !== id),
    });
  };

  const addSocialLink = () => {
    const newLink = {
      id: Date.now().toString(),
      platform: "New Platform",
      url: "https://",
      icon: "link",
    };
    setFooterConfig({
      ...footerConfig,
      socialLinks: [...footerConfig.socialLinks, newLink],
    });
  };

  const removeSocialLink = (id: string) => {
    setFooterConfig({
      ...footerConfig,
      socialLinks: footerConfig.socialLinks.filter((link) => link.id !== id),
    });
  };

  const addFooterColumn = () => {
    const newColumn = {
      id: Date.now().toString(),
      title: "New Column",
      links: [],
    };
    setFooterConfig({
      ...footerConfig,
      columns: [...footerConfig.columns, newColumn],
    });
  };

  const removeFooterColumn = (id: string) => {
    setFooterConfig({
      ...footerConfig,
      columns: footerConfig.columns.filter((column) => column.id !== id),
    });
  };

  const addFooterLink = (columnId: string) => {
    const newLink = { id: Date.now().toString(), text: "New Link", url: "/" };
    setFooterConfig({
      ...footerConfig,
      columns: footerConfig.columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            links: [...column.links, newLink],
          };
        }
        return column;
      }),
    });
  };

  const removeFooterLink = (columnId: string, linkId: string) => {
    setFooterConfig({
      ...footerConfig,
      columns: footerConfig.columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            links: column.links.filter((link) => link.id !== linkId),
          };
        }
        return column;
      }),
    });
  };

  const addScript = (location: "head" | "body") => {
    const newScript = {
      id: Date.now().toString(),
      name: "New Script",
      content: "<!-- Script content -->",
      isEnabled: true,
    };
    if (location === "head") {
      setScriptConfig({
        ...scriptConfig,
        headScripts: [...scriptConfig.headScripts, newScript],
      });
    } else {
      setScriptConfig({
        ...scriptConfig,
        bodyScripts: [...scriptConfig.bodyScripts, newScript],
      });
    }
  };

  const removeScript = (location: "head" | "body", id: string) => {
    if (location === "head") {
      setScriptConfig({
        ...scriptConfig,
        headScripts: scriptConfig.headScripts.filter(
          (script) => script.id !== id,
        ),
      });
    } else {
      setScriptConfig({
        ...scriptConfig,
        bodyScripts: scriptConfig.bodyScripts.filter(
          (script) => script.id !== id,
        ),
      });
    }
  };

  const toggleScriptEnabled = (location: "head" | "body", id: string) => {
    if (location === "head") {
      setScriptConfig({
        ...scriptConfig,
        headScripts: scriptConfig.headScripts.map((script) => {
          if (script.id === id) {
            return { ...script, isEnabled: !script.isEnabled };
          }
          return script;
        }),
      });
    } else {
      setScriptConfig({
        ...scriptConfig,
        bodyScripts: scriptConfig.bodyScripts.map((script) => {
          if (script.id === id) {
            return { ...script, isEnabled: !script.isEnabled };
          }
          return script;
        }),
      });
    }
  };

  return (
    <div className="bg-background p-6 rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Global Configuration</h1>
          <p className="text-muted-foreground">
            Manage site-wide settings and configurations
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="header" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" /> Header
          </TabsTrigger>
          <TabsTrigger value="footer" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" /> Footer
          </TabsTrigger>
          <TabsTrigger value="navigation" className="flex items-center">
            <Link className="mr-2 h-4 w-4" /> Navigation
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center">
            <Globe className="mr-2 h-4 w-4" /> SEO
          </TabsTrigger>
          <TabsTrigger value="scripts" className="flex items-center">
            <Code className="mr-2 h-4 w-4" /> Scripts
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 gap-6">
          {/* Header Configuration */}
          <TabsContent value="header" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Header Configuration</CardTitle>
                <CardDescription>
                  Configure your site's header appearance and behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      value={headerConfig.logo}
                      onChange={(e) =>
                        setHeaderConfig({
                          ...headerConfig,
                          logo: e.target.value,
                        })
                      }
                      placeholder="/logo.svg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon URL</Label>
                    <Input
                      id="favicon"
                      value={headerConfig.favicon}
                      onChange={(e) =>
                        setHeaderConfig({
                          ...headerConfig,
                          favicon: e.target.value,
                        })
                      }
                      placeholder="/favicon.ico"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sticky-header"
                    checked={headerConfig.isSticky}
                    onCheckedChange={(checked) =>
                      setHeaderConfig({ ...headerConfig, isSticky: checked })
                    }
                  />
                  <Label htmlFor="sticky-header">Enable sticky header</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setHeaderConfig(defaultHeader)}
                >
                  Reset
                </Button>
                <Button onClick={saveHeaderConfig}>
                  <Save className="mr-2 h-4 w-4" /> Save Header Configuration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Footer Configuration */}
          <TabsContent value="footer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Footer Configuration</CardTitle>
                <CardDescription>
                  Configure your site's footer content and links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="copyright">Copyright Text</Label>
                  <Input
                    id="copyright"
                    value={footerConfig.copyright}
                    onChange={(e) =>
                      setFooterConfig({
                        ...footerConfig,
                        copyright: e.target.value,
                      })
                    }
                    placeholder="© 2023 Your Company. All rights reserved."
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Social Links</Label>
                    <Button variant="outline" size="sm" onClick={addSocialLink}>
                      <Plus className="h-4 w-4 mr-1" /> Add Social Link
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {footerConfig.socialLinks.map((link) => (
                      <div
                        key={link.id}
                        className="flex items-center space-x-2"
                      >
                        <Input
                          value={link.platform}
                          onChange={(e) => {
                            const updatedLinks = footerConfig.socialLinks.map(
                              (l) =>
                                l.id === link.id
                                  ? { ...l, platform: e.target.value }
                                  : l,
                            );
                            setFooterConfig({
                              ...footerConfig,
                              socialLinks: updatedLinks,
                            });
                          }}
                          placeholder="Platform"
                          className="flex-1"
                        />
                        <Input
                          value={link.url}
                          onChange={(e) => {
                            const updatedLinks = footerConfig.socialLinks.map(
                              (l) =>
                                l.id === link.id
                                  ? { ...l, url: e.target.value }
                                  : l,
                            );
                            setFooterConfig({
                              ...footerConfig,
                              socialLinks: updatedLinks,
                            });
                          }}
                          placeholder="URL"
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSocialLink(link.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Footer Columns</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addFooterColumn}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Column
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {footerConfig.columns.map((column) => (
                      <Card key={column.id} className="border">
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-center">
                            <Input
                              value={column.title}
                              onChange={(e) => {
                                const updatedColumns = footerConfig.columns.map(
                                  (c) =>
                                    c.id === column.id
                                      ? { ...c, title: e.target.value }
                                      : c,
                                );
                                setFooterConfig({
                                  ...footerConfig,
                                  columns: updatedColumns,
                                });
                              }}
                              placeholder="Column Title"
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFooterColumn(column.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-2">
                            {column.links.map((link) => (
                              <div
                                key={link.id}
                                className="flex items-center space-x-2"
                              >
                                <Input
                                  value={link.text}
                                  onChange={(e) => {
                                    const updatedColumns =
                                      footerConfig.columns.map((c) => {
                                        if (c.id === column.id) {
                                          const updatedLinks = c.links.map(
                                            (l) =>
                                              l.id === link.id
                                                ? { ...l, text: e.target.value }
                                                : l,
                                          );
                                          return { ...c, links: updatedLinks };
                                        }
                                        return c;
                                      });
                                    setFooterConfig({
                                      ...footerConfig,
                                      columns: updatedColumns,
                                    });
                                  }}
                                  placeholder="Link Text"
                                  className="flex-1"
                                />
                                <Input
                                  value={link.url}
                                  onChange={(e) => {
                                    const updatedColumns =
                                      footerConfig.columns.map((c) => {
                                        if (c.id === column.id) {
                                          const updatedLinks = c.links.map(
                                            (l) =>
                                              l.id === link.id
                                                ? { ...l, url: e.target.value }
                                                : l,
                                          );
                                          return { ...c, links: updatedLinks };
                                        }
                                        return c;
                                      });
                                    setFooterConfig({
                                      ...footerConfig,
                                      columns: updatedColumns,
                                    });
                                  }}
                                  placeholder="URL"
                                  className="flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    removeFooterLink(column.id, link.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={() => addFooterLink(column.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Link
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setFooterConfig(defaultFooter)}
                >
                  Reset
                </Button>
                <Button onClick={saveFooterConfig}>
                  <Save className="mr-2 h-4 w-4" /> Save Footer Configuration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Navigation Configuration */}
          <TabsContent value="navigation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Navigation Menu</CardTitle>
                <CardDescription>
                  Configure your site's main navigation menu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Menu Items</Label>
                  <Button variant="outline" size="sm" onClick={addNavItem}>
                    <Plus className="h-4 w-4 mr-1" /> Add Menu Item
                  </Button>
                </div>
                <div className="space-y-2">
                  {navigationConfig.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Input
                        value={item.text}
                        onChange={(e) => {
                          const updatedItems = navigationConfig.items.map(
                            (i) =>
                              i.id === item.id
                                ? { ...i, text: e.target.value }
                                : i,
                          );
                          setNavigationConfig({
                            ...navigationConfig,
                            items: updatedItems,
                          });
                        }}
                        placeholder="Menu Text"
                        className="flex-1"
                      />
                      <Input
                        value={item.url}
                        onChange={(e) => {
                          const updatedItems = navigationConfig.items.map(
                            (i) =>
                              i.id === item.id
                                ? { ...i, url: e.target.value }
                                : i,
                          );
                          setNavigationConfig({
                            ...navigationConfig,
                            items: updatedItems,
                          });
                        }}
                        placeholder="URL"
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeNavItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setNavigationConfig(defaultNavigation)}
                >
                  Reset
                </Button>
                <Button onClick={saveNavigationConfig}>
                  <Save className="mr-2 h-4 w-4" /> Save Navigation
                  Configuration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* SEO Configuration */}
          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Configure default SEO settings for your site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultTitle">Default Page Title</Label>
                    <Input
                      id="defaultTitle"
                      value={seoConfig.defaultTitle}
                      onChange={(e) =>
                        setSeoConfig({
                          ...seoConfig,
                          defaultTitle: e.target.value,
                        })
                      }
                      placeholder="Your Website"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultDescription">
                      Default Meta Description
                    </Label>
                    <Textarea
                      id="defaultDescription"
                      value={seoConfig.defaultDescription}
                      onChange={(e) =>
                        setSeoConfig({
                          ...seoConfig,
                          defaultDescription: e.target.value,
                        })
                      }
                      placeholder="Your website description goes here"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultKeywords">Default Keywords</Label>
                    <Input
                      id="defaultKeywords"
                      value={seoConfig.defaultKeywords}
                      onChange={(e) =>
                        setSeoConfig({
                          ...seoConfig,
                          defaultKeywords: e.target.value,
                        })
                      }
                      placeholder="website, cms, content management"
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ogImage">Default Open Graph Image</Label>
                    <Input
                      id="ogImage"
                      value={seoConfig.ogImage}
                      onChange={(e) =>
                        setSeoConfig({ ...seoConfig, ogImage: e.target.value })
                      }
                      placeholder="/og-image.jpg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitterHandle">Twitter Handle</Label>
                    <Input
                      id="twitterHandle"
                      value={seoConfig.twitterHandle}
                      onChange={(e) =>
                        setSeoConfig({
                          ...seoConfig,
                          twitterHandle: e.target.value,
                        })
                      }
                      placeholder="@yourhandle"
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableSitemap"
                      checked={seoConfig.enableSitemap}
                      onCheckedChange={(checked) =>
                        setSeoConfig({ ...seoConfig, enableSitemap: checked })
                      }
                    />
                    <Label htmlFor="enableSitemap">Generate sitemap.xml</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableRobots"
                      checked={seoConfig.enableRobots}
                      onCheckedChange={(checked) =>
                        setSeoConfig({ ...seoConfig, enableRobots: checked })
                      }
                    />
                    <Label htmlFor="enableRobots">Generate robots.txt</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setSeoConfig(defaultSEO)}
                >
                  Reset
                </Button>
                <Button onClick={saveSEOConfig}>
                  <Save className="mr-2 h-4 w-4" /> Save SEO Configuration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Scripts Configuration */}
          <TabsContent value="scripts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Script Management</CardTitle>
                <CardDescription>
                  Add custom scripts to your site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Head Scripts</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addScript("head")}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Head Script
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {scriptConfig.headScripts.map((script) => (
                      <Card key={script.id} className="border">
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-center">
                            <Input
                              value={script.name}
                              onChange={(e) => {
                                const updatedScripts =
                                  scriptConfig.headScripts.map((s) =>
                                    s.id === script.id
                                      ? { ...s, name: e.target.value }
                                      : s,
                                  );
                                setScriptConfig({
                                  ...scriptConfig,
                                  headScripts: updatedScripts,
                                });
                              }}
                              placeholder="Script Name"
                              className="flex-1"
                            />
                            <div className="flex items-center ml-2 space-x-2">
                              <Switch
                                checked={script.isEnabled}
                                onCheckedChange={() =>
                                  toggleScriptEnabled("head", script.id)
                                }
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeScript("head", script.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <Textarea
                            value={script.content}
                            onChange={(e) => {
                              const updatedScripts =
                                scriptConfig.headScripts.map((s) =>
                                  s.id === script.id
                                    ? { ...s, content: e.target.value }
                                    : s,
                                );
                              setScriptConfig({
                                ...scriptConfig,
                                headScripts: updatedScripts,
                              });
                            }}
                            placeholder="<!-- Script content -->"
                            rows={4}
                            className="font-mono text-sm"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Body Scripts</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addScript("body")}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Body Script
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {scriptConfig.bodyScripts.map((script) => (
                      <Card key={script.id} className="border">
                        <CardHeader className="p-4">
                          <div className="flex justify-between items-center">
                            <Input
                              value={script.name}
                              onChange={(e) => {
                                const updatedScripts =
                                  scriptConfig.bodyScripts.map((s) =>
                                    s.id === script.id
                                      ? { ...s, name: e.target.value }
                                      : s,
                                  );
                                setScriptConfig({
                                  ...scriptConfig,
                                  bodyScripts: updatedScripts,
                                });
                              }}
                              placeholder="Script Name"
                              className="flex-1"
                            />
                            <div className="flex items-center ml-2 space-x-2">
                              <Switch
                                checked={script.isEnabled}
                                onCheckedChange={() =>
                                  toggleScriptEnabled("body", script.id)
                                }
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeScript("body", script.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <Textarea
                            value={script.content}
                            onChange={(e) => {
                              const updatedScripts =
                                scriptConfig.bodyScripts.map((s) =>
                                  s.id === script.id
                                    ? { ...s, content: e.target.value }
                                    : s,
                                );
                              setScriptConfig({
                                ...scriptConfig,
                                bodyScripts: updatedScripts,
                              });
                            }}
                            placeholder="<!-- Script content -->"
                            rows={4}
                            className="font-mono text-sm"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setScriptConfig(defaultScripts)}
                >
                  Reset
                </Button>
                <Button onClick={saveScriptConfig}>
                  <Save className="mr-2 h-4 w-4" /> Save Script Configuration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* Preview Modal */}
      {showPreview && (
        <AlertDialog open={showPreview} onOpenChange={setShowPreview}>
          <AlertDialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle>Configuration Preview</AlertDialogTitle>
              <AlertDialogDescription>
                Preview of the current {activeTab} configuration
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="bg-muted p-4 rounded-md">
              <pre className="text-xs overflow-auto">
                {activeTab === "header" &&
                  JSON.stringify(headerConfig, null, 2)}
                {activeTab === "footer" &&
                  JSON.stringify(footerConfig, null, 2)}
                {activeTab === "navigation" &&
                  JSON.stringify(navigationConfig, null, 2)}
                {activeTab === "seo" && JSON.stringify(seoConfig, null, 2)}
                {activeTab === "scripts" &&
                  JSON.stringify(scriptConfig, null, 2)}
              </pre>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default ConfigManager;
