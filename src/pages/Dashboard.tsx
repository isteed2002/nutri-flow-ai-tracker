
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for the dashboard
const mockWeeklyData = [
  { day: "Mon", calories: 1800, protein: 90, carbs: 220, fat: 60, target: 2000 },
  { day: "Tue", calories: 2100, protein: 110, carbs: 240, fat: 70, target: 2000 },
  { day: "Wed", calories: 1950, protein: 100, carbs: 210, fat: 65, target: 2000 },
  { day: "Thu", calories: 1700, protein: 85, carbs: 200, fat: 55, target: 2000 },
  { day: "Fri", calories: 2200, protein: 115, carbs: 250, fat: 75, target: 2000 },
  { day: "Sat", calories: 2300, protein: 120, carbs: 260, fat: 78, target: 2000 },
  { day: "Sun", calories: 1900, protein: 95, carbs: 215, fat: 62, target: 2000 },
];

const mockMealHistory = [
  {
    id: 1,
    name: "Breakfast Smoothie",
    time: "8:30 AM",
    calories: 350,
    protein: 15,
    carbs: 45,
    fat: 12,
  },
  {
    id: 2,
    name: "Grilled Chicken Salad",
    time: "1:00 PM",
    calories: 450,
    protein: 35,
    carbs: 20,
    fat: 22,
  },
  {
    id: 3,
    name: "Protein Shake",
    time: "4:30 PM",
    calories: 200,
    protein: 30,
    carbs: 10,
    fat: 3,
  },
  {
    id: 4,
    name: "Salmon with Roasted Vegetables",
    time: "7:00 PM",
    calories: 550,
    protein: 40,
    carbs: 30,
    fat: 28,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [todayStats, setTodayStats] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  // Calculate today's stats
  useEffect(() => {
    // In a real app, this would fetch data from an API
    const todayIndex = new Date().getDay() - 1; // 0 = Monday
    const today = mockWeeklyData[todayIndex >= 0 ? todayIndex : 6]; // Default to Sunday if it's Sunday
    
    if (today) {
      setTodayStats({
        calories: today.calories,
        protein: today.protein,
        carbs: today.carbs,
        fat: today.fat,
      });
    }
  }, []);

  const calorieProgress = Math.round((todayStats.calories / (user?.calorieTarget || 2000)) * 100);
  const proteinProgress = Math.round((todayStats.protein / (user?.macroTargets?.protein || 150)) * 100);
  const carbsProgress = Math.round((todayStats.carbs / (user?.macroTargets?.carbs || 200)) * 100);
  const fatProgress = Math.round((todayStats.fat / (user?.macroTargets?.fat || 65)) * 100);

  return (
    <Layout requireAuth>
      <div className="nutriflow-container py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-nutriflow-dark">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {user?.name || "User"}! Here's your nutrition summary.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            onClick={() => navigate("/meal-plan")}
            className="bg-nutriflow-primary hover:bg-nutriflow-dark"
          >
            Create Meal Plan
          </Button>
          <Button 
            onClick={() => navigate("/log-meal")}
            variant="outline" 
            className="border-nutriflow-primary text-nutriflow-primary hover:bg-nutriflow-primary hover:text-white"
          >
            Log a Meal
          </Button>
        </div>

        {/* Daily Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 lg:col-span-2 animate-fade-up">
            <CardHeader>
              <CardTitle>Today's Nutrition</CardTitle>
              <CardDescription>Your nutritional progress for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Calories</span>
                  <span className="text-gray-600">{todayStats.calories} / {user?.calorieTarget || 2000} kcal</span>
                </div>
                <Progress value={calorieProgress} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Protein</span>
                  <span className="text-gray-600">{todayStats.protein} / {user?.macroTargets?.protein || 150}g</span>
                </div>
                <Progress value={proteinProgress} className="h-2 bg-blue-100">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${proteinProgress}%` }} />
                </Progress>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Carbohydrates</span>
                  <span className="text-gray-600">{todayStats.carbs} / {user?.macroTargets?.carbs || 200}g</span>
                </div>
                <Progress value={carbsProgress} className="h-2 bg-amber-100">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${carbsProgress}%` }} />
                </Progress>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Fat</span>
                  <span className="text-gray-600">{todayStats.fat} / {user?.macroTargets?.fat || 65}g</span>
                </div>
                <Progress value={fatProgress} className="h-2 bg-rose-100">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${fatProgress}%` }} />
                </Progress>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle>Daily Target</CardTitle>
              <CardDescription>Your nutritional goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Calories</span>
                <span className="font-medium">{user?.calorieTarget || 2000} kcal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Protein</span>
                <span className="font-medium">{user?.macroTargets?.protein || 150}g</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Carbohydrates</span>
                <span className="font-medium">{user?.macroTargets?.carbs || 200}g</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Fat</span>
                <span className="font-medium">{user?.macroTargets?.fat || 65}g</span>
              </div>
              <Button 
                variant="outline"
                onClick={() => navigate('/profile')}
                className="w-full mt-4 border-nutriflow-primary text-nutriflow-primary hover:bg-nutriflow-primary hover:text-white"
              >
                Update Goals
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle>Weekly Calorie Intake</CardTitle>
              <CardDescription>Last 7 days calorie tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={mockWeeklyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="calories"
                      stroke="#4CAF50"
                      fill="#E8F5E9"
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#2196F3"
                      fill="#E3F2FD"
                      strokeDasharray="3 3"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle>Macronutrient Breakdown</CardTitle>
              <CardDescription>Weekly average macronutrient intake</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockWeeklyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="protein" fill="#2196F3" name="Protein" />
                    <Bar dataKey="carbs" fill="#FFC107" name="Carbs" />
                    <Bar dataKey="fat" fill="#F44336" name="Fat" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Meals */}
        <Card className="animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <CardHeader>
            <CardTitle>Recent Meals</CardTitle>
            <CardDescription>Your logged meals for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Meal</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Time</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Calories</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Protein</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Carbs</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Fat</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMealHistory.map((meal) => (
                    <tr key={meal.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{meal.name}</td>
                      <td className="py-3 px-4">{meal.time}</td>
                      <td className="py-3 px-4">{meal.calories} kcal</td>
                      <td className="py-3 px-4">{meal.protein}g</td>
                      <td className="py-3 px-4">{meal.carbs}g</td>
                      <td className="py-3 px-4">{meal.fat}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button 
              onClick={() => navigate("/log-meal")}
              className="w-full mt-6 bg-nutriflow-primary hover:bg-nutriflow-dark"
            >
              Log Another Meal
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
