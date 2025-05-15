import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  Save,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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

interface Page {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  lastModified: string;
  sections: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

interface Section {
  id: string;
  name: string;
  type: string;
}

const PageManager = () => {
  // Mock data for pages
  const [pages, setPages] = useState<Page[]>([
    {
      id: "1",
      title: "Home Page",
      slug: "home",
      status: "published",
      lastModified: "2023-06-15",
      sections: ["hero", "features", "testimonials"],
      seo: {
        title: "Welcome to Our Website",
        description: "Our amazing website homepage",
        keywords: "home, welcome, main",
      },
    },
    {
      id: "2",
      title: "About Us",
      slug: "about",
      status: "published",
      lastModified: "2023-06-10",
      sections: ["team", "mission", "values"],
      seo: {
        title: "About Our Company",
        description: "Learn about our company history and values",
        keywords: "about, company, history, values",
      },
    },
    {
      id: "3",
      title: "Contact Page",
      slug: "contact",
      status: "draft",
      lastModified: "2023-06-05",
      sections: ["contact-form", "map", "office-locations"],
      seo: {
        title: "Contact Us",
        description: "Get in touch with our team",
        keywords: "contact, email, phone, location",
      },
    },
  ]);

  // Mock data for available sections
  const [availableSections, setAvailableSections] = useState<Section[]>([
    { id: "hero", name: "Hero Banner", type: "banner" },
    { id: "features", name: "Features Grid", type: "grid" },
    { id: "testimonials", name: "Testimonials Carousel", type: "carousel" },
    { id: "team", name: "Team Members", type: "gallery" },
    { id: "mission", name: "Mission Statement", type: "text" },
    { id: "values", name: "Company Values", type: "list" },
    { id: "contact-form", name: "Contact Form", type: "form" },
    { id: "map", name: "Location Map", type: "map" },
    { id: "office-locations", name: "Office Locations", type: "cards" },
  ]);

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // State for currently edited page
  const [currentPage, setCurrentPage] = useState<Page | null>(null);

  // State for page editor dialog
  const [isPageEditorOpen, setIsPageEditorOpen] = useState(false);

  // State for section selection
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  // State for preview mode
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Filter pages based on search term
  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handle creating a new page
  const handleCreatePage = () => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      title: "New Page",
      slug: "new-page",
      status: "draft",
      lastModified: new Date().toISOString().split("T")[0],
      sections: [],
      seo: {
        title: "",
        description: "",
        keywords: "",
      },
    };
    setCurrentPage(newPage);
    setSelectedSections([]);
    setIsPageEditorOpen(true);
  };

  // Handle editing an existing page
  const handleEditPage = (page: Page) => {
    setCurrentPage({ ...page });
    setSelectedSections([...page.sections]);
    setIsPageEditorOpen(true);
  };

  // Handle saving a page
  const handleSavePage = () => {
    if (!currentPage) return;

    const updatedPage = {
      ...currentPage,
      sections: selectedSections,
      lastModified: new Date().toISOString().split("T")[0],
    };

    if (pages.some((p) => p.id === updatedPage.id)) {
      // Update existing page
      setPages(pages.map((p) => (p.id === updatedPage.id ? updatedPage : p)));
    } else {
      // Add new page
      setPages([...pages, updatedPage]);
    }

    setIsPageEditorOpen(false);
    setCurrentPage(null);
  };

  // Handle deleting a page
  const handleDeletePage = (pageId: string) => {
    setPages(pages.filter((page) => page.id !== pageId));
  };

  // Handle adding a section to the current page
  const handleAddSection = (sectionId: string) => {
    if (!selectedSections.includes(sectionId)) {
      setSelectedSections([...selectedSections, sectionId]);
    }
  };

  // Handle removing a section from the current page
  const handleRemoveSection = (sectionId: string) => {
    setSelectedSections(selectedSections.filter((id) => id !== sectionId));
  };

  // Handle moving a section up in the order
  const handleMoveSectionUp = (index: number) => {
    if (index > 0) {
      const newSections = [...selectedSections];
      [newSections[index], newSections[index - 1]] = [
        newSections[index - 1],
        newSections[index],
      ];
      setSelectedSections(newSections);
    }
  };

  // Handle moving a section down in the order
  const handleMoveSectionDown = (index: number) => {
    if (index < selectedSections.length - 1) {
      const newSections = [...selectedSections];
      [newSections[index], newSections[index + 1]] = [
        newSections[index + 1],
        newSections[index],
      ];
      setSelectedSections(newSections);
    }
  };

  // Toggle page status between published and draft
  const togglePageStatus = (page: Page) => {
    const updatedPage = {
      ...page,
      status: page.status === "published" ? "draft" : "published",
      lastModified: new Date().toISOString().split("T")[0],
    };
    setPages(pages.map((p) => (p.id === page.id ? updatedPage : p)));
  };

  return (
    <div className="bg-background p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Page Manager</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage website pages
          </p>
        </div>
        <Button onClick={handleCreatePage}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Page
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages by title or URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pages</CardTitle>
          <CardDescription>Manage your website pages</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-4 text-muted-foreground"
                  >
                    No pages found. Create your first page to get started.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>
                      <code>/{page.slug}</code>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          page.status === "published" ? "default" : "outline"
                        }
                      >
                        {page.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>{page.lastModified}</TableCell>
                    <TableCell>{page.sections.length}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPage(page)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Page</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{page.title}"?
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeletePage(page.id)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Page Editor Dialog */}
      <Dialog open={isPageEditorOpen} onOpenChange={setIsPageEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentPage?.id.startsWith("page-")
                ? "Create New Page"
                : "Edit Page"}
            </DialogTitle>
            <DialogDescription>
              Configure page settings, add sections, and set SEO metadata.
            </DialogDescription>
          </DialogHeader>

          {currentPage && (
            <Tabs defaultValue="settings">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="settings">Page Settings</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>

              {/* Page Settings Tab */}
              <TabsContent value="settings" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      value={currentPage.title}
                      onChange={(e) =>
                        setCurrentPage({
                          ...currentPage,
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter page title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">/</span>
                      <Input
                        id="slug"
                        value={currentPage.slug}
                        onChange={(e) =>
                          setCurrentPage({
                            ...currentPage,
                            slug: e.target.value
                              .replace(/\s+/g, "-")
                              .toLowerCase(),
                          })
                        }
                        placeholder="page-url-slug"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="status"
                      checked={currentPage.status === "published"}
                      onCheckedChange={(checked) =>
                        setCurrentPage({
                          ...currentPage,
                          status: checked ? "published" : "draft",
                        })
                      }
                    />
                    <Label htmlFor="status">Published</Label>
                  </div>
                </div>
              </TabsContent>

              {/* Sections Tab */}
              <TabsContent value="sections" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Available Sections
                    </h3>
                    <div className="border rounded-md p-4 h-[300px] overflow-y-auto">
                      {availableSections.map((section) => (
                        <div
                          key={section.id}
                          className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
                        >
                          <div>
                            <p className="font-medium">{section.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {section.type}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAddSection(section.id)}
                            disabled={selectedSections.includes(section.id)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Page Sections</h3>
                    <div className="border rounded-md p-4 h-[300px] overflow-y-auto">
                      {selectedSections.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          No sections added yet. Add sections from the left
                          panel.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {selectedSections.map((sectionId, index) => {
                            const section = availableSections.find(
                              (s) => s.id === sectionId,
                            );
                            return section ? (
                              <motion.div
                                key={`${sectionId}-${index}`}
                                className="flex items-center justify-between p-2 bg-muted rounded-md"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="flex items-center gap-2">
                                  <div className="flex flex-col gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => handleMoveSectionUp(index)}
                                      disabled={index === 0}
                                    >
                                      <ArrowUpDown className="h-3 w-3 rotate-90" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() =>
                                        handleMoveSectionDown(index)
                                      }
                                      disabled={
                                        index === selectedSections.length - 1
                                      }
                                    >
                                      <ArrowUpDown className="h-3 w-3 -rotate-90" />
                                    </Button>
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {section.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {section.type}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveSection(sectionId)}
                                >
                                  <X className="h-4 w-4 text-destructive" />
                                </Button>
                              </motion.div>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="seo-title">SEO Title</Label>
                    <Input
                      id="seo-title"
                      value={currentPage.seo.title}
                      onChange={(e) =>
                        setCurrentPage({
                          ...currentPage,
                          seo: { ...currentPage.seo, title: e.target.value },
                        })
                      }
                      placeholder="SEO title (appears in search results)"
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended length: 50-60 characters
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="seo-description">Meta Description</Label>
                    <Textarea
                      id="seo-description"
                      value={currentPage.seo.description}
                      onChange={(e) =>
                        setCurrentPage({
                          ...currentPage,
                          seo: {
                            ...currentPage.seo,
                            description: e.target.value,
                          },
                        })
                      }
                      placeholder="Brief description of the page for search engines"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended length: 150-160 characters
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="seo-keywords">Keywords</Label>
                    <Input
                      id="seo-keywords"
                      value={currentPage.seo.keywords}
                      onChange={(e) =>
                        setCurrentPage({
                          ...currentPage,
                          seo: { ...currentPage.seo, keywords: e.target.value },
                        })
                      }
                      placeholder="Comma-separated keywords"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                <Eye className="mr-2 h-4 w-4" />
                {isPreviewMode ? "Exit Preview" : "Preview"}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsPageEditorOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSavePage}>
                <Save className="mr-2 h-4 w-4" />
                Save Page
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageManager;
