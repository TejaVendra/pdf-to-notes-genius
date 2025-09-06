import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X, Send, MessageCircle, User, Bot } from "lucide-react";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  citations?: string[];
  timestamp: Date;
}

const mockMessages: Message[] = [
  {
    id: 1,
    type: 'user',
    content: 'What are the main differences between supervised and unsupervised learning?',
    timestamp: new Date(Date.now() - 300000)
  },
  {
    id: 2,
    type: 'assistant',
    content: 'Based on your uploaded PDF, here are the key differences between supervised and unsupervised learning:\n\n**Supervised Learning:**\n- Uses labeled training data (input-output pairs)\n- Goal is to learn a mapping function from inputs to outputs\n- Examples: classification, regression\n- Performance can be measured against known correct answers\n\n**Unsupervised Learning:**\n- Works with unlabeled data\n- Goal is to discover hidden patterns or structures\n- Examples: clustering, dimensionality reduction\n- No ground truth to measure against directly',
    citations: ['Page 8-9', 'Page 15'],
    timestamp: new Date(Date.now() - 290000)
  }
];

export const ChatDrawer = ({ isOpen, onClose }: ChatDrawerProps) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'This is a simulated response based on your PDF content. In the full implementation, this would use RAG to retrieve relevant chunks and generate contextual answers using Gemini.',
        citations: ['Page 12', 'Page 18'],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-card border-l border-border shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Ask Questions</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.type === 'assistant' && (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  
                  {message.citations && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.citations.map((citation, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-citation text-citation-foreground">
                          {citation}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your PDF..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};