import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Search, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Community Protection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            PhoneGuard provides comprehensive tools to help you report, verify, and stay protected from suspicious phone
            numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <AlertTriangle className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Easy Reporting</CardTitle>
              <CardDescription>
                Quickly report suspicious phone numbers with detailed information about the call or message you
                received.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Simple form-based reporting</li>
                <li>• Multiple category options</li>
                <li>• Detailed message descriptions</li>
                <li>• Track your submission status</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Search className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Number Lookup</CardTitle>
              <CardDescription>
                Search any phone number to see if it has been reported by other users and what type of activity was
                reported.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Instant search results</li>
                <li>• Detailed report history</li>
                <li>• Risk level indicators</li>
                <li>• Community feedback</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Community Verification</CardTitle>
              <CardDescription>
                Our community and moderation team work together to verify reports and ensure accuracy of information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Expert moderation team</li>
                <li>• Community voting system</li>
                <li>• False positive prevention</li>
                <li>• Quality assurance</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Real-time Protection</CardTitle>
              <CardDescription>
                Get instant alerts and warnings when searching numbers that have been flagged by the community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Instant risk assessment</li>
                <li>• Color-coded warnings</li>
                <li>• Detailed threat information</li>
                <li>• Prevention recommendations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Verified Reports</CardTitle>
              <CardDescription>
                All reports go through a verification process to ensure accuracy and prevent false information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Multi-step verification process</li>
                <li>• Admin review and approval</li>
                <li>• Evidence-based validation</li>
                <li>• Quality control measures</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Analytics & Insights</CardTitle>
              <CardDescription>
                Track trends and patterns in phone scam activities to stay ahead of emerging threats in your area.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Trend analysis</li>
                <li>• Geographic insights</li>
                <li>• Threat pattern recognition</li>
                <li>• Community statistics</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Advanced Protection Features</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Individual Users</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  Personal dashboard to manage your reports
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  Edit and update your submissions
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  Track approval status of your reports
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  Receive notifications on status changes
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  Access to community insights
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Administrators</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  Comprehensive moderation dashboard
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  Bulk approval and rejection tools
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  User management and blocking capabilities
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  Advanced analytics and reporting
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  Export capabilities for data analysis
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security & Privacy Section */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security & Privacy First</h2>
            <p className="text-xl text-gray-600">Your data and privacy are our top priorities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Data Encryption</h3>
              <p className="text-gray-600">
                All data is encrypted in transit and at rest using industry-standard protocols
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Privacy Protection</h3>
              <p className="text-gray-600">We never share personal information and follow strict privacy guidelines</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Secure Authentication</h3>
              <p className="text-gray-600">
                Multi-factor authentication and secure login processes protect your account
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
