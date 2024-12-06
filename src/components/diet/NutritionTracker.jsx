import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { dietService } from '../../services/dietService';

const NutritionTracker = () => {
  const [dailyIntake, setDailyIntake] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const [foodLog, setFoodLog] = useState([]);

  useEffect(() => {
    fetchDailyIntake();
  }, []);

  const fetchDailyIntake = async () => {
    try {
      const intake = await dietService.getDailyNutritionIntake();
      setFoodLog(intake.foodLog);
      calculateDailyTotals(intake.foodLog);
    } catch (error) {
      console.error('Failed to fetch daily intake', error);
    }
  };

  const calculateDailyTotals = (log) => {
    const totals = log.reduce((acc, food) => {
      acc.calories += food.calories;
      acc.protein += food.protein;
      acc.carbs += food.carbs;
      acc.fat += food.fat;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

    setDailyIntake(totals);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFood(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addFoodToLog = async (e) => {
    e.preventDefault();
    try {
      const foodEntry = {
        ...newFood,
        date: new Date().toISOString()
      };

      await dietService.logFood(foodEntry);
      fetchDailyIntake();

      // Reset form
      setNewFood({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: ''
      });
    } catch (error) {
      console.error('Failed to log food', error);
    }
  };

  const nutritionData = [
    { name: 'Protein', value: dailyIntake.protein, color: '#0088FE' },
    { name: 'Carbs', value: dailyIntake.carbs, color: '#00C49F' },
    { name: 'Fat', value: dailyIntake.fat, color: '#FFBB28' }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Nutrition Tracker</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Nutrition Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={nutritionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {nutritionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-4">
              <div>
                <p className="font-medium">Total Calories</p>
                <p>{dailyIntake.calories.toFixed(0)} kcal</p>
              </div>
              <div>
                <p className="font-medium">Protein</p>
                <p>{dailyIntake.protein.toFixed(1)}g</p>
              </div>
              <div>
                <p className="font-medium">Carbs</p>
                <p>{dailyIntake.carbs.toFixed(1)}g</p>
              </div>
              <div>
                <p className="font-medium">Fat</p>
                <p>{dailyIntake.fat.toFixed(1)}g</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Log New Food</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addFoodToLog} className="space-y-4">
              <Input 
                type="text"
                name="name"
                placeholder="Food Name"
                value={newFood.name}
                onChange={handleInputChange}
                required
              />
              <Input 
                type="number"
                name="calories"
                placeholder="Calories"
                value={newFood.calories}
                onChange={handleInputChange}
                required
              />
              <Input 
                type="number"
                name="protein"
                placeholder="Protein (g)"
                value={newFood.protein}
                onChange={handleInputChange}
                required
              />
              <Input 
                type="number"
                name="carbs"
                placeholder="Carbs (g)"
                value={newFood.carbs}
                onChange={handleInputChange}
                required
              />
              <Input 
                type="number"
                name="fat"
                placeholder="Fat (g)"
                value={newFood.fat}
                onChange={handleInputChange}
                required
              />
              <Button type="submit" className="w-full">
                Log Food
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Food Log</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Food</th>
                <th className="text-right p-2">Calories</th>
                <th className="text-right p-2">Protein</th>
                <th className="text-right p-2">Carbs</th>
                <th className="text-right p-2">Fat</th>
              </tr>
            </thead>
            <tbody>
              {foodLog.map((food, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{food.name}</td>
                  <td className="text-right p-2">{food.calories}</td>
                  <td className="text-right p-2">{food.protein}g</td>
                  <td className="text-right p-2">{food.carbs}g</td>
                  <td className="text-right p-2">{food.fat}g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionTracker;