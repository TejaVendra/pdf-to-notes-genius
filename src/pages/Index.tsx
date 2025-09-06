import { useState } from "react";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { NotesSection } from "@/components/NotesSection";
import { PracticeSection } from "@/components/PracticeSection";
import { ChatDrawer } from "@/components/ChatDrawer";

export type TabType = 'upload' | 'notes' | 'practice';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        uploadedFile={uploadedFile}
        onChatToggle={() => setIsChatOpen(!isChatOpen)}
      />
      
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'upload' && (
          <UploadSection 
            onFileUpload={setUploadedFile}
            onNext={() => setActiveTab('notes')}
          />
        )}
        
        {activeTab === 'notes' && (
          <NotesSection onNext={() => setActiveTab('practice')} />
        )}
        
        {activeTab === 'practice' && (
          <PracticeSection />
        )}
      </main>

      <ChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default Index;