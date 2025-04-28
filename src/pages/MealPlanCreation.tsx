import { useState } from "react";
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

const mockMealPlan = {
  breakfast: {
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
  lunch: {
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
  dinner: {
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
    }
  ]
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

  const [savedMealPlans, setSavedMealPlans] = useState([]);
  const [groceryItems, setGroceryItems] = useState([]);

  const handleGenerateMealPlan = async () => {
    setIsGenerating(true);
    
    try {
      setTimeout(() => {
        setIsGenerating(false);
        setShowMealPlan(true);
        setActiveTab("meal-plan");
        
        toast({
          title: "Meal Plan Generated",
          description: "Your personalized meal plan has been created.",
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
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
                  disabled={isGenerating}
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
                >
                  Save Meal Plan
                </Button>
                <Button 
                  variant="outline" 
                  className="border-nutriflow-primary text-nutriflow-primary hover:bg-nutriflow-primary hover:text-white"
                  onClick={handleCreateGroceryList}
                >
                  Create Grocery List
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setActiveTab("preferences");
                    setShowMealPlan(false);
                  }}
                >
                  Edit Preferences
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <span className="text-gray-600">1600 / {caloriePreference} kcal</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div 
                            className="h-full bg-nutriflow-primary rounded-full" 
                            style={{ width: `${(1600 / caloriePreference) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-xs text-gray-500">Protein</p>
                          <p className="font-medium">116g</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded">
                          <p className="text-xs text-gray-500">Carbs</p>
                          <p className="font-medium">140g</p>
                        </div>
                        <div className="bg-rose-50 p-3 rounded">
                          <p className="text-xs text-gray-500">Fat</p>
                          <p className="font-medium">66g</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {includeBreakfast && (
                  <MealCard meal={mockMealPlan.breakfast} title="Breakfast" />
                )}
                
                {includeLunch && (
                  <MealCard meal={mockMealPlan.lunch} title="Lunch" />
                )}
                
                {includeDinner && (
                  <MealCard meal={mockMealPlan.dinner} title="Dinner" />
                )}

                {includeSnacks && mockMealPlan.snacks.map((snack: any, index: number) => (
                  <MealCard key={index} meal={snack} title={`Snack ${index + 1}`} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved-plans">
            <SavedMealPlans
              savedMealPlans={savedMealPlans}
              onSelectMealPlan={(mealPlan) => {
                setShowMealPlan(true);
                setActiveTab("meal-plan");
              }}
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
