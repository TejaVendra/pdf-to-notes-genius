import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Lightbulb } from "lucide-react";

interface NotesSectionProps {
  onNext: () => void;
}

// Mock data for demonstration
const mockNotes = [
  {
    id: 1,
    topic: "Introduction to Machine Learning",
    summary: "Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed. It involves algorithms that can identify patterns, make predictions, and improve performance over time.",
    keyPoints: [
      "ML is a branch of AI focused on learning from data",
      "Three main types: supervised, unsupervised, and reinforcement learning",
      "Applications include image recognition, NLP, and recommendation systems",
      "Requires large datasets and computational power"
    ],
    workedExample: "Consider email spam detection: the algorithm trains on thousands of labeled emails (spam/not spam), learns patterns like specific words or sender characteristics, then can classify new emails automatically with high accuracy.",
    glossaryTerms: [
      { term: "Algorithm", definition: "A set of rules or instructions for solving a problem" },
      { term: "Training Data", definition: "Dataset used to teach the machine learning model" },
      { term: "Feature", definition: "Individual measurable properties of observed phenomena" }
    ],
    citations: ["Page 2-3", "Page 7"]
  },
  {
    id: 2,
    topic: "Supervised Learning Algorithms",
    summary: "Supervised learning uses labeled training data to learn a mapping function from inputs to outputs. Common algorithms include linear regression, decision trees, and neural networks, each with specific use cases and performance characteristics.",
    keyPoints: [
      "Requires labeled training examples",
      "Goal is to predict outputs for new inputs",
      "Classification vs regression problems",
      "Model evaluation using train/validation/test splits"
    ],
    workedExample: "Linear regression for house price prediction: using features like square footage, bedrooms, and location to predict price. The algorithm finds the best line through the data points to minimize prediction errors.",
    glossaryTerms: [
      { term: "Classification", definition: "Predicting discrete categories or classes" },
      { term: "Regression", definition: "Predicting continuous numerical values" },
      { term: "Overfitting", definition: "Model performs well on training data but poorly on new data" }
    ],
    citations: ["Page 12-15", "Page 18"]
  },
  {
    id: 3,
    topic: "Neural Networks and Deep Learning",
    summary: "Neural networks are computing systems inspired by biological neural networks. Deep learning uses multi-layer neural networks to learn complex patterns in data, enabling breakthroughs in computer vision, natural language processing, and game playing.",
    keyPoints: [
      "Inspired by biological neurons and synapses",
      "Multiple layers enable learning of hierarchical features",
      "Backpropagation algorithm for training",
      "Requires significant computational resources"
    ],
    workedExample: "Image classification CNN: first layers detect edges and simple shapes, middle layers combine these into object parts, final layers recognize complete objects like cats or dogs.",
    glossaryTerms: [
      { term: "Neuron", definition: "Basic processing unit that receives inputs and produces output" },
      { term: "Activation Function", definition: "Function that determines neuron output based on inputs" },
      { term: "Backpropagation", definition: "Algorithm for calculating gradients to update network weights" }
    ],
    citations: ["Page 24-28", "Page 31"]
  }
];

export const NotesSection = ({ onNext }: NotesSectionProps) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Generated Notes</h2>
          <p className="text-muted-foreground mt-1">
            Structured topic-wise summaries from your PDF
          </p>
        </div>
        
        <Button onClick={onNext} className="flex items-center space-x-2">
          <span>Practice Questions</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Notes Grid */}
      <div className="space-y-8">
        {mockNotes.map((note) => (
          <Card key={note.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-6">
              {/* Topic Header */}
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>{note.topic}</span>
                </h3>
                
                <div className="flex flex-wrap gap-1">
                  {note.citations.map((citation, idx) => (
                    <Badge key={idx} variant="outline" className="bg-citation text-citation-foreground text-xs">
                      {citation}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                  Summary
                </h4>
                <p className="text-foreground leading-relaxed">{note.summary}</p>
              </div>

              {/* Key Points */}
              <div>
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  Key Points
                </h4>
                <ul className="space-y-2">
                  {note.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Worked Example */}
              <div className="bg-highlight p-4 rounded-lg">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2 flex items-center space-x-1">
                  <Lightbulb className="h-4 w-4" />
                  <span>Worked Example</span>
                </h4>
                <p className="text-foreground leading-relaxed">{note.workedExample}</p>
              </div>

              {/* Glossary Terms */}
              <div>
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  Glossary Terms
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {note.glossaryTerms.map((term, idx) => (
                    <div key={idx} className="bg-muted p-3 rounded-lg">
                      <h5 className="font-medium text-sm">{term.term}</h5>
                      <p className="text-xs text-muted-foreground mt-1">{term.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};