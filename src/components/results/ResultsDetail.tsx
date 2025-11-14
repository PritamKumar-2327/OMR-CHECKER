import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  XCircle, 
  MinusCircle, 
  Download, 
  ArrowLeft,
  BarChart3,
  FileText,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const ResultsDetail = () => {
  // Mock exam result data
  const examResult = {
    id: 1,
    examTitle: "Mathematics Final Exam",
    studentName: "John Doe",
    studentId: "STU2024001",
    date: "2024-01-15",
    totalQuestions: 40,
    correctAnswers: 34,
    wrongAnswers: 6,
    unansweredQuestions: 0,
    score: 85,
    percentage: 85,
    timeProcessed: "2024-01-15 14:30:25",
    answerKey: "ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD",
    studentAnswers: "ABCDABCDABCDABCDABCDABXDABCDABCDABCDABCD" // X represents wrong answer
  };

  // Generate detailed question analysis
  const questionAnalysis = Array.from({ length: examResult.totalQuestions }, (_, index) => {
    const questionNum = index + 1;
    const correctAnswer = examResult.answerKey[index];
    const studentAnswer = examResult.studentAnswers[index];
    const isCorrect = correctAnswer === studentAnswer;
    const isUnanswered = studentAnswer === '-';
    
    return {
      questionNumber: questionNum,
      correctAnswer,
      studentAnswer: isUnanswered ? 'Not Answered' : studentAnswer,
      status: isUnanswered ? 'unanswered' : (isCorrect ? 'correct' : 'wrong')
    };
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'wrong':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'unanswered':
        return <MinusCircle className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correct':
        return 'bg-success/10 text-success border-success/20';
      case 'wrong':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'unanswered':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const downloadResults = (format: 'pdf' | 'excel') => {
    // Mock download functionality
    const filename = `${examResult.examTitle.replace(/\s+/g, '_')}_${examResult.studentId}_results.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
    alert(`Downloading ${filename}...`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link to="/student">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{examResult.examTitle}</h1>
            <p className="text-muted-foreground">Detailed Results Analysis</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card border-0 gradient-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {examResult.percentage}%
              </div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
              <p className="text-lg font-medium mt-1">
                {examResult.score}/{examResult.totalQuestions}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <div className="text-2xl font-bold text-success mb-1">
                {examResult.correctAnswers}
              </div>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
              <div className="text-2xl font-bold text-destructive mb-1">
                {examResult.wrongAnswers}
              </div>
              <p className="text-sm text-muted-foreground">Wrong Answers</p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-0 gradient-card">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <MinusCircle className="w-8 h-8 text-warning" />
              </div>
              <div className="text-2xl font-bold text-warning mb-1">
                {examResult.unansweredQuestions}
              </div>
              <p className="text-sm text-muted-foreground">Unanswered</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Exam Information */}
          <Card className="shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Exam Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-medium">{examResult.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Student ID</p>
                  <p className="font-medium">{examResult.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exam Date</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {examResult.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Processed At</p>
                  <p className="font-medium">{examResult.timeProcessed}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Performance</p>
                <Progress value={examResult.percentage} className="h-3 mb-2" />
                <div className="flex justify-between text-sm">
                  <span>Score: {examResult.score}/{examResult.totalQuestions}</span>
                  <span>{examResult.percentage}%</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button onClick={() => downloadResults('pdf')} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Report
                </Button>
                <Button variant="outline" onClick={() => downloadResults('excel')} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Excel Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Question-by-Question Analysis */}
          <Card className="lg:col-span-2 shadow-card border-0 gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Question-by-Question Analysis
              </CardTitle>
              <CardDescription>
                Detailed breakdown of each question and answer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 max-h-96 overflow-y-auto">
                {questionAnalysis.map((question) => (
                  <div
                    key={question.questionNumber}
                    className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(question.status)}`}
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(question.status)}
                      <div>
                        <p className="font-medium">Question {question.questionNumber}</p>
                        <p className="text-sm opacity-80">
                          Your answer: {question.studentAnswer}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-80">Correct answer</p>
                      <p className="font-bold">{question.correctAnswer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultsDetail;