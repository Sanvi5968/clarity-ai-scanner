import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle, AlertTriangle, Search, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";
import { useState, useEffect } from "react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gradient">Clarity AI</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/recent-scans" className="text-muted-foreground hover:text-primary transition-colors">
              Recent Scans
            </Link>
            <Link to="/saved-items" className="text-muted-foreground hover:text-primary transition-colors">
              Saved Items
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden hero-bg">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating absolute top-20 left-10 w-3 h-3 bg-primary/30 rounded-full"></div>
          <div className="floating absolute top-40 right-20 w-2 h-2 bg-primary-glow/40 rounded-full"></div>
          <div className="floating absolute bottom-32 left-1/4 w-4 h-4 bg-primary/20 rounded-full"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className={`text-center max-w-4xl mx-auto transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-6xl font-bold mb-6 text-foreground">
              Separating Truth from <span className="text-gradient">Noise</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Harness the power of AI to combat misinformation. Get instant, reliable fact-checking 
              with evidence-backed analysis from trusted sources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/scan">
                <Button size="lg" className="px-8 py-6 text-lg shadow-glow hover:shadow-lg transition-all duration-300">
                  <Search className="mr-2 h-5 w-5" />
                  Start Detecting Misinformation
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Learn How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose Clarity AI?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology meets rigorous fact-checking standards
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 card-gradient hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mb-4">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Instant Verification</h4>
                <p className="text-muted-foreground">
                  Get real-time fact-checking results with comprehensive source analysis
                </p>
              </div>
            </Card>

            <Card className="p-6 card-gradient hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">AI-Powered Analysis</h4>
                <p className="text-muted-foreground">
                  Advanced machine learning algorithms ensure accurate detection
                </p>
              </div>
            </Card>

            <Card className="p-6 card-gradient hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full mb-4">
                  <Users className="h-6 w-6 text-warning" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Trusted Sources</h4>
                <p className="text-muted-foreground">
                  Cross-reference with reputable news outlets and official databases
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-accent/30 py-8">
        <div className="container mx-auto px-4">
          <Card className="p-6 border-warning/20 bg-warning/5">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-warning mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-warning-foreground mb-2">Important Disclaimer</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Clarity AI is a tool designed to assist in identifying potential misinformation through AI analysis. 
                  While we strive for accuracy, results should be considered as guidance and not absolute truth. 
                  Always verify important information through multiple trusted sources and use your own judgment. 
                  This tool is not a substitute for professional fact-checking or critical thinking.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-gradient">Clarity AI</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 Clarity AI. Fighting misinformation with artificial intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;