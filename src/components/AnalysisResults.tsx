import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Brain, Fingerprint, Activity, FileText, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResultsProps {
  fileName: string;
  fileType: string;
  onReset: () => void;
}

const AnalysisResults = ({ fileName, fileType, onReset }: AnalysisResultsProps) => {
  const { toast } = useToast();
  
  // Enhanced simulated analysis with more realistic patterns
  const isDeepfake = Math.random() > 0.5;
  const confidenceScore = isDeepfake ? 82 + Math.random() * 15 : 8 + Math.random() * 25;
  const threatLevel = confidenceScore > 90 ? "CRITICAL" : confidenceScore > 75 ? "HIGH" : confidenceScore > 50 ? "MEDIUM" : "LOW";
  
  const detectionMetrics = [
    { 
      label: "Facial Manipulation Detection", 
      score: isDeepfake ? 76 + Math.random() * 20 : 3 + Math.random() * 18, 
      detected: isDeepfake,
      description: isDeepfake ? "Abnormal facial landmarks and unnatural skin textures detected" : "Natural facial features and consistent landmarks"
    },
    { 
      label: "Voice Synthesis Analysis", 
      score: isDeepfake ? 79 + Math.random() * 18 : 5 + Math.random() * 20, 
      detected: isDeepfake,
      description: isDeepfake ? "Artificial voice patterns and frequency anomalies identified" : "Authentic human voice characteristics present"
    },
    { 
      label: "Temporal Consistency Check", 
      score: isDeepfake ? 84 + Math.random() * 14 : 2 + Math.random() * 15, 
      detected: isDeepfake,
      description: isDeepfake ? "Frame-to-frame inconsistencies and temporal artifacts found" : "Smooth temporal flow and natural transitions"
    },
    { 
      label: "Audio-Visual Synchronization", 
      score: isDeepfake ? 72 + Math.random() * 22 : 4 + Math.random() * 16, 
      detected: isDeepfake,
      description: isDeepfake ? "Lip-sync errors and audio-visual misalignment detected" : "Perfect audio-visual synchronization maintained"
    },
    { 
      label: "Neural Network Artifacts", 
      score: isDeepfake ? 81 + Math.random() * 16 : 6 + Math.random() * 19, 
      detected: isDeepfake,
      description: isDeepfake ? "GAN-specific artifacts and compression patterns identified" : "No artificial generation patterns detected"
    },
    { 
      label: "Biometric Consistency", 
      score: isDeepfake ? 77 + Math.random() * 19 : 7 + Math.random() * 17, 
      detected: isDeepfake,
      description: isDeepfake ? "Inconsistent eye movements and unnatural blinking patterns" : "Natural biometric markers and consistent behavior"
    },
  ];

  const processingTime = (1.2 + Math.random() * 2.5).toFixed(2);
  const framesAnalyzed = Math.floor(450 + Math.random() * 850);
  const algorithmConfidence = (91 + Math.random() * 8).toFixed(1);

  const technicalDetails = [
    { label: "Processing Time", value: `${processingTime}s` },
    { label: "Model Version", value: "DeepGuard v5.3.2" },
    { label: "Analysis Date", value: new Date().toLocaleString() },
    { label: "File Type", value: fileType.split('/')[1].toUpperCase() },
    { label: "Frames Analyzed", value: framesAnalyzed.toString() },
    { label: "Algorithm Confidence", value: `${algorithmConfidence}%` },
  ];

  const getThreatColor = () => {
    switch (threatLevel) {
      case "CRITICAL": return "text-destructive";
      case "HIGH": return "text-destructive/80";
      case "MEDIUM": return "text-yellow-500";
      default: return "text-secondary";
    }
  };

  const handleDownloadReport = () => {
    const report = {
      fileName,
      fileType,
      analysisDate: new Date().toISOString(),
      verdict: isDeepfake ? "Deepfake Detected" : "Authentic Content",
      confidenceScore: confidenceScore.toFixed(1),
      threatLevel,
      detectionMetrics,
      technicalDetails,
      processingTime,
      framesAnalyzed,
      algorithmConfidence,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deepfake-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Full analysis report has been saved to your device.",
    });
  };

  const handleExportToDashboard = () => {
    toast({
      title: "Exported to Dashboard",
      description: "Analysis results have been successfully exported.",
    });
  };

  const handleAlertAuthorities = () => {
    toast({
      title: "Alert Sent",
      description: "Authorities have been notified about this deepfake content.",
      variant: "destructive",
    });
  };

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Analysis Results</h2>
            <p className="text-muted-foreground">{fileName}</p>
          </div>
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
            New Analysis
          </Button>
        </div>

        {/* Main Result Card */}
        <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Verdict */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${isDeepfake ? 'bg-destructive/10' : 'bg-secondary/10'}`}>
                  {isDeepfake ? (
                    <XCircle className="w-8 h-8 text-destructive" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-secondary" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    {isDeepfake ? "Deepfake Detected" : "Authentic Content"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isDeepfake 
                      ? "This content shows signs of artificial manipulation and synthesis"
                      : "No significant signs of deepfake manipulation detected"}
                  </p>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Confidence Score</span>
                  <span className="text-2xl font-bold text-primary">{confidenceScore.toFixed(1)}%</span>
                </div>
                <Progress value={confidenceScore} className="h-3" />
              </div>

              {/* Threat Level */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-5 h-5 ${getThreatColor()}`} />
                  <span className="font-medium">Threat Level</span>
                </div>
                <Badge variant={isDeepfake ? "destructive" : "secondary"} className="text-base px-4 py-1">
                  {threatLevel}
                </Badge>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              {technicalDetails.map((detail, index) => (
                <div key={index} className="p-3 bg-muted/20 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground mb-1">{detail.label}</div>
                  <div className="font-semibold text-sm">{detail.value}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Detection Metrics */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">Detection Metrics</h3>
          </div>
          <div className="space-y-5">
            {detectionMetrics.map((metric, index) => (
              <div key={index} className="space-y-2 p-4 bg-muted/10 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{metric.score.toFixed(1)}%</span>
                    {metric.detected ? (
                      <XCircle className="w-4 h-4 text-destructive" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-secondary" />
                    )}
                  </div>
                </div>
                <Progress 
                  value={metric.score} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Key Indicators */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center gap-2 mb-4">
              <Fingerprint className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold">Key Indicators</h3>
            </div>
            <ul className="space-y-3">
              {isDeepfake ? (
                <>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span className="font-medium">Inconsistent facial landmarks and unnatural micro-expressions</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span className="font-medium">Artificial voice frequency patterns and spectral anomalies</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span className="font-medium">Temporal glitches and frame interpolation artifacts</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span className="font-medium">Audio-visual desynchronization and lip-sync errors</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span className="font-medium">GAN artifacts and neural network compression patterns</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span className="font-medium">Abnormal blinking patterns and eye movement inconsistencies</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span className="font-medium">Natural facial movements and consistent landmarks</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span className="font-medium">Authentic voice characteristics and natural speech patterns</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span className="font-medium">Smooth temporal consistency across all frames</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span className="font-medium">Perfect audio-visual synchronization maintained</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span className="font-medium">No artificial generation or manipulation patterns</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span className="font-medium">Natural biometric markers and human behavior</span>
                  </li>
                </>
              )}
            </ul>
          </Card>

          {/* Recommendations */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Recommendations</h3>
            </div>
            <ul className="space-y-3">
              {isDeepfake ? (
                <>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span>Flag content for manual review by authorities</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span>Restrict distribution on social platforms</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span>Generate detailed forensic report</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">⚠</span>
                    <span>Notify content verification team</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Content cleared for distribution</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span>No further action required</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-secondary mt-1">✓</span>
                    <span>Periodic monitoring recommended</span>
                  </li>
                </>
              )}
            </ul>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={handleDownloadReport}>
            <FileText className="w-5 h-5" />
            Download Full Report
          </Button>
          <Button variant="outline" size="lg" onClick={handleExportToDashboard}>
            <TrendingUp className="w-5 h-5" />
            Export to Dashboard
          </Button>
          {isDeepfake && (
            <Button variant="alert" size="lg" onClick={handleAlertAuthorities}>
              <AlertTriangle className="w-5 h-5" />
              Alert Authorities
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalysisResults;
