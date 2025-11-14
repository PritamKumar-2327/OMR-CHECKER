import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Download,
  Eye,
  TrendingUp,
  BookOpen,
  Camera,
  Settings,
  Zap,
  XCircle
} from "lucide-react";

const StudentDashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const stats = [
    { label: "Exams Taken", value: "12", icon: <BookOpen className="w-5 h-5" />, color: "text-primary" },
    { label: "Average Score", value: "87.5%", icon: <TrendingUp className="w-5 h-5" />, color: "text-success" },
    { label: "Pending Results", value: "2", icon: <Clock className="w-5 h-5" />, color: "text-warning" },
    { label: "Best Score", value: "96%", icon: <CheckCircle className="w-5 h-5" />, color: "text-secondary-accent" }
  ];

  const mockSubmissions = [
    { 
      id: 1, 
      examName: "Advanced Mathematics Final", 
      score: 87, 
      date: "January 20, 2024", 
      status: "completed" as const
    },
    { 
      id: 2, 
      examName: "Physics Quantum Mechanics", 
      score: 92, 
      date: "January 18, 2024", 
      status: "completed" as const
    },
    { 
      id: 3, 
      examName: "Chemistry Organic Compounds", 
      score: null, 
      date: "January 22, 2024", 
      status: "processing" as const
    },
    { 
      id: 4, 
      examName: "Biology Molecular Structure", 
      score: null, 
      date: "January 19, 2024", 
      status: "failed" as const
    }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        setSelectedFile(file);
        toast({
          title: "File Selected",
          description: `${file.name} has been selected for upload.`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select an image (JPG, PNG) or PDF file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} has been selected for upload.`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select an OMR sheet to upload.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Processing Started",
      description: "Your OMR sheet is being processed. Results will be available shortly.",
    });

    // Simulate processing
    setTimeout(() => {
      toast({
        title: "Processing Complete",
        description: "Your results are ready! Check the results section below.",
      });
      setSelectedFile(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-lg">Upload OMR sheets with advanced AI processing & instant results</p>
          </div>
          <div className="flex gap-3">
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="mr-2 h-4 w-4" />
              Pro Features Enabled
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Clock className="mr-2 h-4 w-4" />
              Last active: 2 hours ago
            </Badge>
          </div>
        </div>

        {/* Process Steps Indicator */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {[
                { icon: Upload, label: "Upload Sheet", status: "active" },
                { icon: Settings, label: "Auto-Detection", status: "pending" },
                { icon: Zap, label: "AI Processing", status: "pending" },
                { icon: Eye, label: "View Results", status: "pending" }
              ].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step.status === 'active' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 font-medium ${
                    step.status === 'active' ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                  {index < 3 && <div className="w-12 h-0.5 bg-gray-300 mx-4"></div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card border-0 gradient-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg gradient-hero text-white ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Upload Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Upload className="h-6 w-6 text-primary" />
              Upload OMR Answer Sheet
            </CardTitle>
            <CardDescription className="text-base">
              Upload a clear, high-quality image of your completed OMR answer sheet for AI-powered analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {!selectedFile ? (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">
                    Drop your OMR sheet here
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md">
                    or click to browse from your computer
                  </p>
                  <Button size="lg" variant="outline" className="mb-6">
                    <Camera className="mr-2 h-5 w-5" />
                    Choose File
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-solid border-primary rounded-xl p-6 bg-primary/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{selectedFile.name}</h4>
                      <p className="text-sm text-gray-600">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                  >
                    <XCircle className="h-5 w-5 text-gray-500" />
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleSubmit} className="flex-1" size="lg">
                    <Upload className="mr-2 h-5 w-5" />
                    Submit for Processing
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change File
                  </Button>
                </div>
              </div>
            )}
            
            {/* Quality Guidelines */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <div className="font-semibold text-green-800">High Quality Images</div>
                  <div className="text-sm text-green-600">300 DPI or higher recommended</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <Camera className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <div className="font-semibold text-blue-800">Clear & Straight</div>
                  <div className="text-sm text-blue-600">Ensure the sheet is well-lit and flat</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600 mr-3" />
                <div>
                  <div className="font-semibold text-purple-800">Multiple Formats</div>
                  <div className="text-sm text-purple-600">JPG, PNG, WebP supported</div>
                </div>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* Enhanced Recent Submissions */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-6 w-6 text-primary" />
              Recent Submissions & Analytics
            </CardTitle>
            <CardDescription className="text-base">
              Track your progress with detailed performance analytics and submission history
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">12</div>
                <div className="text-sm text-blue-600">Total Submissions</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-700">87%</div>
                <div className="text-sm text-green-600">Average Score</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">4.2s</div>
                <div className="text-sm text-purple-600">Avg. Processing Time</div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-700">98%</div>
                <div className="text-sm text-orange-600">Accuracy Rate</div>
              </div>
            </div>

            <div className="space-y-4">
              {mockSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-6 border rounded-xl hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{submission.examName}</h4>
                      <p className="text-sm text-gray-500">Submitted on {submission.date}</p>
                      {submission.status === 'processing' && (
                        <div className="mt-2">
                          <Progress value={75} className="w-32 h-2" />
                          <span className="text-xs text-gray-500 mt-1">Processing... 75%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant={submission.status === 'completed' ? 'default' : 
                              submission.status === 'processing' ? 'secondary' : 'destructive'}
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {submission.status === 'completed' && <CheckCircle className="h-3 w-3" />}
                      {submission.status === 'processing' && <Clock className="h-3 w-3" />}
                      {submission.status === 'failed' && <XCircle className="h-3 w-3" />}
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </Badge>
                    {submission.score && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{submission.score}</div>
                        <div className="text-xs text-gray-500">out of 100</div>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="hover:bg-blue-50">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {submission.status === 'completed' && (
                        <Button size="sm" variant="ghost" className="hover:bg-green-50">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;