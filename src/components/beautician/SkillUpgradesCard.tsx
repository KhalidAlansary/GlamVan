
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Plus, Check } from "lucide-react";
import { toast } from "sonner";

interface CourseType {
  id: string;
  title: string;
  level: string;
  duration: string;
  enrolled: boolean;
}

interface SkillType {
  id: string;
  name: string;
  added: boolean;
}

const SkillUpgradesCard = () => {
  // Mock courses data with enrolled state
  const [courses, setCourses] = useState<CourseType[]>([
    {
      id: "1",
      title: "Advanced Lashes",
      level: "Intermediate",
      duration: "2 hours",
      enrolled: false
    },
    {
      id: "2",
      title: "Bridal Hair Styling",
      level: "Advanced",
      duration: "3 hours",
      enrolled: false
    },
    {
      id: "3",
      title: "Arabic Makeup Techniques",
      level: "Intermediate",
      duration: "1.5 hours",
      enrolled: false
    }
  ]);
  
  // Mock skills data with added state
  const [availableSkills, setAvailableSkills] = useState<SkillType[]>([
    { id: "1", name: "Bridal Hair", added: false },
    { id: "2", name: "Cat Eye", added: false },
    { id: "3", name: "3D Lashes", added: false }
  ]);

  const handleTakeCourse = (courseId: string, title: string) => {
    // Update the course status
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, enrolled: true } : course
      )
    );
    
    // Show toast notification
    toast.success(`You've enrolled in "${title}"`);
    
    // In a real app, this would call the API
    console.log("API call would be: POST /api/beauticians/courses/enroll", { 
      courseId
    });
  };
  
  const handleAddSkill = (skillId: string, name: string) => {
    // Update the skill status
    setAvailableSkills(
      availableSkills.map((skill) =>
        skill.id === skillId ? { ...skill, added: true } : skill
      )
    );
    
    // Show toast notification
    toast.success(`"${name}" added to your skills`);
    
    // In a real app, this would call the API
    console.log("API call would be: POST /api/beauticians/skills/request", { 
      skillId
    });
  };

  return (
    <Card className="shadow-md border-none h-[350px]">
      <CardHeader className="bg-salon-pink/10 pb-4">
        <CardTitle className="flex items-center text-lg">
          <Book className="h-5 w-5 mr-2 text-salon-purple" />
          Skill Upgrades
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="font-medium mb-2">Take a Course</h3>
          <div className="space-y-2 max-h-[120px] overflow-y-auto mb-6">
            {courses.map((course) => (
              <div key={course.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <div>
                  <p className="text-sm font-medium">{course.title}</p>
                  <p className="text-xs text-gray-500">
                    {course.level} • {course.duration}
                  </p>
                </div>
                {course.enrolled ? (
                  <Button 
                    size="sm" 
                    variant="default"
                    className="bg-green-500 hover:bg-green-600"
                    disabled
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Enrolled
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleTakeCourse(course.id, course.title)}
                  >
                    Enroll
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <h3 className="font-medium mb-2">Add New Skill</h3>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map((skill) => (
              <Button 
                key={skill.id} 
                variant={skill.added ? "default" : "outline"}
                size="sm"
                onClick={() => !skill.added && handleAddSkill(skill.id, skill.name)}
                disabled={skill.added}
                className={skill.added ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {skill.added ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    {skill.name}
                  </>
                ) : (
                  <>
                    <Plus className="h-3 w-3 mr-1" />
                    {skill.name}
                  </>
                )}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillUpgradesCard;
