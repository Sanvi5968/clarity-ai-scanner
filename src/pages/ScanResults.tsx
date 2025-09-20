import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Share2, CheckCircle, XCircle, HelpCircle, ExternalLink, ArrowLeft, BookOpen, Clock, Link2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { BottomNavigation } from "@/components/BottomNavigation";

// Mock data for scan results - Enhanced with URLs and better detection
const mockScanData = {
  "1": {
    headline: "New Study Shows Coffee Reduces Risk of Heart Disease by 50%",
    status: "verified",
    explanation: "This information matches data from multiple trusted medical sources and peer-reviewed studies.",
    confidence: 92,
    scannedUrl: "https://reuters.com/health/coffee-heart-study-2024",
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
    headline: "Miracle Cure for Cancer Discovered by Local Doctor - They Don't Want You to Know!", 
    status: "misinformation",
    explanation: "This content promotes dangerous misinformation by claiming a single doctor has discovered a cure for all cancers. Such claims lack scientific evidence and can delay proper medical treatment.",
    confidence: 96,
    scannedUrl: "https://fake-health-blog.com/miracle-cure-cancer",
    sources: [
      {
        title: "National Cancer Institute",
        snippet: "No single treatment can cure all types of cancer. Be wary of miracle cure claims that lack peer review...",
        url: "https://cancer.gov/treatment-facts",
        credibility: "Very High"
      },
      {
        title: "American Cancer Society",
        snippet: "Unproven cancer treatments can be dangerous and delay effective, evidence-based care...",
        url: "https://cancer.org/unproven-treatments", 
        credibility: "Very High"
      },
      {
        title: "Medical Misinformation Database",
        snippet: "This type of 'miracle cure' claim is a common pattern in health misinformation...",
        url: "https://healthfacts.org/miracle-claims",
        credibility: "High"
      }
    ],
    relatedScans: [
      { title: "Cancer immunotherapy breakthroughs", status: "verified" },
      { title: "Alternative cancer treatment claims", status: "misinformation" }
    ]
  },
  "3": {
    headline: "Government Plans to Implement Digital Currency Next Month",
    status: "inconclusive",
    explanation: "This claim lacks official confirmation from government sources. While digital currency discussions are ongoing, no concrete timeline has been officially announced.",
    confidence: 45,
    scannedUrl: "https://crypto-rumors-blog.com/government-digital-currency",
    sources: [
      {
        title: "Federal Reserve Communications",
        snippet: "The Fed continues to research digital currencies but has not announced implementation dates...",
        url: "https://federalreserve.gov/cbdc-research",
        credibility: "Very High"
      }
    ],
    relatedScans: [
      { title: "Digital currency pilot programs", status: "verified" },
      { title: "Cryptocurrency regulation updates", status: "verified" }
    ]
  },
  "4": {
    headline: "Climate Change Report Shows Accelerating Temperature Rise",
    status: "verified", 
    explanation: "This information aligns with the latest scientific consensus and data from multiple climate research institutions.",
    confidence: 91,
    scannedUrl: "https://nasa.gov/climate-change-report-2024",
    sources: [
      {
        title: "NASA Goddard Institute",
        snippet: "Latest climate data confirms accelerating global temperature trends...",
        url: "https://nasa.gov/giss/temperature-data",
        credibility: "Very High"
      },
      {
        title: "IPCC Climate Report 2024",
        snippet: "Comprehensive analysis shows continued warming trends exceeding previous projections...",
        url: "https://ipcc.ch/report-2024",
        credibility: "Very High"
      }
    ],
    relatedScans: [
      { title: "Arctic ice melting acceleration", status: "verified" },
      { title: "Climate change adaptation strategies", status: "verified" }
    ]
  },
  "5": {
    headline: "5G Towers Cause COVID-19 Symptoms - Scientists Confirm Link",
    status: "misinformation",
    explanation: "This is a dangerous conspiracy theory that has been thoroughly debunked by health authorities worldwide. There is no scientific evidence linking 5G technology to COVID-19.",
    confidence: 98,
    scannedUrl: "https://conspiracy-theories.net/5g-covid-connection",
    sources: [
      {
        title: "World Health Organization",
        snippet: "WHO confirms no link between 5G networks and COVID-19. Viruses cannot spread through radio waves...",
        url: "https://who.int/5g-covid-facts",
        credibility: "Very High"
      },
      {
        title: "Federal Communications Commission",
        snippet: "FCC confirms 5G technology poses no health risks when deployed within safety guidelines...",
        url: "https://fcc.gov/5g-safety",
        credibility: "Very High"
      },
      {
        title: "Scientific Consensus Database",
        snippet: "Multiple peer-reviewed studies find no causal relationship between 5G and health issues...",
        url: "https://scienceconsensus.org/5g-studies",
        credibility: "High"
      }
    ],
    relatedScans: [
      { title: "5G health studies review", status: "verified" },
      { title: "COVID-19 transmission mechanisms", status: "verified" }
    ]
  }
};

