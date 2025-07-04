"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Target, Award } from "lucide-react"

export default function AboutPage() {
  const [stats, setStats] = useState({ totalReports: 0, totalUsers: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About PhoneGuard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to protect communities from phone scams and fraudulent activities through collaborative
            reporting and verification.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                Every day, millions of people receive unwanted calls from scammers, fraudsters, and spam callers. These
                calls not only waste time but can also lead to financial losses and emotional distress.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                PhoneGuard was created to empower communities to fight back against these threats by sharing information
                about suspicious phone numbers and helping others avoid falling victim to scams.
              </p>
              <p className="text-lg text-gray-600">
                Through our platform, users can report suspicious numbers, search for information about unknown callers,
                and contribute to a safer communication environment for everyone.
              </p>
            </div>
            <div className="flex justify-center">
              <Shield className="h-64 w-64 text-primary opacity-20" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Community First</h3>
                <p className="text-gray-600">We believe in the power of community collaboration to solve problems</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Privacy & Security</h3>
                <p className="text-gray-600">Your data and privacy are protected with the highest standards</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Accuracy</h3>
                <p className="text-gray-600">We ensure all reports are verified and accurate through moderation</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600">We strive for excellence in everything we do to serve our users</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How PhoneGuard Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Report</h3>
              <p className="text-gray-600">
                Users report suspicious phone numbers with detailed information about their experience
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verify</h3>
              <p className="text-gray-600">
                Our moderation team and community verify reports to ensure accuracy and prevent false information
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Protect</h3>
              <p className="text-gray-600">
                Verified information is made available to help others identify and avoid suspicious numbers
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Impact</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                {loadingStats ? (
                  <div className="animate-pulse">...</div>
                ) : (
                  `${stats.totalReports.toLocaleString()}+`
                )}
              </div>
              <div className="text-gray-600">Numbers Reported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                {loadingStats ? (
                  <div className="animate-pulse">...</div>
                ) : (
                  `${stats.totalUsers.toLocaleString()}+`
                )}
              </div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Built by a Dedicated Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            PhoneGuard is developed and maintained by a team of security experts, developers, and community advocates
            who are passionate about protecting people from phone-based threats. We work around the clock to ensure our
            platform remains effective, secure, and user-friendly.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
