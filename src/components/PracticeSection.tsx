import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Brain, RotateCcw } from "lucide-react";

// Mock practice questions
const mockQuestions = [
  {
    id: 1,
    type: "mcq",
    difficulty: "easy",
    question: "What is the main goal of supervised learning?",
    options: [
      "To find hidden patterns in unlabeled data",
      "To learn a mapping from inputs to outputs using labeled examples",
      "To maximize rewards through trial and error",
      "To reduce the dimensionality of data"
    ],
    correctAnswer: 1,
    explanation: "Supervised learning uses labeled training data to learn a function that maps inputs to outputs, enabling prediction on new data.",
    citations: ["Page 12"]
  },
  {
    id: 2,
    type: "mcq",
    difficulty: "medium",
    question: "Which of the following is NOT a characteristic of neural networks?",
    options: [
      "They are inspired by biological neurons",
      "They always require labeled training data",
      "They can learn hierarchical features through multiple layers",
      "They use backpropagation for training"
    ],
    correctAnswer: 1,
    explanation: "Neural networks can be used in unsupervised learning (e.g., autoencoders) and don't always require labeled data.",
    citations: ["Page 24-25"]
  },
  {
    id: 3,
    type: "short",
    difficulty: "medium",
    question: "Explain the difference between classification and regression in supervised learning. Provide one example of each.",
    sampleAnswer: "Classification predicts discrete categories or classes (e.g., email spam detection - spam/not spam), while regression predicts continuous numerical values (e.g., house price prediction based on features like size and location).",
    citations: ["Page 15"]
  },
  {
    id: 4,
    type: "mcq",
    difficulty: "easy",
    question: "What is overfitting in machine learning?",
    options: [
      "When a model performs poorly on both training and test data",
      "When a model performs well on training data but poorly on new data",
      "When a model is too simple to capture the underlying pattern",
      "When a model takes too long to train"
    ],
    correctAnswer: 1,
    explanation: "Overfitting occurs when a model learns the training data too well, including noise, making it unable to generalize to new data.",
    citations: ["Page 18"]
  },
  {
    id: 5,
    type: "short",
    difficulty: "hard",
    question: "Describe how backpropagation works in neural networks and why it's important for training.",
    sampleAnswer: "Backpropagation calculates gradients by propagating errors backward through the network layers. It computes how much each weight contributed to the error and updates weights to minimize loss. It's essential because it enables efficient training of multi-layer networks by determining optimal weight adjustments.",
    citations: ["Page 28"]
  }
];

interface Answer {
  questionId: number;
  answer: string | number;
}

export const PracticeSection = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleMCQAnswer = (questionId: number, answer: number) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, answer } : a);
      }
      return [...prev, { questionId, answer }];
    });
  };

  const handleShortAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, answer } : a);
      }
      return [...prev, { questionId, answer }];
    });
  };

  const getAnswer = (questionId: number) => {
    return answers.find(a => a.questionId === questionId)?.answer;
  };

  const isAnswerCorrect = (question: any) => {
    const userAnswer = getAnswer(question.id);
    if (question.type === 'mcq') {
      return userAnswer === question.correctAnswer;
    }
    return userAnswer && userAnswer.toString().length > 10; // Basic check for short answers
  };

  const getMCQScore = () => {
    const mcqQuestions = mockQuestions.filter(q => q.type === 'mcq');
    const correct = mcqQuestions.filter(q => isAnswerCorrect(q)).length;
    return { correct, total: mcqQuestions.length };
  };

  const reset = () => {
    setAnswers([]);
    setShowResults(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Practice Questions</h2>
          <p className="text-muted-foreground mt-1">
            Test your understanding with auto-generated questions
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={reset} className="flex items-center space-x-2">
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>
          
          <Button 
            onClick={() => setShowResults(!showResults)}
            variant={showResults ? "secondary" : "default"}
            className="flex items-center space-x-2"
          >
            <Brain className="h-4 w-4" />
            <span>{showResults ? "Hide Results" : "Check Answers"}</span>
          </Button>
        </div>
      </div>

      {/* Score Summary */}
      {showResults && (
        <Card className="p-6 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="flex items-center space-x-4">
            <CheckCircle className="h-8 w-8 text-accent" />
            <div>
              <h3 className="font-semibold">Quiz Results</h3>
              <p className="text-muted-foreground">
                MCQ Score: {getMCQScore().correct}/{getMCQScore().total} correct
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {mockQuestions.map((question) => (
          <Card key={question.id} className="p-6">
            <div className="space-y-4">
              {/* Question Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Badge variant={question.difficulty === 'easy' ? 'secondary' : question.difficulty === 'medium' ? 'default' : 'destructive'}>
                    {question.difficulty}
                  </Badge>
                  <Badge variant="outline" className="bg-citation text-citation-foreground">
                    {question.citations[0]}
                  </Badge>
                  {showResults && (
                    <div className="flex items-center">
                      {isAnswerCorrect(question) ? (
                        <CheckCircle className="h-5 w-5 text-accent" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Question */}
              <h3 className="text-lg font-medium leading-relaxed">
                {question.id}. {question.question}
              </h3>

              {/* Answer Section */}
              {question.type === 'mcq' ? (
                <RadioGroup
                  value={getAnswer(question.id)?.toString()}
                  onValueChange={(value) => handleMCQAnswer(question.id, parseInt(value))}
                  className="space-y-3"
                >
                  {question.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <RadioGroupItem value={idx.toString()} id={`q${question.id}-${idx}`} />
                      <Label 
                        htmlFor={`q${question.id}-${idx}`}
                        className={`flex-1 cursor-pointer p-3 rounded-lg border transition-colors ${
                          showResults && idx === question.correctAnswer
                            ? 'bg-accent/20 border-accent'
                            : showResults && getAnswer(question.id) === idx && idx !== question.correctAnswer
                            ? 'bg-destructive/20 border-destructive'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <Textarea
                  placeholder="Type your answer here..."
                  value={getAnswer(question.id)?.toString() || ''}
                  onChange={(e) => handleShortAnswer(question.id, e.target.value)}
                  className="min-h-[100px]"
                />
              )}

              {/* Explanation */}
              {showResults && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-sm mb-2">
                    {question.type === 'mcq' ? 'Explanation:' : 'Sample Answer:'}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {question.type === 'mcq' ? question.explanation : question.sampleAnswer}
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};