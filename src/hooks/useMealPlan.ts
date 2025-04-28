
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

export const useMealPlan = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const saveMealPlan = async (mealPlan: any) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save meal plans",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .insert({
          user_id: user.id,
          name: mealPlan.name || `Meal Plan ${new Date().toLocaleDateString()}`,
          calories_target: mealPlan.caloriePreference,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Meal plan has been saved",
      });

      return data;
    } catch (error) {
      console.error('Error saving meal plan:', error);
      toast({
        title: "Error",
        description: "Failed to save meal plan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createGroceryList = async (mealPlanId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create grocery lists",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('grocery_lists')
        .insert({
          user_id: user.id,
          meal_plan_id: mealPlanId,
          name: `Grocery List ${new Date().toLocaleDateString()}`,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Grocery list has been created",
      });

      return data;
    } catch (error) {
      console.error('Error creating grocery list:', error);
      toast({
        title: "Error",
        description: "Failed to create grocery list",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveMealPlan,
    createGroceryList,
    isLoading,
  };
};
