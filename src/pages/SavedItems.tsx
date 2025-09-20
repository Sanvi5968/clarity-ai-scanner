import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Shield, Settings, Bell, HelpCircle, Lock, User, Bookmark, CheckCircle, XCircle, Calendar, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useState } from "react";

// Mock saved scans data
const mockSavedScans = [
  {
    id: "1",
    headline: "New Study Shows Coffee Reduces Risk of Heart Disease by 50%",
    status: "verified",
    savedDate: "2024-01-15",
    thumbnail: "📊"
  },
  {
    id: "4", 
    headline: "Climate Change Report Shows Accelerating Temperature Rise",
    status: "verified",
    savedDate: "2024-01-12",
    thumbnail: "🌡️"
  },
  {
    id: "3",
    headline: "Government Plans to Implement Digital Currency Next Month", 
    status: "inconclusive",
    savedDate: "2024-01-10",
    thumbnail: "💰"
  }
];

const SavedItems = () => {
  const [savedScans, setSavedScans] = useState(mockSavedScans);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "misinformation":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "inconclusive":
        return <HelpCircle className="h-4 w-4 text-warning" />;
      default:
        return <HelpCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const removeSavedScan = (id: string) => {
    setSavedScans(savedScans.filter(scan => scan.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gradient">Clarity AI</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Profile Section */}
        <Card className="p-6 mb-8 card-gradient">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">Fact-checking since January 2024</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="text-sm">
                  <span className="font-semibold text-primary">127</span>
                  <span className="text-muted-foreground ml-1">Scans</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-success">89</span>
                  <span className="text-muted-foreground ml-1">Verified</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-destructive">23</span>
                  <span className="text-muted-foreground ml-1">Misinformation</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Saved Scans Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold flex items-center">
              <Bookmark className="h-6 w-6 mr-2 text-primary" />
              Saved Scans
            </h3>
            <Badge variant="secondary">{savedScans.length} saved</Badge>
          </div>

          {savedScans.length > 0 ? (
            <div className="space-y-4">
              {savedScans.map((scan) => (
                <Card key={scan.id} className="p-4 card-gradient">
                  <div className="flex items-start justify-between">
                    <Link to={`/scan-results/${scan.id}`} className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-lg">
                          {scan.thumbnail}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground line-clamp-2 mb-2">
                            {scan.headline}
                          </h4>
                          <div className="flex items-center space-x-4">
                            {getStatusBadge(scan.status)}
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              Saved {new Date(scan.savedDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSavedScan(scan.id)}
                      className="ml-2 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">No saved scans yet</h4>
              <p className="text-muted-foreground mb-4">
                Save interesting scans to review them later
              </p>
              <Link to="/recent-scans">
                <Button>Browse Recent Scans</Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Settings Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <Settings className="h-6 w-6 mr-2 text-primary" />
            Settings
          </h3>
          
          <Card className="card-gradient">
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Account Settings</h4>
                      <p className="text-sm text-muted-foreground">Manage your profile and account</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Notification Preferences</h4>
                      <p className="text-sm text-muted-foreground">Get alerts on topics of interest</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Privacy Policy</h4>
                      <p className="text-sm text-muted-foreground">Learn how we protect your data</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Help & Support</h4>
                      <p className="text-sm text-muted-foreground">Get help using Clarity AI</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default SavedItems;