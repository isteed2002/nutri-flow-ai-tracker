
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock food database for search
const mockFoodDatabase = [
  { id: 1, name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, serving: "1 medium" },
  { id: 2, name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: "1 medium" },
  { id: 3, name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  { id: 4, name: "Brown Rice", calories: 215, protein: 5, carbs: 45, fat: 1.8, serving: "1 cup cooked" },
  { id: 5, name: "Salmon", calories: 206, protein: 22, carbs: 0, fat: 13, serving: "100g" },
  { id: 6, name: "Broccoli", calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6, serving: "1 cup" },
  { id: 7, name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fat: 0.4, serving: "170g" },
  { id: 8, name: "Avocado", calories: 240, protein: 3, carbs: 12, fat: 22, serving: "1 whole" },
  { id: 9, name: "Oatmeal", calories: 150, protein: 5, carbs: 27, fat: 2.5, serving: "1 cup cooked" },
  { id: 10, name: "Almonds", calories: 162, protein: 6, carbs: 6, fat: 14, serving: "28g" },
];

// Mock recent meals
const mockRecentMeals = [
  { id: 1, name: "Breakfast Bowl", foods: ["Oatmeal", "Banana", "Almonds", "Greek Yogurt"], time: "8:30 AM" },
  { id: 2, name: "Grilled Chicken Salad", foods: ["Chicken Breast", "Mixed Greens", "Avocado"], time: "1:00 PM" },
  { id: 3, name: "Salmon Dinner", foods: ["Salmon", "Brown Rice", "Broccoli"], time: "7:00 PM" },
];

const FoodItem = ({ food, onSelect }: { food: any, onSelect: () => void }) => (
  <div className="flex items-center justify-between py-3 px-4 border-b hover:bg-gray-50 cursor-pointer" onClick={onSelect}>
    <div>
      <p className="font-medium">{food.name}</p>
      <p className="text-sm text-gray-600">{food.serving}</p>
    </div>
    <div className="text-right">
      <p className="font-medium">{food.calories} kcal</p>
      <div className="text-xs text-gray-600">
        P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
      </div>
    </div>
  </div>
);

const MealLogging = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFoods, setSelectedFoods] = useState<any[]>([]);
  const [mealName, setMealName] = useState("");
  const [mealTime, setMealTime] = useState("breakfast");
  const [isLogging, setIsLogging] = useState(false);
  const [customFoodName, setCustomFoodName] = useState("");
  const [customCalories, setCustomCalories] = useState("");
  const [customProtein, setCustomProtein] = useState("");
  const [customCarbs, setCustomCarbs] = useState("");
  const [customFat, setCustomFat] = useState("");
  const [customServing, setCustomServing] = useState("");
  const [customMealDescription, setCustomMealDescription] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filteredFoods = searchTerm
    ? mockFoodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelectFood = (food: any) => {
    setSelectedFoods([...selectedFoods, food]);
    setSearchTerm("");
    
    toast({
      title: "Food Added",
      description: `${food.name} added to your meal.`,
    });
  };

  const handleRemoveFood = (id: number) => {
    setSelectedFoods(selectedFoods.filter(food => food.id !== id));
  };

  const handleAddCustomFood = () => {
    if (!customFoodName || !customCalories) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a name and calories for your food item.",
        variant: "destructive",
      });
      return;
    }

    const newFood = {
      id: Date.now(),
      name: customFoodName,
      calories: parseInt(customCalories, 10) || 0,
      protein: parseInt(customProtein, 10) || 0,
      carbs: parseInt(customCarbs, 10) || 0,
      fat: parseInt(customFat, 10) || 0,
      serving: customServing || "1 serving",
    };

    setSelectedFoods([...selectedFoods, newFood]);
    
    // Reset form
    setCustomFoodName("");
    setCustomCalories("");
    setCustomProtein("");
    setCustomCarbs("");
    setCustomFat("");
    setCustomServing("");

    toast({
      title: "Custom Food Added",
      description: `${newFood.name} added to your meal.`,
    });
  };

  const handleQuickAddMeal = (meal: any) => {
    toast({
      title: "Meal Logged",
      description: `${meal.name} has been added to your food log.`,
    });
  };

  const handleLogMeal = () => {
    if (selectedFoods.length === 0) {
      toast({
        title: "No Foods Selected",
        description: "Please add at least one food item to log a meal.",
        variant: "destructive",
      });
      return;
    }

    setIsLogging(true);

    // Simulate API call
    setTimeout(() => {
      setIsLogging(false);
      
      toast({
        title: "Meal Logged Successfully",
        description: `Your ${mealName || mealTime} has been added to your food log.`,
      });

      // Reset form
      setSelectedFoods([]);
      setMealName("");
      setCustomMealDescription("");
    }, 1000);
  };

  const handleSearchFood = () => {
    if (!searchTerm) return;
    
    setIsSearching(true);
    
    // Simulate API search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 800);
  };

  const totalNutrition = selectedFoods.reduce(
    (acc, food) => {
      return {
        calories: acc.calories + food.calories,
        protein: acc.protein + food.protein,
        carbs: acc.carbs + food.carbs,
        fat: acc.fat + food.fat,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <Layout requireAuth>
      <div className="nutriflow-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-nutriflow-dark">Log Your Meal</h1>
          <p className="text-gray-600">
            Track your food intake to stay on top of your nutrition goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Food Search and Selection */}
            <Card className="animate-fade-up">
              <CardHeader>
                <CardTitle>Search Foods</CardTitle>
                <CardDescription>Search our database or add your own foods</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="search">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="search">Search Database</TabsTrigger>
                    <TabsTrigger value="custom">Add Custom Food</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="search" className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Search for a food..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSearchFood();
                        }}
                      />
                      <Button onClick={handleSearchFood} disabled={isSearching}>
                        {isSearching ? "Searching..." : "Search"}
                      </Button>
                    </div>
                    
                    <div className="border rounded-md max-h-64 overflow-y-auto">
                      {searchTerm && filteredFoods.length === 0 ? (
                        <div className="py-8 text-center">
                          <p className="text-gray-500">No foods found. Try a different search term or add a custom food.</p>
                        </div>
                      ) : (
                        filteredFoods.map(food => (
                          <FoodItem 
                            key={food.id}
                            food={food}
                            onSelect={() => handleSelectFood(food)}
                          />
                        ))
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="custom" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="custom-food-name">Food Name</Label>
                        <Input
                          id="custom-food-name"
                          placeholder="e.g. Homemade Smoothie"
                          value={customFoodName}
                          onChange={(e) => setCustomFoodName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="custom-calories">Calories (kcal)</Label>
                        <Input
                          id="custom-calories"
                          type="number"
                          placeholder="e.g. 250"
                          value={customCalories}
                          onChange={(e) => setCustomCalories(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="custom-serving">Serving Size</Label>
                        <Input
                          id="custom-serving"
                          placeholder="e.g. 1 cup"
                          value={customServing}
                          onChange={(e) => setCustomServing(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="custom-protein">Protein (g)</Label>
                        <Input
                          id="custom-protein"
                          type="number"
                          placeholder="e.g. 15"
                          value={customProtein}
                          onChange={(e) => setCustomProtein(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="custom-carbs">Carbs (g)</Label>
                        <Input
                          id="custom-carbs"
                          type="number"
                          placeholder="e.g. 30"
                          value={customCarbs}
                          onChange={(e) => setCustomCarbs(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="custom-fat">Fat (g)</Label>
                        <Input
                          id="custom-fat"
                          type="number"
                          placeholder="e.g. 8"
                          value={customFat}
                          onChange={(e) => setCustomFat(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-nutriflow-primary hover:bg-nutriflow-dark"
                      onClick={handleAddCustomFood}
                    >
                      Add Custom Food
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Selected Foods */}
            <Card className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Your Meal</CardTitle>
                <CardDescription>Selected food items for this meal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedFoods.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No foods selected yet. Search for foods or add custom items.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {selectedFoods.map(food => (
                        <div key={food.id} className="flex items-center justify-between border-b pb-3">
                          <div>
                            <p className="font-medium">{food.name}</p>
                            <p className="text-sm text-gray-600">{food.serving}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-medium">{food.calories} kcal</p>
                              <div className="text-xs text-gray-600">
                                P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleRemoveFood(food.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Total Nutrition</h4>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div className="bg-white p-2 rounded text-center">
                          <p className="font-medium">{totalNutrition.calories}</p>
                          <p className="text-xs text-gray-500">kcal</p>
                        </div>
                        <div className="bg-white p-2 rounded text-center">
                          <p className="font-medium">{totalNutrition.protein}g</p>
                          <p className="text-xs text-gray-500">Protein</p>
                        </div>
                        <div className="bg-white p-2 rounded text-center">
                          <p className="font-medium">{totalNutrition.carbs}g</p>
                          <p className="text-xs text-gray-500">Carbs</p>
                        </div>
                        <div className="bg-white p-2 rounded text-center">
                          <p className="font-medium">{totalNutrition.fat}g</p>
                          <p className="text-xs text-gray-500">Fat</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="meal-name">Meal Name (Optional)</Label>
                    <Input
                      id="meal-name"
                      placeholder="e.g. Breakfast, Post-Workout Snack"
                      value={mealName}
                      onChange={(e) => setMealName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meal-time">Meal Type</Label>
                    <Select value={mealTime} onValueChange={setMealTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meal-description">Notes (Optional)</Label>
                    <Textarea
                      id="meal-description"
                      placeholder="Add any notes about this meal"
                      value={customMealDescription}
                      onChange={(e) => setCustomMealDescription(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-nutriflow-primary hover:bg-nutriflow-dark"
                  onClick={handleLogMeal}
                  disabled={isLogging || selectedFoods.length === 0}
                >
                  {isLogging ? "Logging Meal..." : "Log Meal"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Quick Adds and Recent Meals */}
          <div className="space-y-6">
            {/* AI Meal Logging */}
            <Card className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle>AI Meal Logging</CardTitle>
                <CardDescription>Describe your meal and let AI log it for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe what you ate, e.g., 'I had a grilled chicken sandwich with fries and a diet soda for lunch'"
                  className="min-h-32"
                />
                <Button 
                  className="w-full bg-nutriflow-primary hover:bg-nutriflow-dark"
                >
                  Log with AI
                </Button>
              </CardContent>
            </Card>

            {/* Recent Meals */}
            <Card className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Recent Meals</CardTitle>
                <CardDescription>Quickly add previously logged meals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecentMeals.map(meal => (
                  <div key={meal.id} className="flex items-center justify-between border-b last:border-0 py-3">
                    <div>
                      <p className="font-medium">{meal.name}</p>
                      <p className="text-sm text-gray-600">{meal.foods.join(", ")}</p>
                      <p className="text-xs text-gray-500">{meal.time}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-nutriflow-primary border-nutriflow-primary hover:bg-nutriflow-primary hover:text-white"
                      onClick={() => handleQuickAddMeal(meal)}
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Photo Logging */}
            <Card className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle>Upload Food Photo</CardTitle>
                <CardDescription>Let AI identify and log your meal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Take a photo or upload an image of your meal
                  </p>
                  <div className="mt-4">
                    <Button variant="outline">
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MealLogging;
