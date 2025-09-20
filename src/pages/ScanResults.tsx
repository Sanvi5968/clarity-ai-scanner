import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Share2, CheckCircle, XCircle, HelpCircle, ExternalLink, ArrowLeft, BookOpen, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { BottomNavigation } from "@/components/BottomNavigation";

// Mock data for scan results
const mockScanData = {
  "1": {
    headline: "New Study Shows Coffee Reduces Risk of Heart Disease by 50%",
    status: "verified",
    explanation: "This information matches data from multiple trusted medical sources and peer-reviewed studies.",
    confidence: 92,
    sources: [
      {
        title: "American Heart Association",
        snippet: "Multiple studies confirm moderate coffee consumption may reduce cardiovascular disease risk...",
        url: "https://heart.org/coffee-study",
        credibility: "High"
      },
      {
        title: "Harvard Medical School",
        snippet: "Research published in Circulation shows coffee's protective effects on heart health...", 
        url: "https://harvard.edu/coffee-research",
        credibility: "High"
      },
      {
        title: "Journal of the American Medical Association",
        snippet: "Meta-analysis of 15 studies demonstrates coffee's cardiovascular benefits...",
        url: "https://jama.org/coffee-meta-analysis",
        credibility: "Very High"
      }
    ],
    relatedScans: [
      { title: "Tea consumption and heart health", status: "verified" },
      { title: "Exercise reduces heart disease risk", status: "verified" }
    ]
  },
  "2": {
    headline: "Miracle Cure for Cancer Discovered by Local Doctor", 
    status: "misinformation",
    explanation: "This claim lacks scientific evidence and contradicts established medical research. No single 'miracle cure' for all cancers exists.",
    confidence: 94,
    sources: [
      {
        title: "National Cancer Institute",
        snippet: "No single treatment can cure all types of cancer. Beware of miracle cure claims...",
        url: "https://cancer.gov/treatment-facts",
        credibility: "Very High"
      },
      {
        title: "American Cancer Society",
        snippet: "Unproven cancer treatments can be dangerous and delay effective care...",
        url: "https://cancer.org/unproven-treatments", 
        credibility: "Very High"
      }
    ],
    relatedScans: [
      { title: "Cancer immunotherapy breakthroughs", status: "verified" },
      { title: "Alternative cancer treatment claims", status: "misinformation" }
    ]
  }
};

const ScanResults = () => {
  const { id } = useParams();
  const scanData = mockScanData[id as keyof typeof mockScanData];

  if (!scanData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Scan Not Found</h2>
          <Link to="/recent-scans">
            <Button>Back to Recent Scans</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "verified":
        return {
          icon: <CheckCircle className="h-12 w-12 text-success" />,
          badge: <Badge className="bg-success text-success-foreground text-lg px-4 py-2">Verified</Badge>,
          bgColor: "bg-success/5 border-success/20"
        };
      case "misinformation":
        return {
          icon: <XCircle className="h-12 w-12 text-destructive" />,
          badge: <Badge className="bg-destructive text-destructive-foreground text-lg px-4 py-2">Misinformation</Badge>,
          bgColor: "bg-destructive/5 border-destructive/20" 
        };
      case "inconclusive":
        return {
          icon: <HelpCircle className="h-12 w-12 text-warning" />,
          badge: <Badge className="bg-warning text-warning-foreground text-lg px-4 py-2">Inconclusive</Badge>,
          bgColor: "bg-warning/5 border-warning/20"
        };
      default:
        return {
          icon: <HelpCircle className="h-12 w-12 text-muted-foreground" />,
          badge: <Badge variant="secondary">Unknown</Badge>,
          bgColor: "bg-muted/20"
        };
    }
  };

  const statusDisplay = getStatusDisplay(scanData.status);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/recent-scans">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-gradient">Clarity AI</span>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Headline */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-4 leading-tight">
            {scanData.headline}
          </h1>
        </div>

        {/* Summary Section */}
        <Card className={`p-8 mb-8 border-2 ${statusDisplay.bgColor}`}>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {statusDisplay.icon}
            </div>
            <div className="mb-4">
              {statusDisplay.badge}
            </div>
            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-2">Confidence Level</div>
              <div className="text-2xl font-bold">{scanData.confidence}%</div>
            </div>
            <p className="text-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              {scanData.explanation}
            </p>
          </div>
        </Card>

        {/* Evidence Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-primary" />
            Supporting Evidence
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {scanData.sources.map((source, index) => (
              <AccordionItem key={index} value={`source-${index}`}>
                <Card className="card-gradient">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <div className="text-left">
                          <h3 className="font-semibold text-foreground">{source.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={source.credibility === "Very High" ? "default" : "secondary"} className="text-xs">
                              {source.credibility} Credibility
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {source.snippet}
                    </p>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <ExternalLink className="h-3 w-3" />
                      <span>View Full Source</span>
                    </Button>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Related Scans Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Related Scans
          </h3>
          
          <div className="space-y-3">
            {scanData.relatedScans.map((related, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer card-gradient">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">{related.title}</span>
                  <Badge 
                    className={
                      related.status === "verified" 
                        ? "bg-success/10 text-success border-success/20"
                        : related.status === "misinformation"
                        ? "bg-destructive/10 text-destructive border-destructive/20" 
                        : "bg-warning/10 text-warning border-warning/20"
                    }
                  >
                    {related.status === "verified" ? "Verified" : 
                     related.status === "misinformation" ? "Misinformation" : "Inconclusive"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ScanResults;