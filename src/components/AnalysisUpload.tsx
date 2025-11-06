import { useState, useCallback } from "react";
import { Upload, FileVideo, FileAudio, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import AnalysisResults from "./AnalysisResults";

const AnalysisUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      setShowResults(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = [
      // Video formats
      'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 
      'video/avi', 'video/x-matroska', 'video/mkv', 'video/x-flv', 'video/mpeg',
      // Audio formats
      'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/x-m4a', 'audio/mp4'
    ];
    const maxSize = 5 * 1024 * 1024 * 1024; // 5GB

    // Check file extension as fallback if MIME type is not recognized
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'flv', 'mpeg', 'mpg', 'mp3', 'wav', 'm4a'];
    
    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension || '')) {
      toast.error("Invalid file type. Please upload a video or audio file.");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File size exceeds 5GB limit.");
      return false;
    }

    return true;
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      setShowResults(false);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsAnalyzing(false);
    setShowResults(true);
    toast.success("Analysis complete!");
  };

  const removeFile = () => {
    setFile(null);
    setShowResults(false);
  };

  if (showResults && file) {
    return <AnalysisResults fileName={file.name} fileType={file.type} onReset={removeFile} />;
  }

  return (
    <section id="analysis" className="py-20 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Upload Content for <span className="text-primary">Analysis</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload video or audio files for real-time deepfake detection and comprehensive analysis
          </p>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 ${
              dragActive 
                ? "border-primary bg-primary/5 scale-105" 
                : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="p-6 bg-primary/10 rounded-full">
                    <Upload className="w-12 h-12 text-primary" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Drop your file here</h3>
                  <p className="text-muted-foreground">
                    or click to browse
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <FileVideo className="w-4 h-4" />
                    Video
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="flex items-center gap-2">
                    <FileAudio className="w-4 h-4" />
                    Audio
                  </div>
                </div>

                <input
                  type="file"
                  accept="video/*,audio/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {file.type.startsWith('video/') ? (
                      <FileVideo className="w-8 h-8 text-primary" />
                    ) : (
                      <FileAudio className="w-8 h-8 text-secondary" />
                    )}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    disabled={isAnalyzing}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Start Analysis"
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Supported formats: MP4, AVI, MKV, MOV, WebM, FLV, MPEG (video) | MP3, WAV, M4A, OGG (audio) • Max size: 5GB
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AnalysisUpload;
