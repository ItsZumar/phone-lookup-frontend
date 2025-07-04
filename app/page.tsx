"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, Users, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Report {
  id: string;
  phoneNumber: string;
  category: string;
  status: string;
  createdAt: string;
  user: {
    name: string;
  };
}

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentReports, setRecentReports] = useState<Report[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [stats, setStats] = useState({ totalReports: 0, totalUsers: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchRecentReports();
    fetchStats();
  }, []);

  const fetchRecentReports = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/reports/public/recent`;
      console.log("Fetching recent reports from:", url);
      
      const response = await fetch(url);
      console.log("Response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Recent reports data:", data);
        setRecentReports(data);
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch recent reports:", response.status, errorText);
      }
    } catch (error) {
      console.error("Error fetching recent reports:", error);
    } finally {
      setLoadingReports(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        console.error("Failed to fetch stats:", response.status);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toUpperCase()) {
      case "SCAM":
        return "destructive";
      case "FRAUD":
        return "destructive";
      case "SPAM":
        return "secondary";
      case "TELEMARKETING":
        return "outline";
      default:
        return "secondary";
    }
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    // Basic phone number formatting
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phoneNumber;
  };

  const handleStartReporting = () => {
    if (user) {
      // User is logged in, redirect to create report page
      router.push("/dashboard/new-report");
    } else {
      // User is not logged in, redirect to signup page
      router.push("/signup");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Protect Yourself from
            <span className="text-primary block">Phone Scams</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our community-driven platform to report suspicious phone numbers and help others avoid scams, spam calls, and fraudulent
            activities.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Enter phone number to check..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto" onClick={handleStartReporting}>
              Start Reporting
            </Button>
            <Link href="/features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {loadingStats ? (
                  <div className="animate-pulse">...</div>
                ) : (
                  `${stats.totalReports.toLocaleString()}+`
                )}
              </div>
              <div className="text-gray-600">Numbers Reported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {loadingStats ? (
                  <div className="animate-pulse">...</div>
                ) : (
                  `${stats.totalUsers.toLocaleString()}+`
                )}
              </div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How PhoneGuard Works</h2>
            <p className="text-xl text-gray-600">Simple, effective protection through community collaboration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Report Suspicious Numbers</CardTitle>
                <CardDescription>
                  Easily report phone numbers that have contacted you with scams, spam, or fraudulent activities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Community Verification</CardTitle>
                <CardDescription>
                  Our community and moderation team verify reports to ensure accuracy and prevent false positives.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Stay Protected</CardTitle>
                <CardDescription>
                  Search any number before answering to see if others have reported it as suspicious or fraudulent.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Reports Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Reports</h2>
            <p className="text-xl text-gray-600">Latest suspicious numbers reported by our community</p>
          </div>

          {loadingReports ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading recent reports...</p>
            </div>
          ) : recentReports.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No recent reports available.</p>
              <Link href="/signup">
                <Button>Be the First to Report</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReports.map((report) => (
                <Card key={report.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-lg">{formatPhoneNumber(report.phoneNumber)}</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant={getCategoryColor(report.category)}>{report.category}</Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Reported by {report.user?.name || "Anonymous"}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/signup">
              <Button size="lg">Join the Community</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
