"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Users, Phone, AlertTriangle, TrendingUp } from "lucide-react";

interface Submission {
  id: string;
  phoneNumber: string;
  name: string;
  message: string;
  category: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "pending" | "approved" | "rejected";
  createdAt: string;
  userId: string;
  userName: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  blocked: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [updatingSubmissions, setUpdatingSubmissions] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login");
      return;
    }

    if (user && user.role === "admin") {
      fetchData();
    }
  }, [user, loading, router]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("auth-token");

      // Fetch submissions
      const submissionsResponse = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch users
      const usersResponse = await fetch("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (submissionsResponse.ok) {
        const submissionsData = await submissionsResponse.json();
        console.log("Submissions data:", submissionsData);
        // Handle both array and object responses
        const submissionsArray = Array.isArray(submissionsData) ? submissionsData : submissionsData.submissions || [];
        setSubmissions(submissionsArray);
      }

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        console.log("Users data:", usersData);
        // Handle both array and object responses
        const usersArray = Array.isArray(usersData) ? usersData : usersData.users || [];
        setUsers(usersArray);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const updateSubmissionStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      setUpdatingSubmissions((prev) => new Set(prev).add(id));
      const token = localStorage.getItem("auth-token");
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updatedReport = await response.json();
        // Update the submission with the response from backend (which has uppercase status)
        setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: updatedReport.status } : s)));
        console.log(`Successfully updated submission ${id} to ${updatedReport.status}`);
      } else {
        const errorData = await response.json();
        console.error("Failed to update submission:", errorData);
        alert(`Failed to update submission: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to update submission:", error);
      alert("Failed to update submission. Please try again.");
    } finally {
      setUpdatingSubmissions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const toggleUserBlock = async (userId: string, blocked: boolean) => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blocked }),
      });

      if (response.ok) {
        setUsers(users.map((u) => (u.id === userId ? { ...u, blocked } : u)));
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete user");
      }

      // Remove the deleted user from the state
      setUsers(users.filter((u) => u.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert(error instanceof Error ? error.message : "Failed to delete user");
    }
  };

  if (loading || !user || user.role !== "admin") {
    return <div>Loading...</div>;
  }

  // Only filter when data is loaded and submissions is an array
  const pendingSubmissions = Array.isArray(submissions) ? submissions.filter((s) => s.status === "PENDING") : [];
  const approvedSubmissions = Array.isArray(submissions) ? submissions.filter((s) => s.status === "APPROVED") : [];
  const rejectedSubmissions = Array.isArray(submissions) ? submissions.filter((s) => s.status === "REJECTED") : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage submissions, users, and monitor platform activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Array.isArray(users) ? users.length : 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Array.isArray(submissions) ? submissions.length : 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingSubmissions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedSubmissions.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Submission Management</CardTitle>
                <CardDescription>Review and moderate user submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div>Loading submissions...</div>
                ) : !Array.isArray(submissions) ? (
                  <div>Error loading submissions</div>
                ) : submissions.length === 0 ? (
                  <div>No submissions found</div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <div key={submission.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-4">
                            <span className="font-mono text-lg">{submission.phoneNumber}</span>
                            <Badge
                              variant={
                                submission.status === "APPROVED"
                                  ? "default"
                                  : submission.status === "REJECTED"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {submission.status}
                            </Badge>
                            <Badge variant="outline">{submission.category}</Badge>
                          </div>
                          {submission.status === "PENDING" && (
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                onClick={() => updateSubmissionStatus(submission.id, "approved")}
                                disabled={updatingSubmissions.has(submission.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                {updatingSubmissions.has(submission.id) ? (
                                  "Updating..."
                                ) : (
                                  <>
                                    <Check className="h-4 w-4 mr-1" />
                                    Approve
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateSubmissionStatus(submission.id, "rejected")}
                                disabled={updatingSubmissions.has(submission.id)}
                              >
                                {updatingSubmissions.has(submission.id) ? (
                                  "Updating..."
                                ) : (
                                  <>
                                    <X className="h-4 w-4 mr-1" />
                                    Reject
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                          {submission.status !== "PENDING" && (
                            <div className="text-sm text-gray-500">Status: {submission.status} (no action needed)</div>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">
                          <strong>Reported by:</strong> {submission.userName || submission.name}
                        </p>
                        <p className="text-gray-600 mb-2">
                          <strong>Message:</strong> {submission.message}
                        </p>
                        <p className="text-sm text-gray-500">Submitted on {new Date(submission.createdAt).toLocaleDateString()}</p>
                        {/* Debug info */}
                        <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                          <strong>Debug:</strong> ID: {submission.id} | Status: "{submission.status}" | Is Pending:{" "}
                          {submission.status === "PENDING" ? "YES" : "NO"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div>Loading users...</div>
                ) : !Array.isArray(users) ? (
                  <div>Error loading users</div>
                ) : users.length === 0 ? (
                  <div>No users found</div>
                ) : (
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-4 mb-2">
                              <span className="font-semibold">{user.name}</span>
                              <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                              {user.blocked && <Badge variant="destructive">Blocked</Badge>}
                            </div>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-500">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                          </div>
                          {user.role !== "admin" && (
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => toggleUserBlock(user.id, !user.blocked)}>
                                {user.blocked ? "Unblock" : "Block"}
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => deleteUser(user.id)}>
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
