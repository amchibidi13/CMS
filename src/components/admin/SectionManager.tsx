import React, { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Save,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Field {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  options?: { label: string; value: string }[];
}

interface Section {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: Field[];
  createdAt: string;
  updatedAt: string;
}

const SectionManager: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      name: "Hero Banner",
      description:
        "A full-width banner with heading, subheading, and call-to-action button",
      type: "hero",
      fields: [
        {
          id: "1-1",
          name: "heading",
          type: "text",
          label: "Heading",
          required: true,
        },
        {
          id: "1-2",
          name: "subheading",
          type: "textarea",
          label: "Subheading",
        },
        { id: "1-3", name: "buttonText", type: "text", label: "Button Text" },
        { id: "1-4", name: "buttonUrl", type: "text", label: "Button URL" },
        {
          id: "1-5",
          name: "backgroundImage",
          type: "image",
          label: "Background Image",
        },
      ],
      createdAt: "2023-06-15T10:30:00Z",
      updatedAt: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Testimonials",
      description:
        "A section to display customer testimonials with images and quotes",
      type: "testimonials",
      fields: [
        { id: "2-1", name: "heading", type: "text", label: "Section Heading" },
        {
          id: "2-2",
          name: "testimonials",
          type: "repeater",
          label: "Testimonials",
        },
      ],
      createdAt: "2023-06-16T14:20:00Z",
      updatedAt: "2023-06-16T14:20:00Z",
    },
    {
      id: "3",
      name: "Feature Grid",
      description: "A grid layout to showcase features or services with icons",
      type: "features",
      fields: [
        { id: "3-1", name: "heading", type: "text", label: "Section Heading" },
        {
          id: "3-2",
          name: "subheading",
          type: "textarea",
          label: "Section Subheading",
        },
        { id: "3-3", name: "features", type: "repeater", label: "Features" },
      ],
      createdAt: "2023-06-17T09:45:00Z",
      updatedAt: "2023-06-17T09:45:00Z",
    },
  ]);

  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [newField, setNewField] = useState<Partial<Field>>({ type: "text" });
  const [editedSection, setEditedSection] = useState<Section | null>(null);

  // Field type options
  const fieldTypes = [
    { label: "Text", value: "text" },
    { label: "Textarea", value: "textarea" },
    { label: "Rich Text", value: "richtext" },
    { label: "Image", value: "image" },
    { label: "Select", value: "select" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Repeater", value: "repeater" },
    { label: "Link", value: "link" },
    { label: "Color", value: "color" },
  ];

  // Filter sections based on search query
  const filteredSections = sections.filter(
    (section) =>
      section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateSection = () => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      name: "New Section",
      description: "Section description",
      type: "custom",
      fields: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setEditedSection(newSection);
    setIsCreating(true);
    setActiveTab("editor");
  };

  const handleEditSection = (section: Section) => {
    setEditedSection({ ...section });
    setSelectedSection(section);
    setIsEditing(true);
    setActiveTab("editor");
  };

  const handlePreviewSection = (section: Section) => {
    setSelectedSection(section);
    setIsPreviewing(true);
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId));
    if (selectedSection?.id === sectionId) {
      setSelectedSection(null);
      setIsEditing(false);
      setActiveTab("list");
    }
  };

  const handleAddField = () => {
    if (!editedSection || !newField.name || !newField.label) return;

    const field: Field = {
      id: `field-${Date.now()}`,
      name: newField.name,
      type: newField.type || "text",
      label: newField.label,
      placeholder: newField.placeholder,
      required: newField.required || false,
    };

    setEditedSection({
      ...editedSection,
      fields: [...editedSection.fields, field],
      updatedAt: new Date().toISOString(),
    });

    setNewField({ type: "text" });
  };

  const handleRemoveField = (fieldId: string) => {
    if (!editedSection) return;

    setEditedSection({
      ...editedSection,
      fields: editedSection.fields.filter((field) => field.id !== fieldId),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleMoveField = (fieldId: string, direction: "up" | "down") => {
    if (!editedSection) return;

    const fieldIndex = editedSection.fields.findIndex(
      (field) => field.id === fieldId,
    );
    if (fieldIndex === -1) return;

    const newFields = [...editedSection.fields];

    if (direction === "up" && fieldIndex > 0) {
      [newFields[fieldIndex], newFields[fieldIndex - 1]] = [
        newFields[fieldIndex - 1],
        newFields[fieldIndex],
      ];
    } else if (direction === "down" && fieldIndex < newFields.length - 1) {
      [newFields[fieldIndex], newFields[fieldIndex + 1]] = [
        newFields[fieldIndex + 1],
        newFields[fieldIndex],
      ];
    }

    setEditedSection({
      ...editedSection,
      fields: newFields,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSaveSection = () => {
    if (!editedSection) return;

    if (isCreating) {
      setSections([...sections, editedSection]);
      setIsCreating(false);
    } else if (isEditing) {
      setSections(
        sections.map((section) =>
          section.id === editedSection.id ? editedSection : section,
        ),
      );
      setIsEditing(false);
    }

    setSelectedSection(editedSection);
    setEditedSection(null);
    setActiveTab("list");
  };

  const handleCancelEdit = () => {
    setEditedSection(null);
    setIsEditing(false);
    setIsCreating(false);
    setActiveTab("list");
  };

  const renderFieldPreview = (field: Field) => {
    switch (field.type) {
      case "text":
        return (
          <Input placeholder={field.placeholder || `Enter ${field.label}`} />
        );
      case "textarea":
        return (
          <Textarea placeholder={field.placeholder || `Enter ${field.label}`} />
        );
      case "select":
        return (
          <Select>
            <SelectTrigger>
              <SelectValue
                placeholder={field.placeholder || `Select ${field.label}`}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              )) || (
                <SelectItem value="placeholder">No options defined</SelectItem>
              )}
            </SelectContent>
          </Select>
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Switch id={`preview-${field.id}`} />
            <Label htmlFor={`preview-${field.id}`}>{field.label}</Label>
          </div>
        );
      case "image":
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <p className="text-sm text-gray-500">Upload {field.label}</p>
          </div>
        );
      case "repeater":
        return (
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">{field.label} Items</h4>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add Item
              </Button>
            </div>
            <div className="bg-muted/50 p-3 rounded-md">
              <p className="text-xs text-muted-foreground">
                Repeater field placeholder
              </p>
            </div>
          </div>
        );
      default:
        return <Input placeholder={`${field.type} field`} />;
    }
  };

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Section Manager
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and manage reusable content sections for your website
            </p>
          </div>
          <Button onClick={handleCreateSection}>
            <Plus className="h-4 w-4 mr-2" /> Create Section
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list">Sections Library</TabsTrigger>
            <TabsTrigger value="editor" disabled={!isEditing && !isCreating}>
              Section Editor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="flex items-center mb-4">
              <Input
                placeholder="Search sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {filteredSections.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No sections found. Create your first section to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSections.map((section) => (
                  <Card key={section.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{section.name}</CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {section.type}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handlePreviewSection(section)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditSection(section)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Section</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete "
                                  {section.name}"? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => {}}>
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handleDeleteSection(section.id)
                                  }
                                >
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                      <div className="mt-3">
                        <p className="text-xs font-medium mb-1">
                          Fields ({section.fields.length})
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {section.fields.map((field) => (
                            <Badge
                              key={field.id}
                              variant="outline"
                              className="text-xs"
                            >
                              {field.label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1 text-xs text-muted-foreground">
                      Last updated:{" "}
                      {new Date(section.updatedAt).toLocaleDateString()}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="editor">
            {editedSection && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {isCreating ? "Create New Section" : "Edit Section"}
                      </CardTitle>
                      <CardDescription>
                        Configure the section properties and fields
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="section-name">Section Name</Label>
                        <Input
                          id="section-name"
                          value={editedSection.name}
                          onChange={(e) =>
                            setEditedSection({
                              ...editedSection,
                              name: e.target.value,
                            })
                          }
                          placeholder="Enter section name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="section-type">Section Type</Label>
                        <Input
                          id="section-type"
                          value={editedSection.type}
                          onChange={(e) =>
                            setEditedSection({
                              ...editedSection,
                              type: e.target.value,
                            })
                          }
                          placeholder="Enter section type identifier"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="section-description">Description</Label>
                        <Textarea
                          id="section-description"
                          value={editedSection.description}
                          onChange={(e) =>
                            setEditedSection({
                              ...editedSection,
                              description: e.target.value,
                            })
                          }
                          placeholder="Enter section description"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Fields</CardTitle>
                      <CardDescription>
                        Define the fields that make up this section
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {editedSection.fields.length === 0 ? (
                        <div className="text-center py-8 border border-dashed rounded-md">
                          <p className="text-muted-foreground">
                            No fields added yet. Add your first field below.
                          </p>
                        </div>
                      ) : (
                        <Accordion type="multiple" className="w-full">
                          {editedSection.fields.map((field, index) => (
                            <AccordionItem key={field.id} value={field.id}>
                              <AccordionTrigger className="hover:no-underline">
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    {field.label}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="ml-2 text-xs"
                                  >
                                    {field.type}
                                  </Badge>
                                  {field.required && (
                                    <Badge className="ml-2 text-xs">
                                      Required
                                    </Badge>
                                  )}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-4 pt-2">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label>Field Name</Label>
                                      <Input value={field.name} disabled />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Field Type</Label>
                                      <Input value={field.type} disabled />
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <Label>Field Label</Label>
                                    <Input value={field.label} disabled />
                                  </div>

                                  {field.placeholder && (
                                    <div className="space-y-2">
                                      <Label>Placeholder</Label>
                                      <Input
                                        value={field.placeholder}
                                        disabled
                                      />
                                    </div>
                                  )}

                                  <div className="flex justify-between pt-2">
                                    <div className="flex space-x-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleMoveField(field.id, "up")
                                        }
                                        disabled={index === 0}
                                      >
                                        <ChevronUp className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleMoveField(field.id, "down")
                                        }
                                        disabled={
                                          index ===
                                          editedSection.fields.length - 1
                                        }
                                      >
                                        <ChevronDown className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() =>
                                        handleRemoveField(field.id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                                    </Button>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      )}

                      <Separator className="my-4" />

                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Add New Field</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="field-name">Field Name</Label>
                            <Input
                              id="field-name"
                              value={newField.name || ""}
                              onChange={(e) =>
                                setNewField({
                                  ...newField,
                                  name: e.target.value,
                                })
                              }
                              placeholder="e.g. heading, image, content"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="field-type">Field Type</Label>
                            <Select
                              value={newField.type}
                              onValueChange={(value) =>
                                setNewField({ ...newField, type: value })
                              }
                            >
                              <SelectTrigger id="field-type">
                                <SelectValue placeholder="Select field type" />
                              </SelectTrigger>
                              <SelectContent>
                                {fieldTypes.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="field-label">Field Label</Label>
                            <Input
                              id="field-label"
                              value={newField.label || ""}
                              onChange={(e) =>
                                setNewField({
                                  ...newField,
                                  label: e.target.value,
                                })
                              }
                              placeholder="Display label for the field"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="field-placeholder">
                              Placeholder (optional)
                            </Label>
                            <Input
                              id="field-placeholder"
                              value={newField.placeholder || ""}
                              onChange={(e) =>
                                setNewField({
                                  ...newField,
                                  placeholder: e.target.value,
                                })
                              }
                              placeholder="Input placeholder text"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="field-required"
                            checked={newField.required || false}
                            onCheckedChange={(checked) =>
                              setNewField({ ...newField, required: checked })
                            }
                          />
                          <Label htmlFor="field-required">Required field</Label>
                        </div>

                        <Button
                          onClick={handleAddField}
                          disabled={!newField.name || !newField.label}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Field
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <div className="sticky top-6 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Section Preview</CardTitle>
                        <CardDescription>
                          Preview how your section fields will appear
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {editedSection.fields.length === 0 ? (
                          <div className="text-center py-8 border border-dashed rounded-md">
                            <p className="text-muted-foreground">
                              Add fields to preview them here
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {editedSection.fields.map((field) => (
                              <div key={field.id} className="space-y-2">
                                <Label>
                                  {field.label}
                                  {field.required && (
                                    <span className="text-destructive ml-1">
                                      *
                                    </span>
                                  )}
                                </Label>
                                {renderFieldPreview(field)}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleCancelEdit}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button className="flex-1" onClick={handleSaveSection}>
                        <Save className="h-4 w-4 mr-1" /> Save Section
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Dialog open={isPreviewing} onOpenChange={setIsPreviewing}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedSection?.name} Preview</DialogTitle>
              <DialogDescription>
                Preview of how the section fields will appear in the editor
              </DialogDescription>
            </DialogHeader>

            {selectedSection && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Section Details
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Type:</span>{" "}
                        {selectedSection.type}
                      </p>
                      <p>
                        <span className="font-medium">Description:</span>{" "}
                        {selectedSection.description}
                      </p>
                      <p>
                        <span className="font-medium">Fields:</span>{" "}
                        {selectedSection.fields.length}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      File Information
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Path:</span>{" "}
                        /site-data/sections/{selectedSection.type}.json
                      </p>
                      <p>
                        <span className="font-medium">Created:</span>{" "}
                        {new Date(selectedSection.createdAt).toLocaleString()}
                      </p>
                      <p>
                        <span className="font-medium">Updated:</span>{" "}
                        {new Date(selectedSection.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-4">Field Preview</h3>
                  <div className="space-y-4">
                    {selectedSection.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label>
                          {field.label}
                          {field.required && (
                            <span className="text-destructive ml-1">*</span>
                          )}
                        </Label>
                        {renderFieldPreview(field)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SectionManager;
