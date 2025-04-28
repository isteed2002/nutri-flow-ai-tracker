
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface SavedMealPlansProps {
  savedMealPlans: any[]; // In a real app, this would be properly typed
  onSelectMealPlan: (mealPlan: any) => void;
}

const SavedMealPlans = ({ savedMealPlans, onSelectMealPlan }: SavedMealPlansProps) => {
  const { toast } = useToast();

  const handleDeleteMealPlan = (id: string) => {
    // In a real app, this would delete from the database
    toast({
      title: "Meal Plan Deleted",
      description: "The meal plan has been removed from your saved plans.",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {savedMealPlans.map((mealPlan, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{mealPlan.name || `Meal Plan ${index + 1}`}</CardTitle>
            <CardDescription>Created on {mealPlan.createdAt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Total Calories:</span>
                <span>{mealPlan.totalCalories} kcal</span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => onSelectMealPlan(mealPlan)}
                  className="flex-1"
                >
                  View Details
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDeleteMealPlan(mealPlan.id)}
                  className="flex-1"
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SavedMealPlans;
