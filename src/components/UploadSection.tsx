import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  onNext: () => void;
}

export const UploadSection = ({ onFileUpload, onNext }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');
    
    if (pdfFile) {
      setUploadedFile(pdfFile);
      onFileUpload(pdfFile);
      toast({
        title: "PDF uploaded successfully",
        description: `${pdfFile.name} is ready for processing.`
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
    }
  }, [onFileUpload, toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      onFileUpload(file);
      toast({
        title: "PDF uploaded successfully",
        description: `${file.name} is ready for processing.`
      });
    }
  };

  const generateNotes = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    toast({
      title: "Notes generated!",
      description: "Your structured notes are ready to view."
    });
    
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
          Transform PDFs into Smart Notes
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload your class PDF and get structured topic-wise notes with citations, 
          glossary terms, and auto-generated practice questions.
        </p>
      </div>

      {/* Upload Card */}
      <Card className="p-8">
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
            isDragging 
              ? 'border-primary bg-highlight' 
              : 'border-border hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          {uploadedFile ? (
            <div className="space-y-4">
              <CheckCircle className="h-12 w-12 text-accent mx-auto" />
              <h3 className="text-lg font-semibold">File Ready</h3>
              <p className="text-muted-foreground">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-semibold">Upload Your PDF</h3>
              <p className="text-muted-foreground">
                Drag and drop your class PDF here, or click to browse
              </p>
              
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
            </div>
          )}
        </div>
      </Card>

      {/* Generate Button */}
      {uploadedFile && (
        <div className="text-center">
          <Button 
            onClick={generateNotes}
            disabled={isProcessing}
            size="lg"
            className="px-8"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                Processing PDF...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Generate Notes
              </>
            )}
          </Button>
        </div>
      )}

      {/* Features Preview */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card className="p-6 text-center">
          <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Structured Notes</h3>
          <p className="text-sm text-muted-foreground">
            Topic-wise summaries with key points and examples
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <Brain className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Practice Questions</h3>
          <p className="text-sm text-muted-foreground">
            MCQs and short answers with difficulty levels
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Source Citations</h3>
          <p className="text-sm text-muted-foreground">
            Every note linked to original PDF sections
          </p>
        </Card>
      </div>
    </div>
  );
};