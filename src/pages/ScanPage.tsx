import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Shield, Search, Link2, FileText, Zap, AlertTriangle, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const ScanPage = () => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock scanning process
  const performScan = async (content: string, type: 'url' | 'text') => {
    setIsScanning(true);
    setProgress(0);

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    clearInterval(progressInterval);
    setProgress(100);

    // Create a mock scan result based on content
    const scanId = Math.random().toString(36).substr(2, 9);
    
    // Store scan data in localStorage for demo purposes
    const scanData = {
      id: scanId,
      content: content,
      type: type,
      timestamp: new Date().toISOString(),
      scannedUrl: type === 'url' ? content : null
    };
    
    localStorage.setItem(`scan_${scanId}`, JSON.stringify(scanData));

    // Navigate to results
    setTimeout(() => {
      setIsScanning(false);
      setProgress(0);
      navigate(`/scan-results/${scanId}`);
    }, 500);
  };

  const handleUrlScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      toast({
        title: "Error", 
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
      return;
    }

    await performScan(url, 'url');
  };

  const handleTextScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to scan",
        variant: "destructive",
      });
      return;
    }

    if (text.length < 20) {
      toast({
        title: "Error",
        description: "Please enter at least 20 characters for accurate analysis",
        variant: "destructive",
      });
      return;
    }

    await performScan(text, 'text');
  };

  // Quick scan examples
  const quickScanExamples = [
    {
      title: "COVID-19 Vaccine Misinformation",
      url: "https://example-fake-news.com/vaccines-dangerous",
      type: "Likely Misinformation"
    },
    {
      title: "Climate Science Article",
      url: "https://nasa.gov/climate-change-report",
      type: "Verified Source"
    },
    {
      title: "Health Miracle Cure",
      url: "https://fake-health-blog.com/miracle-cure",
      type: "Potentially Dangerous"
    }
  ];

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
            <Link to="/recent-scans">
              <Button variant="outline" size="sm">
                View Recent Scans
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Scan for Misinformation</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter a URL or paste text content to get instant AI-powered fact-checking and misinformation detection
          </p>
        </div>

        {/* Scanning Progress */}
        {isScanning && (
          <Card className="p-6 mb-8 card-gradient">
            <div className="text-center">
              <div className="scan-pulse inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyzing Content...</h3>
              <p className="text-muted-foreground mb-4">
                Our AI is cross-referencing with trusted sources and fact-checking databases
              </p>
              <div className="max-w-md mx-auto">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
              </div>
            </div>
          </Card>
        )}

        {/* Scan Tabs */}
        {!isScanning && (
          <Tabs defaultValue="url" className="max-w-2xl mx-auto mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center space-x-2">
                <Link2 className="h-4 w-4" />
                <span>Scan URL</span>
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Scan Text</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="mt-6">
              <Card className="p-6 card-gradient">
                <form onSubmit={handleUrlScan} className="space-y-4">
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium mb-2">
                      Website URL
                    </label>
                    <Input
                      id="url"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/article-to-verify"
                      className="w-full"
                      disabled={isScanning}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter the full URL of the article, blog post, or news story you want to verify
                    </p>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isScanning}>
                    <Zap className="h-4 w-4 mr-2" />
                    Scan URL for Misinformation
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="text" className="mt-6">
              <Card className="p-6 card-gradient">
                <form onSubmit={handleTextScan} className="space-y-4">
                  <div>
                    <label htmlFor="text" className="block text-sm font-medium mb-2">
                      Text Content
                    </label>
                    <Textarea
                      id="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Paste the text content, news article, social media post, or any claim you want to fact-check..."
                      className="w-full h-32 resize-none"
                      disabled={isScanning}
                    />
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-muted-foreground">
                        Minimum 20 characters required for accurate analysis
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {text.length} characters
                      </span>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={isScanning}>
                    <Zap className="h-4 w-4 mr-2" />
                    Analyze Text for Misinformation
                  </Button>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Quick Scan Examples */}
        {!isScanning && (
          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Try These Examples</h3>
            <div className="space-y-3">
              {quickScanExamples.map((example, index) => (
                <Card key={index} className="p-4 card-gradient hover:shadow-md transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{example.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{example.url}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {example.type === "Verified Source" && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                      {example.type === "Likely Misinformation" && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                      {example.type === "Potentially Dangerous" && (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setUrl(example.url);
                        }}
                      >
                        Try
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* How It Works Section */}
        {!isScanning && (
          <div className="max-w-2xl mx-auto mt-12">
            <Card className="p-6 card-gradient">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                How Our Detection Works
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <p>AI analyzes the content structure, claims, and language patterns</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <p>Cross-references facts with trusted databases and recent news</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <p>Provides confidence score and evidence from credible sources</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ScanPage;