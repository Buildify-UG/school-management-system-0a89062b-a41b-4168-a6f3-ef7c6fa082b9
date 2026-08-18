import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, BookOpen, BarChart3, Plus, Edit2, Trash2 } from 'lucide-react';

// Sample data
const USERS = {
  admin: { id: 1, name: 'Admin User', role: 'admin', email: 'admin@school.edu' },
  teacher: { id: 2, name: 'Mr. Johnson', role: 'teacher', email: 'johnson@school.edu' },
  student: { id: 3, name: 'Alice Smith', role: 'student', email: 'alice@school.edu' },
  parent: { id: 4, name: 'John Smith', role: 'parent', email: 'john@school.edu' },
};

const CLASSES = [
  { id: 1, name: '10-A', grade: '10', teacher: 'Mr. Johnson', students: 35 },
  { id: 2, name: '10-B', grade: '10', teacher: 'Ms. Davis', students: 32 },
  { id: 3, name: '11-A', grade: '11', teacher: 'Mr. Johnson', students: 30 },
];

const STUDENTS = [
  { id: 1, name: 'Alice Smith', classId: 1, grade: '10', email: 'alice@school.edu' },
  { id: 2, name: 'Bob Johnson', classId: 1, grade: '10', email: 'bob@school.edu' },
  { id: 3, name: 'Carol White', classId: 2, grade: '10', email: 'carol@school.edu' },
  { id: 4, name: 'David Brown', classId: 1, grade: '10', email: 'david@school.edu' },
];

const GRADES = [
  { id: 1, studentId: 1, studentName: 'Alice Smith', subject: 'Mathematics', exam1: 92, exam2: 88, exam3: 95, gpa: 3.85 },
  { id: 2, studentId: 2, studentName: 'Bob Johnson', subject: 'Mathematics', exam1: 78, exam2: 82, exam3: 85, gpa: 3.42 },
  { id: 3, studentId: 3, studentName: 'Carol White', subject: 'Mathematics', exam1: 88, exam2: 91, exam3: 89, gpa: 3.68 },
  { id: 4, studentId: 4, studentName: 'David Brown', subject: 'Mathematics', exam1: 95, exam2: 93, exam3: 96, gpa: 3.95 },
];

