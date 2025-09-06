import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, Brain, Upload } from "lucide-react";
import { TabType } from "@/pages/Index";

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  uploadedFile: File | null;
  onChatToggle: () => void;
}

export const Header = ({ activeTab, setActiveTab, uploadedFile, onChatToggle }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">PDF Copilot</h1>
            </div>
            
            <nav className="flex items-center space-x-1">
              <Button
                variant={activeTab === 'upload' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('upload')}
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Button>
              
              <Button
                variant={activeTab === 'notes' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('notes')}
                disabled={!uploadedFile}
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Notes</span>
              </Button>
              
              <Button
                variant={activeTab === 'practice' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('practice')}
                disabled={!uploadedFile}
                className="flex items-center space-x-2"
              >
                <Brain className="h-4 w-4" />
                <span>Practice</span>
              </Button>
            </nav>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onChatToggle}
            className="flex items-center space-x-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Ask Questions</span>
          </Button>
        </div>
      </div>
    </header>
  );
};