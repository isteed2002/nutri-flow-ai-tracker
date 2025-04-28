
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Common dietary restrictions
const dietaryRestrictions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
  { id: "keto", label: "Ketogenic" },
  { id: "paleo", label: "Paleo" },
];

// Common allergies
const commonAllergies = [
  { id: "peanuts", label: "Peanuts" },
  { id: "tree-nuts", label: "Tree Nuts" },
  { id: "dairy", label: "Dairy" },
  { id: "eggs", label: "Eggs" },
  { id: "seafood", label: "Seafood" },
  { id: "soy", label: "Soy" },
  { id: "wheat", label: "Wheat" },
];

const Profile = () => {
  const { user, updateUserProfile } = useUser();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [fitnessGoal, setFitnessGoal] = useState(user?.fitnessGoals || "");
  const [calorieTarget, setCalorieTarget] = useState(user?.calorieTarget?.toString() || "2000");
  const [proteinTarget, setProteinTarget] = useState(user?.macroTargets?.protein.toString() || "150");
  const [carbsTarget, setCarbsTarget] = useState(user?.macroTargets?.carbs.toString() || "200");
  const [fatTarget, setFatTarget] = useState(user?.macroTargets?.fat.toString() || "65");
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(user?.dietaryRestrictions || []);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(user?.allergies || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRestrictionToggle = (value: string) => {
    setSelectedRestrictions(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const handleAllergyToggle = (value: string) => {
    setSelectedAllergies(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      updateUserProfile({
        name,
        email,
        fitnessGoals: fitnessGoal,
        calorieTarget: parseInt(calorieTarget, 10),
        macroTargets: {
          protein: parseInt(proteinTarget, 10),
          carbs: parseInt(carbsTarget, 10),
          fat: parseInt(fatTarget, 10),
        },
        dietaryRestrictions: selectedRestrictions,
        allergies: selectedAllergies,
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout requireAuth>
      <div className="nutriflow-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-nutriflow-dark">Your Profile</h1>
          <p className="text-gray-600">
            Update your personal information and preferences
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="animate-fade-up">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your basic account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Goals */}
            <Card className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Nutrition Goals</CardTitle>
                <CardDescription>Set your daily targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fitness-goal">Fitness Goal</Label>
                  <Select value={fitnessGoal} onValueChange={setFitnessGoal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose-weight">Lose Weight</SelectItem>
                      <SelectItem value="maintain-weight">Maintain Weight</SelectItem>
                      <SelectItem value="gain-muscle">Gain Muscle</SelectItem>
                      <SelectItem value="improve-health">Improve Overall Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calorie-target">Daily Calorie Target (kcal)</Label>
                  <Input 
                    id="calorie-target" 
                    type="number" 
                    value={calorieTarget} 
                    onChange={(e) => setCalorieTarget(e.target.value)}
                    min="1000"
                    max="5000"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="protein-target">Protein (g)</Label>
                    <Input 
                      id="protein-target" 
                      type="number" 
                      value={proteinTarget} 
                      onChange={(e) => setProteinTarget(e.target.value)}
                      min="50"
                      max="300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carbs-target">Carbs (g)</Label>
                    <Input 
                      id="carbs-target" 
                      type="number" 
                      value={carbsTarget} 
                      onChange={(e) => setCarbsTarget(e.target.value)}
                      min="50"
                      max="400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fat-target">Fat (g)</Label>
                    <Input 
                      id="fat-target" 
                      type="number" 
                      value={fatTarget} 
                      onChange={(e) => setFatTarget(e.target.value)}
                      min="20"
                      max="150"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dietary Restrictions */}
            <Card className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle>Dietary Restrictions</CardTitle>
                <CardDescription>Select any dietary restrictions you follow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {dietaryRestrictions.map((restriction) => (
                    <div key={restriction.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`restriction-${restriction.id}`}
                        checked={selectedRestrictions.includes(restriction.id)}
                        onCheckedChange={() => handleRestrictionToggle(restriction.id)}
                      />
                      <label
                        htmlFor={`restriction-${restriction.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {restriction.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Food Allergies */}
            <Card className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle>Food Allergies</CardTitle>
                <CardDescription>Select any food allergies or intolerances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {commonAllergies.map((allergy) => (
                    <div key={allergy.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`allergy-${allergy.id}`}
                        checked={selectedAllergies.includes(allergy.id)}
                        onCheckedChange={() => handleAllergyToggle(allergy.id)}
                      />
                      <label
                        htmlFor={`allergy-${allergy.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {allergy.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Button 
              type="submit" 
              className="bg-nutriflow-primary hover:bg-nutriflow-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