// Function to generate mock scan results for new scans
const generateMockScanResult = (content: string, type: 'url' | 'text') => {
  // Analyze content to determine if it's likely misinformation
  const lowerContent = content.toLowerCase();
  
  // Keywords that suggest misinformation
  const misinfoKeywords = ['miracle cure', 'doctors hate', 'secret', 'conspiracy', 'big pharma', 'government coverup', 'they don\'t want you to know'];
  const dangerousKeywords = ['vaccine dangerous', 'covid hoax', 'flat earth', '5g causes', 'chemtrails'];
  
  // Keywords that suggest verified information
  const verifiedKeywords = ['study shows', 'research indicates', 'according to scientists', 'peer reviewed', 'clinical trial'];
  const trustedDomains = ['reuters.com', 'bbc.com', 'cnn.com', 'nasa.gov', 'who.int', 'cdc.gov', 'harvard.edu'];
  
  let status = 'inconclusive';
  let confidence = 65;
  let explanation = 'This information requires further verification. We could not find sufficient evidence from trusted sources.';
  
  // Check for misinformation indicators
  if (misinfoKeywords.some(keyword => lowerContent.includes(keyword))) {
    status = 'misinformation';
    confidence = Math.floor(Math.random() * 15) + 85; // 85-99%
    explanation = 'This content contains claims that lack scientific evidence and contradict established facts from trusted sources.';
  } else if (dangerousKeywords.some(keyword => lowerContent.includes(keyword))) {
    status = 'misinformation';
    confidence = Math.floor(Math.random() * 10) + 90; // 90-99%
    explanation = 'This content promotes potentially dangerous misinformation that contradicts scientific consensus and public health guidance.';
  } else if (verifiedKeywords.some(keyword => lowerContent.includes(keyword)) || 
             (type === 'url' && trustedDomains.some(domain => content.includes(domain)))) {
    status = 'verified';
    confidence = Math.floor(Math.random() * 15) + 80; // 80-94%
    explanation = 'This information aligns with data from multiple trusted sources and appears to be factually accurate.';
  }
  
  return {
    headline: type === 'url' ? `Content from: ${content}` : content.substring(0, 100) + '...',
    status,
    explanation,
    confidence,
    scannedUrl: type === 'url' ? content : null,
    sources: [
      {
        title: "Fact-Check Database",
        snippet: "Cross-referenced with our comprehensive fact-checking database...",
        url: "https://factcheck-db.com",
        credibility: "High"
      }
    ],
    relatedScans: []
  };
};

const ScanResults = () => {
  const { id } = useParams();
  let scanData = mockScanData[id as keyof typeof mockScanData];

  // If not found in mock data, try to get from localStorage (for new scans)
  if (!scanData) {
    const storedScan = localStorage.getItem(`scan_${id}`);
    if (storedScan) {
      const parsedScan = JSON.parse(storedScan);
      scanData = generateMockScanResult(parsedScan.content, parsedScan.type);
      // Add the scanned URL if it exists
      if (parsedScan.scannedUrl) {
        scanData.scannedUrl = parsedScan.scannedUrl;
      }
    }
  }

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
        {/* Headline and URL */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-4 leading-tight">
            {scanData.headline}
          </h1>
          {scanData.scannedUrl && (
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center space-x-2">
                <Link2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">Scanned URL:</p>
                  <a 
                    href={scanData.scannedUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline break-all"
                  >
                    {scanData.scannedUrl}
                  </a>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            </Card>
          )}
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