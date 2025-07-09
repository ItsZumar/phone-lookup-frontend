"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  phoneNumber: string;
  message: string;
  category: string;
  status: string;
  name: string;
}

export default function NewReportPage() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    message: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle navigation when user is not authenticated or is admin
  useEffect(() => {
    if (mounted && !authLoading && !user) {
      router.push("/login");
      return;
    }

    // Redirect admins to admin panel - they don't need to create individual reports
    if (mounted && !authLoading && user && user.role === "admin") {
      router.push("/admin");
      return;
    }
  }, [mounted, authLoading, user, router]);

  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId && user) {
      setIsEditMode(true);
      setReportId(editId);
      fetchReport(editId);
    }
  }, [searchParams, user]);

  const fetchReport = async (id: string) => {
    setLoadingReport(true);
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(`/api/submissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch report");
      }

      const data: Report = await response.json();
      setFormData({
        name: data.name || user?.name || "", // Use name from report data, fallback to current user name
        phoneNumber: data.phoneNumber,
        message: data.message,
        category: data.category,
      });
    } catch (error) {
      setError("Failed to load report");
      console.error("Error fetching report:", error);
    } finally {
      setLoadingReport(false);
    }
  };

  // Update form data when user changes
  useEffect(() => {
    if (user && !isEditMode) {
      setFormData(prev => ({
        ...prev,
        name: user.name
      }));
    }
  }, [user, isEditMode]);

  // Update name field when user is loaded in edit mode
  useEffect(() => {
    if (user && isEditMode) {
      setFormData(prev => ({
        ...prev,
        name: user.name
      }));
    }
  }, [user, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        setError("You must be logged in to submit a report");
        router.push("/login");
        return;
      }

      const url = isEditMode && reportId 
        ? `/api/submissions/${reportId}` 
        : "/api/submissions";
      
      const method = isEditMode ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const action = isEditMode ? "updated" : "submitted";
        toast({
          title: `Report ${action}!`,
          description: `Your report has been ${action} successfully.`,
        });
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || `Failed to ${isEditMode ? 'update' : 'submit'} report`);
      }
    } catch (error) {
      setError(`Failed to ${isEditMode ? 'update' : 'submit'} report`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Show loading while auth is loading or component is not mounted
  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  // Don't render if user is not authenticated (navigation will happen in useEffect)
  if (!user) {
    return null;
  }

  if (loadingReport) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading report...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/dashboard" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isEditMode ? "Edit Report" : "Report a Phone Number"}</CardTitle>
            <CardDescription>
              {isEditMode 
                ? "Update the details of your phone number report" 
                : "Help protect the community by reporting suspicious phone numbers"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your name"
                  required
                  disabled={true}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange("category", value)} 
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SCAM">Scam</SelectItem>
                    <SelectItem value="SPAM">Spam</SelectItem>
                    <SelectItem value="TELEMARKETING">Telemarketing</SelectItem>
                    <SelectItem value="FRAUD">Fraud</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message Details</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Describe what happened, what they said, or any other relevant details..."
                  rows={5}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading 
                    ? (isEditMode ? "Updating..." : "Submitting...") 
                    : (isEditMode ? "Update Report" : "Submit Report")
                  }
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
