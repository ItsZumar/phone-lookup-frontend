"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Phone, MessageSquare, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  id: string;
  phoneNumber: string;
  name: string;
  message: string;
  category: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function SearchPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    // If there's a search query in the URL, perform the search
    const query = searchParams.get("q");
    if (query && user) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [user, loading, router, searchParams]);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setError(null);
    setHasSearched(true);

    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(`/api/search?phoneNumber=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data || []);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to search");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setError("An error occurred while searching");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update URL with search query
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Phone Numbers</h1>
          <p className="text-gray-600 mt-2">
            Search for phone numbers to see if they have been reported by our community
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Reports</CardTitle>
            <CardDescription>
              Enter a phone number to check if it has been reported as suspicious
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Enter phone number (e.g., 555-123-4567)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isSearching}>
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search Results */}
        {hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                {isSearching
                  ? "Searching..."
                  : searchResults.length === 0
                  ? `No reports found for "${searchQuery}"`
                  : `${searchResults.length} report(s) found for "${searchQuery}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSearching ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-gray-600">Searching...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">
                    No reports found for this phone number. This could mean:
                  </p>
                  <ul className="text-gray-500 text-sm space-y-1 mb-6">
                    <li>• The number hasn't been reported yet</li>
                    <li>• The number is safe and legitimate</li>
                    <li>• Reports may be pending verification</li>
                  </ul>
                  <Link href="/dashboard/new-report">
                    <Button>
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Report This Number
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <span className="font-mono text-lg">{result.phoneNumber}</span>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(result.status)}
                            <Badge
                              variant={
                                result.status === "approved"
                                  ? "default"
                                  : result.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {result.status}
                            </Badge>
                          </div>
                          <Badge variant="outline">{result.category}</Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">
                        <strong>Reported by:</strong> {result.name}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Message:</strong> {result.message}
                      </p>
                      <p className="text-sm text-gray-500">
                        Reported on {new Date(result.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        {hasSearched && searchResults.length > 0 && (
          <div className="mt-8 text-center">
            <Link href="/dashboard/new-report">
              <Button variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Another Number
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
} 