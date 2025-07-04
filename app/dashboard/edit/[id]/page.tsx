"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Report {
  id: string
  phoneNumber: string
  message: string
  category: string
  status: string
}

export default function EditReportPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [report, setReport] = useState<Report | null>(null)
  const [loadingReport, setLoadingReport] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    phoneNumber: "",
    message: "",
    category: "",
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      fetchReport()
    }
  }, [user, loading, router])

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem("auth-token")
      const response = await fetch(`/api/submissions/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch report")
      }

      const data = await response.json()
      setReport(data)
      setFormData({
        phoneNumber: data.phoneNumber,
        message: data.message,
        category: data.category,
      })
    } catch (error) {
      setError("Failed to load report")
      console.error("Error fetching report:", error)
    } finally {
      setLoadingReport(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const token = localStorage.getItem("auth-token")
      const response = await fetch(`/api/submissions/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update report")
      }

      router.push("/dashboard")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update report")
      console.error("Error updating report:", error)
    }
  }

  if (loading || !user) {
    return <div>Loading...</div>
  }

  if (loadingReport) {
    return <div>Loading report...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!report) {
    return <div>Report not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Report</CardTitle>
            <CardDescription>Update the details of your phone number report</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SCAM">Scam</SelectItem>
                    <SelectItem value="SPAM">Spam</SelectItem>
                    <SelectItem value="TELEMARKETING">Telemarketing</SelectItem>
                    <SelectItem value="FRAUD">Fraud</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe the issue"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                  Cancel
                </Button>
                <Button type="submit">Update Report</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
} 