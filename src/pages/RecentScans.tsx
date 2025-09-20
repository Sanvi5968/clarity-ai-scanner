import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Shield, Search, CheckCircle, XCircle, HelpCircle, Calendar, ExternalLink, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useState } from "react";

// Mock data for recent scans
const mockScans = [
  {
    id: "1",
    headline: "New Study Shows Coffee Reduces Risk of Heart Disease by 50%",
    snippet: "A groundbreaking study published in the Journal of Medicine reveals...",
    status: "verified",
    timestamp: "2 hours ago",
    source: "Reuters Health",
    thumbnail: "📊"
  },
  {
    id: "2", 
    headline: "Miracle Cure for Cancer Discovered by Local Doctor",
    snippet: "Dr. Smith claims his revolutionary treatment can cure any cancer...",
    status: "misinformation",
    timestamp: "5 hours ago",
    source: "Social Media Post",
    thumbnail: "🔬"
  },
  {
    id: "3",
    headline: "Government Plans to Implement Digital Currency Next Month",
    snippet: "Sources suggest major policy changes are coming to the financial sector...",
    status: "inconclusive", 
    timestamp: "1 day ago",
    source: "Unknown Blog",
    thumbnail: "💰"
  },
  {
    id: "4",
    headline: "Climate Change Report Shows Accelerating Temperature Rise",
    snippet: "The latest IPCC report indicates global temperatures are rising faster...",
    status: "verified",
    timestamp: "2 days ago",
    source: "Scientific Journal",
    thumbnail: "🌡️"
  },
  {
    id: "5",
    headline: "Vaccination Rates Drop to Historic Lows Amid Safety Concerns",
    snippet: "New data shows declining vaccination rates across multiple regions...",
    status: "inconclusive",
    timestamp: "3 days ago", 
    source: "Health Department",
    thumbnail: "💉"
  }
];

const RecentScans = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "misinformation":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "inconclusive":
        return <HelpCircle className="h-5 w-5 text-warning" />;
      default:
        return <HelpCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-success/10 text-success border-success/20">Verified</Badge>;
      case "misinformation":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Misinformation</Badge>;
      case "inconclusive":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Inconclusive</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredScans = mockScans.filter(scan => 
    scan.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scan.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gradient">Clarity AI</h1>
            </Link>
            <Button size="sm" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Scan</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Recent Scans</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recent scans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Scans List */}
        <div className="space-y-4">
          {filteredScans.map((scan) => (
            <Link key={scan.id} to={`/scan-results/${scan.id}`}>
              <Card className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer card-gradient">
                <div className="flex items-start space-x-4">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl">
                    {scan.thumbnail}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                        {scan.headline}
                      </h3>
                      <div className="flex-shrink-0 ml-4">
                        {getStatusIcon(scan.status)}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {scan.snippet}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusBadge(scan.status)}
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {scan.timestamp}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {scan.source}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredScans.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No scans found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms" : "Start by scanning some content for misinformation"}
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default RecentScans;