"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Phone, MessageSquare, Search, User } from "lucide-react"
import Link from "next/link"

interface Submission {
  id: string
  phoneNumber: string
  name: string
  message: string
  category: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loadingSubmissions, setLoadingSubmissions] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      fetchSubmissions()
    }
  }, [user, loading, router])

  useEffect(() => {
    // Filter submissions based on search query
    if (searchQuery.trim()) {
      const filtered = submissions.filter(submission =>
        submission.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredSubmissions(filtered)
    } else {
      setFilteredSubmissions(submissions)
    }
  }, [searchQuery, submissions])

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem("auth-token")
      const response = await fetch("/api/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setSubmissions(data || [])
        setFilteredSubmissions(data || [])
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error)
    } finally {
      setLoadingSubmissions(false)
    }
  }

  const deleteSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(`/api/submissions/${id}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete submission");
      }

      // Remove the deleted submission from the state
      setSubmissions(submissions.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Failed to delete submission:", error);
      alert(error instanceof Error ? error.message : "Failed to delete submission");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };

  if (loading || !user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name}! Manage your phone number reports here.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {submissions?.filter((s) => s.status === "approved").length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {submissions?.filter((s) => s.status === "pending").length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard/new-report">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search All Reports
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              Profile Settings
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Your Reports</CardTitle>
            <CardDescription>Filter your reports by phone number, message, or category</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search by phone number, message, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Reports</CardTitle>
            <CardDescription>
              {searchQuery 
                ? `Showing ${filteredSubmissions.length} of ${submissions.length} reports matching "${searchQuery}"`
                : "Manage all your phone number reports and track their status"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingSubmissions ? (
              <div>Loading submissions...</div>
            ) : submissions?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't submitted any reports yet.</p>
                <Link href="/dashboard/new-report">
                  <Button>Create Your First Report</Button>
                </Link>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No reports found matching your search.</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubmissions.map((submission) => (
                  <div key={submission.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <span className="font-mono text-lg">{submission.phoneNumber}</span>
                        <Badge
                          variant={
                            submission.status === "approved"
                              ? "default"
                              : submission.status === "rejected"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {submission.status}
                        </Badge>
                        <Badge variant="outline">{submission.category}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/dashboard/new-report?edit=${submission.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => deleteSubmission(submission.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">
                      <strong>Name:</strong> {submission.name}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>Message:</strong> {submission.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      Submitted on {new Date(submission.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
