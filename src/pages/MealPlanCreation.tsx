import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SavedMealPlans from "@/components/meals/SavedMealPlans";
import GroceryList from "@/components/meals/GroceryList";
import { searchFood, getNutritionInfo } from "@/utils/nutritionix";
import { useMealPlan } from '@/hooks/useMealPlan';
import { supabase } from "@/integrations/supabase/client";

const mealOptions = {
  balanced: {
    breakfast: [
      {
        name: "Greek Yogurt Parfait",
        ingredients: [
          "1 cup Greek yogurt (0% fat)",
          "1/2 cup mixed berries",
          "1 tablespoon honey",
          "2 tablespoons granola",
          "1 teaspoon chia seeds"
        ],
        nutritionFacts: {
          calories: 320,
          protein: 25,
          carbs: 40,
          fat: 7
        },
        instructions: "Layer yogurt with berries, sprinkle with granola and chia seeds, and drizzle with honey."
      },
      {
        name: "Avocado Toast with Eggs",
        ingredients: [
          "2 slices whole grain bread",
          "1/2 medium avocado",
          "2 eggs",
          "1 tablespoon olive oil",
          "Salt and pepper to taste",
          "Red pepper flakes (optional)"
        ],
        nutritionFacts: {
          calories: 390,
          protein: 18,
          carbs: 35,
          fat: 22
        },
        instructions: "Toast bread, mash avocado and spread on toast, top with fried or poached eggs."
      },
      {
        name: "Overnight Oats with Peanut Butter",
        ingredients: [
          "1/2 cup rolled oats",
          "1/2 cup almond milk",
          "1 tablespoon peanut butter",
          "1 tablespoon maple syrup",
          "1/2 banana, sliced",
          "1 tablespoon chopped nuts"
        ],
        nutritionFacts: {
          calories: 340,
          protein: 12,
          carbs: 45,
          fat: 14
        },
        instructions: "Mix oats, milk, peanut butter and syrup, refrigerate overnight, top with banana and nuts before eating."
      }
    ],
    lunch: [
      {
        name: "Quinoa and Grilled Chicken Salad",
        ingredients: [
          "4 oz grilled chicken breast",
          "1/2 cup cooked quinoa",
          "2 cups mixed greens",
          "1/4 cup cherry tomatoes",
          "1/4 avocado, sliced",
          "2 tablespoons olive oil and lemon juice dressing"
        ],
        nutritionFacts: {
          calories: 450,
          protein: 35,
          carbs: 30,
          fat: 22
        },
        instructions: "Combine all ingredients in a bowl and toss with dressing."
      },
      {
        name: "Mediterranean Wrap",
        ingredients: [
          "1 whole grain tortilla",
          "3 oz grilled chicken or chickpeas",
          "2 tablespoons hummus",
          "1/4 cup cucumber, diced",
          "1/4 cup bell peppers, diced",
          "2 tablespoons feta cheese",
          "1 tablespoon olive oil"
        ],
        nutritionFacts: {
          calories: 420,
          protein: 28,
          carbs: 35,
          fat: 20
        },
        instructions: "Spread hummus on tortilla, add all ingredients, roll up tightly."
      },
      {
        name: "Lentil Soup with Side Salad",
        ingredients: [
          "1 cup lentil soup",
          "2 cups mixed greens",
          "1 tablespoon olive oil",
          "1 tablespoon balsamic vinegar",
          "1 small whole grain roll"
        ],
        nutritionFacts: {
          calories: 380,
          protein: 18,
          carbs: 45,
          fat: 15
        },
        instructions: "Heat soup, toss greens with oil and vinegar, serve with roll."
      }
    ],
    dinner: [
      {
        name: "Baked Salmon with Roasted Vegetables",
        ingredients: [
          "5 oz salmon fillet",
          "1 cup broccoli florets",
          "1 medium sweet potato, cubed",
          "1 tablespoon olive oil",
          "1 teaspoon dried herbs",
          "Salt and pepper to taste"
        ],
        nutritionFacts: {
          calories: 480,
          protein: 32,
          carbs: 30,
          fat: 25
        },
        instructions: "Season salmon and place on baking sheet with vegetables tossed in oil and herbs. Bake at 400°F for 15-20 minutes."
      },
      {
        name: "Turkey Chili",
        ingredients: [
          "4 oz ground turkey",
          "1/2 cup kidney beans",
          "1/2 cup black beans",
          "1/2 cup diced tomatoes",
          "1/4 cup diced onions",
          "1/4 cup diced bell peppers",
          "1 tablespoon chili powder",
          "1 teaspoon cumin"
        ],
        nutritionFacts: {
          calories: 420,
          protein: 35,
          carbs: 40,
          fat: 12
        },
        instructions: "Brown turkey, add all ingredients, simmer for 20-30 minutes until flavors meld."
      },
      {
        name: "Stir-Fried Tofu with Brown Rice",
        ingredients: [
          "4 oz firm tofu, cubed",
          "1/2 cup cooked brown rice",
          "1 cup mixed vegetables (broccoli, carrots, snow peas)",
          "1 tablespoon soy sauce",
          "1 teaspoon sesame oil",
          "1 teaspoon ginger, minced",
          "1 clove garlic, minced"
        ],
        nutritionFacts: {
          calories: 380,
          protein: 20,
          carbs: 45,
          fat: 16
        },
        instructions: "Stir-fry tofu until golden, add vegetables, garlic, and ginger, stir in soy sauce and serve over rice."
      }
    ],
    snacks: [
      {
        name: "Apple with Almond Butter",
        ingredients: [
          "1 medium apple",
          "1 tablespoon almond butter"
        ],
        nutritionFacts: {
          calories: 170,
          protein: 4,
          carbs: 25,
          fat: 9
        },
        instructions: "Slice apple and serve with almond butter for dipping."
      },
      {
        name: "Greek Yogurt with Honey",
        ingredients: [
          "1 cup Greek yogurt",
          "1 teaspoon honey",
          "1 tablespoon walnuts, chopped"
        ],
        nutritionFacts: {
          calories: 180,
          protein: 18,
          carbs: 15,
          fat: 8
        },
        instructions: "Mix yogurt with honey and top with walnuts."
      },
      {
        name: "Protein Shake",
        ingredients: [
          "1 scoop protein powder",
          "1 cup almond milk",
          "1/2 banana",
          "Ice cubes"
        ],
        nutritionFacts: {
          calories: 180,
          protein: 20,
          carbs: 15,
          fat: 3
        },
        instructions: "Blend all ingredients until smooth."
      },
      {
        name: "Trail Mix",
        ingredients: [
          "1/4 cup mixed nuts",
          "1 tablespoon dried cranberries",
          "1 tablespoon dark chocolate chips"
        ],
        nutritionFacts: {
          calories: 200,
          protein: 6,
          carbs: 16,
          fat: 14
        },
        instructions: "Mix all ingredients together and portion into small bags."
      }
    ]
  },
  "high-protein": {
    breakfast: [
      {
        name: "Protein Pancakes",
        ingredients: [
          "1 scoop protein powder",
          "1 banana",
          "2 egg whites",
          "1/4 cup oats",
          "1 tablespoon Greek yogurt"
        ],
        nutritionFacts: {
          calories: 350,
          protein: 30,
          carbs: 35,
          fat: 8
        },
        instructions: "Blend ingredients, cook on a non-stick pan until golden on both sides."
      },
      {
        name: "Egg White Veggie Omelette",
        ingredients: [
          "4 egg whites",
          "1 whole egg",
          "1/4 cup spinach",
          "1/4 cup mushrooms",
          "2 tablespoons low-fat cheese",
          "1 slice whole grain toast"
        ],
        nutritionFacts: {
          calories: 310,
          protein: 32,
          carbs: 20,
          fat: 10
        },
        instructions: "Whisk eggs, cook with vegetables, fold with cheese, serve with toast."
      }
    ],
    lunch: [
      {
        name: "Grilled Chicken Bowl",
        ingredients: [
          "6 oz grilled chicken breast",
          "1/2 cup brown rice",
          "1 cup roasted vegetables",
          "2 tablespoons hummus"
        ],
        nutritionFacts: {
          calories: 480,
          protein: 45,
          carbs: 40,
          fat: 12
        },
        instructions: "Arrange chicken, rice, and vegetables in a bowl, top with hummus."
      },
      {
        name: "Tuna Salad Lettuce Wraps",
        ingredients: [
          "5 oz canned tuna",
          "1 tablespoon Greek yogurt",
          "1 tablespoon dijon mustard",
          "1/4 cup diced celery",
          "Romaine lettuce leaves",
          "1/4 avocado, sliced"
        ],
        nutritionFacts: {
          calories: 350,
          protein: 40,
          carbs: 10,
          fat: 18
        },
        instructions: "Mix tuna with yogurt, mustard, and celery. Wrap in lettuce leaves with avocado."
      }
    ],
    dinner: [
      {
        name: "Baked Salmon with Roasted Vegetables",
        ingredients: [
          "5 oz salmon fillet",
          "1 cup broccoli florets",
          "1 medium sweet potato, cubed",
          "1 tablespoon olive oil",
          "1 teaspoon dried herbs",
          "Salt and pepper to taste"
        ],
        nutritionFacts: {
          calories: 480,
          protein: 32,
          carbs: 30,
          fat: 25
        },
        instructions: "Season salmon and place on baking sheet with vegetables tossed in oil and herbs. Bake at 400°F for 15-20 minutes."
      },
      {
        name: "Turkey Chili",
        ingredients: [
          "4 oz ground turkey",
          "1/2 cup kidney beans",
          "1/2 cup black beans",
          "1/2 cup diced tomatoes",
          "1/4 cup diced onions",
          "1/4 cup diced bell peppers",
          "1 tablespoon chili powder",
          "1 teaspoon cumin"
        ],
        nutritionFacts: {
          calories: 420,
          protein: 35,
          carbs: 40,
          fat: 12
        },
        instructions: "Brown turkey, add all ingredients, simmer for 20-30 minutes until flavors meld."
      },
      {
        name: "Stir-Fried Tofu with Brown Rice",
        ingredients: [
          "4 oz firm tofu, cubed",
          "1/2 cup cooked brown rice",
          "1 cup mixed vegetables (broccoli, carrots, snow peas)",
          "1 tablespoon soy sauce",
          "1 teaspoon sesame oil",
          "1 teaspoon ginger, minced",
          "1 clove garlic, minced"
        ],
        nutritionFacts: {
          calories: 380,
          protein: 20,
          carbs: 45,
          fat: 16
        },
        instructions: "Stir-fry tofu until golden, add vegetables, garlic, and ginger, stir in soy sauce and serve over rice."
      }
    ],
    snacks: [
      {
        name: "Apple with Almond Butter",
        ingredients: [
          "1 medium apple",
          "1 tablespoon almond butter"
        ],
        nutritionFacts: {
          calories: 170,
          protein: 4,
          carbs: 25,
          fat: 9
        },
        instructions: "Slice apple and serve with almond butter for dipping."
      },
      {
        name: "Greek Yogurt with Honey",
        ingredients: [
          "1 cup Greek yogurt",
          "1 teaspoon honey",
          "1 tablespoon walnuts, chopped"
        ],
        nutritionFacts: {
          calories: 180,
          protein: 18,
          carbs: 15,
          fat: 8
        },
        instructions: "Mix yogurt with honey and top with walnuts."
      },
      {
        name: "Protein Shake",
        ingredients: [
          "1 scoop protein powder",
          "1 cup almond milk",
          "1/2 banana",
          "Ice cubes"
        ],
        nutritionFacts: {
          calories: 180,
          protein: 20,
          carbs: 15,
          fat: 3
        },
        instructions: "Blend all ingredients until smooth."
      },
      {
        name: "Trail Mix",
        ingredients: [
          "1/4 cup mixed nuts",
          "1 tablespoon dried cranberries",
          "1 tablespoon dark chocolate chips"
        ],
        nutritionFacts: {
          calories: 200,
          protein: 6,
          carbs: 16,
          fat: 14
        },
        instructions: "Mix all ingredients together and portion into small bags."
      }
    ]
  }
};