type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export default function Index() {
  const [currentUser, setCurrentUser] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState('classes');
  const [selectedClass, setSelectedClass] = useState<number | null>(1);
  const [students, setStudents] = useState(STUDENTS);
  const [grades, setGrades] = useState(GRADES);
  const [editingGrade, setEditingGrade] = useState<number | null>(null);
  const [newGrade, setNewGrade] = useState({ exam1: '', exam2: '', exam3: '' });

  const currentUserData = USERS[currentUser];
  const classStudents = students.filter(s => s.classId === selectedClass);
  const classGrades = grades.filter(g => classStudents.some(s => s.id === g.studentId));

  const calculateGPA = (exam1: number, exam2: number, exam3: number) => {
    const avg = (exam1 + exam2 + exam3) / 3;
    if (avg >= 90) return 4.0;
    if (avg >= 85) return 3.8;
    if (avg >= 80) return 3.5;
    if (avg >= 75) return 3.2;
    if (avg >= 70) return 2.8;
    return 2.0;
  };

  const handleUpdateGrade = (id: number) => {
    if (newGrade.exam1 && newGrade.exam2 && newGrade.exam3) {
      const exam1 = parseInt(newGrade.exam1);
      const exam2 = parseInt(newGrade.exam2);
      const exam3 = parseInt(newGrade.exam3);
      const gpa = calculateGPA(exam1, exam2, exam3);

      setGrades(grades.map(g =>
        g.id === id
          ? { ...g, exam1, exam2, exam3, gpa }
          : g
      ));
      setEditingGrade(null);
      setNewGrade({ exam1: '', exam2: '', exam3: '' });
    }
  };

  const handleAssignStudent = (studentId: number, classId: number) => {
    setStudents(students.map(s =>
      s.id === studentId ? { ...s, classId } : s
    ));
  };

  const renderLoginView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">School Management System</CardTitle>
          <CardDescription>Select your role to preview the system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(USERS).map(([role, user]) => (
              <Button
                key={role}
                onClick={() => setCurrentUser(role as UserRole)}
                variant={currentUser === role ? 'default' : 'outline'}
                className="capitalize"
              >
                {role}
              </Button>
            ))}
          </div>
          <Button onClick={() => setActiveTab('dashboard')} className="w-full">
            Continue as {currentUser}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{CLASSES.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Manager</CardTitle>
          <CardDescription>Assign students to grades and manage classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="classes" className="w-full">
            <TabsList>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="students">Assign Students</TabsTrigger>
            </TabsList>

            <TabsContent value="classes" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CLASSES.map(cls => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.name}</TableCell>
                      <TableCell>{cls.grade}</TableCell>
                      <TableCell>{cls.teacher}</TableCell>
                      <TableCell>{cls.students}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedClass(cls.id);
                            setActiveTab('students');
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Managing: {CLASSES.find(c => c.id === selectedClass)?.name}
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Current Grade</TableHead>
                    <TableHead>Assign to Class</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map(student => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>
                        <Select
                          value={student.classId.toString()}
                          onValueChange={(value) => handleAssignStudent(student.id, parseInt(value))}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CLASSES.map(cls => (
                              <SelectItem key={cls.id} value={cls.id.toString()}>
                                {cls.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">My Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStudents.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gradebook</CardTitle>
          <CardDescription>Input exam scores and track student GPAs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Select value={selectedClass?.toString() || ''} onValueChange={(v) => setSelectedClass(parseInt(v))}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {CLASSES.filter(c => c.teacher === 'Mr. Johnson').map(cls => (
                  <SelectItem key={cls.id} value={cls.id.toString()}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Exam 1</TableHead>
                  <TableHead>Exam 2</TableHead>
                  <TableHead>Exam 3</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classGrades.map(grade => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.studentName}</TableCell>
                    <TableCell>{grade.subject}</TableCell>
                    {editingGrade === grade.id ? (
                      <>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={newGrade.exam1}
                            onChange={(e) => setNewGrade({ ...newGrade, exam1: e.target.value })}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={newGrade.exam2}
                            onChange={(e) => setNewGrade({ ...newGrade, exam2: e.target.value })}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={newGrade.exam3}
                            onChange={(e) => setNewGrade({ ...newGrade, exam3: e.target.value })}
                            className="w-16"
                          />
                        </TableCell>
                        <TableCell>-</TableCell>
                        <TableCell className="space-x-1">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateGrade(grade.id)}
                            className="h-7"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingGrade(null);
                              setNewGrade({ exam1: '', exam2: '', exam3: '' });
                            }}
                            className="h-7"
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{grade.exam1}</TableCell>
                        <TableCell>{grade.exam2}</TableCell>
                        <TableCell>{grade.exam3}</TableCell>
                        <TableCell>
                          <Badge variant={grade.gpa >= 3.7 ? 'default' : grade.gpa >= 3.0 ? 'secondary' : 'outline'}>
                            {grade.gpa.toFixed(2)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingGrade(grade.id);
                              setNewGrade({
                                exam1: grade.exam1.toString(),
                                exam2: grade.exam2.toString(),
                                exam3: grade.exam3.toString(),
                              });
                            }}
                            className="h-7"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Academic Performance</CardTitle>
          <CardDescription>View your grades and GPA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Class</p>
                <p className="text-lg font-semibold">10-A</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall GPA</p>
                <p className="text-lg font-semibold">3.85</p>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Exam 1</TableHead>
                  <TableHead>Exam 2</TableHead>
                  <TableHead>Exam 3</TableHead>
                  <TableHead>GPA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.filter(g => g.studentId === 1).map(grade => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.subject}</TableCell>
                    <TableCell>{grade.exam1}</TableCell>
                    <TableCell>{grade.exam2}</TableCell>
                    <TableCell>{grade.exam3}</TableCell>
                    <TableCell>
                      <Badge variant="default">{grade.gpa.toFixed(2)}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderParentDashboard = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Child's Academic Progress</CardTitle>
          <CardDescription>Monitor Alice Smith's performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Class</p>
              <p className="text-lg font-semibold">10-A</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Overall GPA</p>
              <p className="text-lg font-semibold">3.85</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-lg font-semibold text-green-600">Excellent</p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Exam 1</TableHead>
                <TableHead>Exam 2</TableHead>
                <TableHead>Exam 3</TableHead>
                <TableHead>GPA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.filter(g => g.studentId === 1).map(grade => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.subject}</TableCell>
                  <TableCell>{grade.exam1}</TableCell>
                  <TableCell>{grade.exam2}</TableCell>
                  <TableCell>{grade.exam3}</TableCell>
                  <TableCell>
                    <Badge variant="default">{grade.gpa.toFixed(2)}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  if (activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">School Management System</h1>
                <p className="text-sm text-muted-foreground">Phase 1 Preview</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{currentUserData.name}</p>
                <p className="text-sm text-muted-foreground capitalize">{currentUserData.role}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveTab('login');
                  setEditingGrade(null);
                  setNewGrade({ exam1: '', exam2: '', exam3: '' });
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Switch Role
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {currentUser === 'admin' && renderAdminDashboard()}
          {currentUser === 'teacher' && renderTeacherDashboard()}
          {currentUser === 'student' && renderStudentDashboard()}
          {currentUser === 'parent' && renderParentDashboard()}
        </div>
      </div>
    );
  }

  return renderLoginView();
}
