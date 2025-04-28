
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
      return null;
    }

    setIsLoading(true);
    try {
      console.log('Saving meal plan:', mealPlan);
      
      // Insert the meal plan
      const { data: mealPlanData, error: mealPlanError } = await supabase
        .from('meal_plans')
        .insert({
          user_id: user.id,
          name: mealPlan.name || `Meal Plan ${new Date().toLocaleDateString()}`,
          calories_target: mealPlan.caloriePreference,
        })
        .select()
        .single();

      if (mealPlanError) throw mealPlanError;
      
      console.log('Meal plan saved:', mealPlanData);

      // Now save each meal if they exist
      const meals = [];
      const mealPromises = [];
      
      if (mealPlan.meals.breakfast) {
        mealPromises.push(
          supabase.from('meals').insert({
            meal_plan_id: mealPlanData.id,
            name: mealPlan.meals.breakfast.name,
            type: 'breakfast',
            calories: mealPlan.meals.breakfast.nutritionFacts.calories,
            protein: mealPlan.meals.breakfast.nutritionFacts.protein,
            carbs: mealPlan.meals.breakfast.nutritionFacts.carbs,
            fat: mealPlan.meals.breakfast.nutritionFacts.fat,
            instructions: mealPlan.meals.breakfast.instructions,
          }).select()
        );
      }
      
      if (mealPlan.meals.lunch) {
        mealPromises.push(
          supabase.from('meals').insert({
            meal_plan_id: mealPlanData.id,
            name: mealPlan.meals.lunch.name,
            type: 'lunch',
            calories: mealPlan.meals.lunch.nutritionFacts.calories,
            protein: mealPlan.meals.lunch.nutritionFacts.protein,
            carbs: mealPlan.meals.lunch.nutritionFacts.carbs,
            fat: mealPlan.meals.lunch.nutritionFacts.fat,
            instructions: mealPlan.meals.lunch.instructions,
          }).select()
        );
      }
      
      if (mealPlan.meals.dinner) {
        mealPromises.push(
          supabase.from('meals').insert({
            meal_plan_id: mealPlanData.id,
            name: mealPlan.meals.dinner.name,
            type: 'dinner',
            calories: mealPlan.meals.dinner.nutritionFacts.calories,
            protein: mealPlan.meals.dinner.nutritionFacts.protein,
            carbs: mealPlan.meals.dinner.nutritionFacts.carbs,
            fat: mealPlan.meals.dinner.nutritionFacts.fat,
            instructions: mealPlan.meals.dinner.instructions,
          }).select()
        );
      }
      
      if (mealPlan.meals.snacks && mealPlan.meals.snacks.length > 0) {
        for (const snack of mealPlan.meals.snacks) {
          mealPromises.push(
            supabase.from('meals').insert({
              meal_plan_id: mealPlanData.id,
              name: snack.name,
              type: 'snack',
              calories: snack.nutritionFacts.calories,
              protein: snack.nutritionFacts.protein,
              carbs: snack.nutritionFacts.carbs,
              fat: snack.nutritionFacts.fat,
              instructions: snack.instructions,
            }).select()
          );
        }
      }
      
      if (mealPromises.length > 0) {
        const mealResults = await Promise.all(mealPromises);
        for (const result of mealResults) {
          if (result.error) throw result.error;
          if (result.data) meals.push(...result.data);
        }
      }
      
      console.log('Meals saved:', meals);

      toast({
        title: "Success",
        description: "Meal plan has been saved",
      });

      return { ...mealPlanData, meals };
    } catch (error) {
      console.error('Error saving meal plan:', error);
      toast({
        title: "Error",
        description: "Failed to save meal plan",
        variant: "destructive",
      });
      return null;
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
      return null;
    }

    setIsLoading(true);
    try {
      // First get the meals for this meal plan to create grocery items
      const { data: meals, error: mealsError } = await supabase
        .from('meals')
        .select('*')
        .eq('meal_plan_id', mealPlanId);
      
      if (mealsError) throw mealsError;
      
      // Create the grocery list
      const { data: groceryList, error: groceryListError } = await supabase
        .from('grocery_lists')
        .insert({
          user_id: user.id,
          meal_plan_id: mealPlanId,
          name: `Grocery List ${new Date().toLocaleDateString()}`,
        })
        .select()
        .single();

      if (groceryListError) throw groceryListError;
      
      // TODO: Add logic to extract ingredients from meals and add them to the grocery list
      // This would require ingredients to be stored for each meal

      toast({
        title: "Success",
        description: "Grocery list has been created",
      });

      return groceryList;
    } catch (error) {
      console.error('Error creating grocery list:', error);
      toast({
        title: "Error",
        description: "Failed to create grocery list",
        variant: "destructive",
      });
      return null;
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