const getRandomMeal = (mealType: string, planType: string) => {
  const meals = mealOptions[planType as keyof typeof mealOptions] || mealOptions.balanced;
  const options = meals[mealType as keyof typeof meals];
  if (!options || options.length === 0) {
    return null;
  }
  return options[Math.floor(Math.random() * options.length)];
};

const adjustMealForCalories = (meal: any, targetCalories: number, originalCalories: number) => {
  if (!meal) return null;
  
  const ratio = targetCalories / originalCalories;
  
  return {
    ...meal,
    nutritionFacts: {
      calories: Math.round(meal.nutritionFacts.calories * ratio),
      protein: Math.round(meal.nutritionFacts.protein * ratio),
      carbs: Math.round(meal.nutritionFacts.carbs * ratio),
      fat: Math.round(meal.nutritionFacts.fat * ratio),
    }
  };
};

const MealCard = ({ meal, title }: { meal: any, title: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>{meal.name}</CardTitle>
      <CardDescription>{title}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <h4 className="font-medium text-sm mb-1">Ingredients:</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {meal.ingredients.map((ingredient: string, i: number) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-medium text-sm mb-1">Instructions:</h4>
        <p className="text-sm text-gray-600">{meal.instructions}</p>
      </div>
      <div>
        <h4 className="font-medium text-sm mb-1">Nutrition Facts:</h4>
        <div className="grid grid-cols-4 gap-2 text-sm">
          <div className="bg-gray-50 p-2 rounded text-center">
            <p className="font-medium">{meal.nutritionFacts.calories}</p>
            <p className="text-xs text-gray-500">kcal</p>
          </div>
          <div className="bg-gray-50 p-2 rounded text-center">
            <p className="font-medium">{meal.nutritionFacts.protein}g</p>
            <p className="text-xs text-gray-500">Protein</p>
          </div>
          <div className="bg-gray-50 p-2 rounded text-center">
            <p className="font-medium">{meal.nutritionFacts.carbs}g</p>
            <p className="text-xs text-gray-500">Carbs</p>
          </div>
          <div className="bg-gray-50 p-2 rounded text-center">
            <p className="font-medium">{meal.nutritionFacts.fat}g</p>
            <p className="text-xs text-gray-500">Fat</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const MealPlanCreation = () => {
  const { user } = useUser();
  const { toast } = useToast();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [activeTab, setActiveTab] = useState("preferences");
  
  const [mealPlanType, setMealPlanType] = useState("balanced");
  const [caloriePreference, setCaloriePreference] = useState(user?.calorieTarget || 2000);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [includeBreakfast, setIncludeBreakfast] = useState(true);
  const [includeLunch, setIncludeLunch] = useState(true);
  const [includeDinner, setIncludeDinner] = useState(true);
  const [includeSnacks, setIncludeSnacks] = useState(true);

  const [savedMealPlans, setSavedMealPlans] = useState<any[]>([]);
  const [groceryItems, setGroceryItems] = useState<any[]>([]);
  const [generatedMealPlan, setGeneratedMealPlan] = useState<any>(null);

  const { saveMealPlan, createGroceryList, isLoading } = useMealPlan();

  useEffect(() => {
    if (user) {
      fetchSavedMealPlans();
    }
  }, [user]);

  const fetchSavedMealPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        const formattedPlans = data.map(plan => ({
          ...plan,
          createdAt: new Date(plan.created_at).toLocaleDateString(),
          totalCalories: plan.calories_target
        }));
        
        setSavedMealPlans(formattedPlans);
      }
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your saved meal plans",
        variant: "destructive",
      });
    }
  };

  const handleGenerateMealPlan = async () => {
    setIsGenerating(true);
    
    try {
      const totalDailyCalories = caloriePreference;
      let mealCalories: any = {};
      
      let breakfastPercent = 0.25;
      let lunchPercent = 0.3;
      let dinnerPercent = 0.35;
      let snacksPercent = 0.1;
      
      const includedMealCount = (includeBreakfast ? 1 : 0) + (includeLunch ? 1 : 0) + 
                                (includeDinner ? 1 : 0) + (includeSnacks ? 1 : 0);
      
      if (includedMealCount === 0) {
        throw new Error("Please select at least one meal type");
      }
      
      if (!includeBreakfast) breakfastPercent = 0;
      if (!includeLunch) lunchPercent = 0;
      if (!includeDinner) dinnerPercent = 0;
      if (!includeSnacks) snacksPercent = 0;
      
      const totalPercent = breakfastPercent + lunchPercent + dinnerPercent + snacksPercent;
      breakfastPercent = breakfastPercent / totalPercent;
      lunchPercent = lunchPercent / totalPercent;
      dinnerPercent = dinnerPercent / totalPercent;
      snacksPercent = snacksPercent / totalPercent;
      
      mealCalories = {
        breakfast: Math.round(totalDailyCalories * breakfastPercent),
        lunch: Math.round(totalDailyCalories * lunchPercent),
        dinner: Math.round(totalDailyCalories * dinnerPercent),
        snacks: Math.round(totalDailyCalories * snacksPercent)
      };
      
      const breakfast = includeBreakfast ? 
        getRandomMeal('breakfast', mealPlanType) : null;
      
      const lunch = includeLunch ? 
        getRandomMeal('lunch', mealPlanType) : null;
      
      const dinner = includeDinner ? 
        getRandomMeal('dinner', mealPlanType) : null;
      
      const snacks = includeSnacks ? 
        Array(Math.random() > 0.5 ? 2 : 1).fill(0).map(() => getRandomMeal('snacks', mealPlanType)) : [];
      
      const baseCalories = (breakfast?.nutritionFacts.calories || 0) +
                           (lunch?.nutritionFacts.calories || 0) +
                           (dinner?.nutritionFacts.calories || 0) +
                           (snacks?.reduce((sum: number, snack: any) => 
                             sum + (snack?.nutritionFacts.calories || 0), 0) || 0);
      
      const scaledBreakfast = breakfast ? 
        adjustMealForCalories(breakfast, mealCalories.breakfast, breakfast.nutritionFacts.calories) : null;
      
      const scaledLunch = lunch ? 
        adjustMealForCalories(lunch, mealCalories.lunch, lunch.nutritionFacts.calories) : null;
      
      const scaledDinner = dinner ? 
        adjustMealForCalories(dinner, mealCalories.dinner, dinner.nutritionFacts.calories) : null;
      
      const scaledSnacks = snacks.length > 0 ? 
        snacks.map((snack: any, index: number) => 
          adjustMealForCalories(snack, mealCalories.snacks / snacks.length, snack.nutritionFacts.calories)
        ) : [];
      
      const totalProtein = (scaledBreakfast?.nutritionFacts.protein || 0) +
                          (scaledLunch?.nutritionFacts.protein || 0) +
                          (scaledDinner?.nutritionFacts.protein || 0) +
                          (scaledSnacks?.reduce((sum: number, snack: any) => 
                            sum + (snack?.nutritionFacts.protein || 0), 0) || 0);
      
      const totalCarbs = (scaledBreakfast?.nutritionFacts.carbs || 0) +
                          (scaledLunch?.nutritionFacts.carbs || 0) +
                          (scaledDinner?.nutritionFacts.carbs || 0) +
                          (scaledSnacks?.reduce((sum: number, snack: any) => 
                            sum + (snack?.nutritionFacts.carbs || 0), 0) || 0);
      
      const totalFat = (scaledBreakfast?.nutritionFacts.fat || 0) +
                          (scaledLunch?.nutritionFacts.fat || 0) +
                          (scaledDinner?.nutritionFacts.fat || 0) +
                          (scaledSnacks?.reduce((sum: number, snack: any) => 
                            sum + (snack?.nutritionFacts.fat || 0), 0) || 0);
      
      const totalCalories = (scaledBreakfast?.nutritionFacts.calories || 0) +
                          (scaledLunch?.nutritionFacts.calories || 0) +
                          (scaledDinner?.nutritionFacts.calories || 0) +
                          (scaledSnacks?.reduce((sum: number, snack: any) => 
                            sum + (snack?.nutritionFacts.calories || 0), 0) || 0);
      
      const mealPlan = {
        name: `${mealPlanType.charAt(0).toUpperCase() + mealPlanType.slice(1)} Plan - ${new Date().toLocaleDateString()}`,
        caloriePreference: caloriePreference,
        totalNutrition: {
          calories: totalCalories,
          protein: totalProtein,
          carbs: totalCarbs,
          fat: totalFat
        },
        meals: {
          breakfast: scaledBreakfast,
          lunch: scaledLunch,
          dinner: scaledDinner,
          snacks: scaledSnacks
        }
      };
      
      console.log("Generated meal plan:", mealPlan);
      
      setGeneratedMealPlan(mealPlan);
      setIsGenerating(false);
      setShowMealPlan(true);
      setActiveTab("meal-plan");
      
      toast({
        title: "Meal Plan Generated",
        description: "Your personalized meal plan has been created.",
      });
    } catch (error) {
      console.error("Error generating meal plan:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  const handleToggleGroceryItem = (id: string) => {
    setGroceryItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSaveMealPlan = async () => {
    if (!generatedMealPlan) {
      toast({
        title: "Error",
        description: "No meal plan to save",
        variant: "destructive",
      });
      return;
    }

    const savedPlan = await saveMealPlan(generatedMealPlan);
    if (savedPlan) {
      await fetchSavedMealPlans();
      setActiveTab("saved-plans");
    }
  };

  const handleCreateGroceryList = async () => {
    if (!generatedMealPlan) {
      toast({
        title: "Error",
        description: "Please generate a meal plan first",
        variant: "destructive",
      });
      return;
    }
    
    const savedPlan = await saveMealPlan(generatedMealPlan);
    if (savedPlan) {
      const groceryList = await createGroceryList(savedPlan.id);
      if (groceryList) {
        setActiveTab("grocery-list");
      }
    } else {
      toast({
        title: "Info",
        description: "Please save your meal plan first",
      });
    }
  };

  const handleSelectMealPlan = async (mealPlan: any) => {
    try {
      const { data: mealsData, error: mealsError } = await supabase
        .from('meals')
        .select('*')
        .eq('meal_plan_id', mealPlan.id);
      
      if (mealsError) throw mealsError;
      
      const breakfast = mealsData?.find(meal => meal.type === 'breakfast');
      const lunch = mealsData?.find(meal => meal.type === 'lunch');
      const dinner = mealsData?.find(meal => meal.type === 'dinner');
      const snacks = mealsData?.filter(meal => meal.type === 'snack');
      
      const totalCalories = mealsData?.reduce((sum, meal) => sum + meal.calories, 0) || 0;
      const totalProtein = mealsData?.reduce((sum, meal) => sum + meal.protein, 0) || 0;
      const totalCarbs = mealsData?.reduce((sum, meal) => sum + meal.carbs, 0) || 0;
      const totalFat = mealsData?.reduce((sum, meal) => sum + meal.fat, 0) || 0;
      
      const formatMeal = (meal: any) => meal ? {
        name: meal.name,
        nutritionFacts: {
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          fat: meal.fat
        },
        instructions: meal.instructions,
        ingredients: ["See recipe for ingredients"]
      } : null;
      
      const formattedMealPlan = {
        id: mealPlan.id,
        name: mealPlan.name,
        caloriePreference: mealPlan.calories_target,
        totalNutrition: {
          calories: totalCalories,
          protein: totalProtein,
          carbs: totalCarbs,
          fat: totalFat
        },
        meals: {
          breakfast: formatMeal(breakfast),
          lunch: formatMeal(lunch),
          dinner: formatMeal(dinner),
          snacks: snacks?.map(snack => formatMeal(snack)) || []
        }
      };
      
      setGeneratedMealPlan(formattedMealPlan);
      setShowMealPlan(true);
      setActiveTab("meal-plan");
      
    } catch (error) {
      console.error('Error loading meal plan:', error);
      toast({
        title: "Error",
        description: "Failed to load meal plan details",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout requireAuth>
      <div className="nutriflow-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-nutriflow-dark">Meal Plan Creation</h1>
          <p className="text-gray-600">
            Let our AI create a personalized meal plan based on your preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="meal-plan" disabled={!showMealPlan}>Meal Plan</TabsTrigger>
            <TabsTrigger value="saved-plans">Saved Plans</TabsTrigger>
            <TabsTrigger value="grocery-list">Grocery List</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Meal Plan Preferences</CardTitle>
                <CardDescription>Customize your meal plan settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="meal-plan-type">Meal Plan Type</Label>
                  <Select value={mealPlanType} onValueChange={setMealPlanType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a meal plan type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="high-protein">High Protein</SelectItem>
                      <SelectItem value="low-carb">Low Carb</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="keto">Ketogenic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="calorie-slider">Daily Calories: {caloriePreference}</Label>
                  </div>
                  <Slider
                    id="calorie-slider"
                    value={[caloriePreference]}
                    min={1200}
                    max={3500}
                    step={50}
                    onValueChange={(value) => setCaloriePreference(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1200</span>
                    <span>3500</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Include Meals</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="breakfast"
                        checked={includeBreakfast}
                        onCheckedChange={() => setIncludeBreakfast(!includeBreakfast)}
                      />
                      <label
                        htmlFor="breakfast"
                        className="text-sm font-medium leading-none"
                      >
                        Breakfast
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="lunch"
                        checked={includeLunch}
                        onCheckedChange={() => setIncludeLunch(!includeLunch)}
                      />
                      <label
                        htmlFor="lunch"
                        className="text-sm font-medium leading-none"
                      >
                        Lunch
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dinner"
                        checked={includeDinner}
                        onCheckedChange={() => setIncludeDinner(!includeDinner)}
                      />
                      <label
                        htmlFor="dinner"
                        className="text-sm font-medium leading-none"
                      >
                        Dinner
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="snacks"
                        checked={includeSnacks}
                        onCheckedChange={() => setIncludeSnacks(!includeSnacks)}
                      />
                      <label
                        htmlFor="snacks"
                        className="text-sm font-medium leading-none"
                      >
                        Snacks
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-notes">Additional Notes</Label>
                  <Textarea
                    id="additional-notes"
                    placeholder="Any specific foods to include or exclude, cooking preferences, etc."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="min-h-32"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-nutriflow-primary hover:bg-nutriflow-dark"
                  disabled={isGenerating || (!includeBreakfast && !includeLunch && !includeDinner && !includeSnacks)}
                  onClick={handleGenerateMealPlan}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Meal Plan...
                    </>
                  ) : "Generate Meal Plan"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="meal-plan">
            <div className="grid gap-6">
              <div className="flex flex-wrap gap-4 mb-4">
                <Button 
                  className="bg-nutriflow-primary hover:bg-nutriflow-dark"
                  onClick={handleSaveMealPlan}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Meal Plan"}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-nutriflow-primary text-nutriflow-primary hover:bg-nutriflow-primary hover:text-white"
                  onClick={handleCreateGroceryList}
                  disabled={isLoading}
                >
                  Create Grocery List
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setActiveTab("preferences");
                  }}
                >
                  Edit Preferences
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {generatedMealPlan && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Nutrition Summary</CardTitle>
                      <CardDescription>Total nutrition for the day</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Calories</span>
                            <span className="text-gray-600">{generatedMealPlan.totalNutrition.calories} / {caloriePreference} kcal</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full">
                            <div 
                              className="h-full bg-nutriflow-primary rounded-full" 
                              style={{ width: `${Math.min((generatedMealPlan.totalNutrition.calories / caloriePreference) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-3 rounded">
                            <p className="text-xs text-gray-500">Protein</p>
                            <p className="font-medium">{generatedMealPlan.totalNutrition.protein}g</p>
                          </div>
                          <div className="bg-amber-50 p-3 rounded">
                            <p className="text-xs text-gray-500">Carbs</p>
                            <p className="font-medium">{generatedMealPlan.totalNutrition.carbs}g</p>
                          </div>
                          <div className="bg-rose-50 p-3 rounded">
                            <p className="text-xs text-gray-500">Fat</p>
                            <p className="font-medium">{generatedMealPlan.totalNutrition.fat}g</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {generatedMealPlan?.meals.breakfast && includeBreakfast && (
                  <MealCard meal={generatedMealPlan.meals.breakfast} title="Breakfast" />
                )}
                
                {generatedMealPlan?.meals.lunch && includeLunch && (
                  <MealCard meal={generatedMealPlan.meals.lunch} title="Lunch" />
                )}
                
                {generatedMealPlan?.meals.dinner && includeDinner && (
                  <MealCard meal={generatedMealPlan.meals.dinner} title="Dinner" />
                )}

                {includeSnacks && generatedMealPlan?.meals.snacks && 
                 generatedMealPlan.meals.snacks.map((snack: any, index: number) => (
                  <MealCard key={index} meal={snack} title={`Snack ${index + 1}`} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved-plans">
            <SavedMealPlans
              savedMealPlans={savedMealPlans}
              onSelectMealPlan={handleSelectMealPlan}
            />
          </TabsContent>

          <TabsContent value="grocery-list">
            <GroceryList
              items={groceryItems}
              onToggleItem={handleToggleGroceryItem}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MealPlanCreation;
