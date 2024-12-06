import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dietService } from '../../services/dietService';

const DietPlan = () => {
  const [dietPlan, setDietPlan] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState('weightLoss');
  const [selectedDietType, setSelectedDietType] = useState('balanced');

  const dietGoals = [
    { value: 'weightLoss', label: 'Weight Loss' },
    { value: 'muscleGain', label: 'Muscle Gain' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const dietTypes = [
    { value: 'balanced', label: 'Balanced' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'keto', label: 'Keto' }
  ];

  useEffect(() => {
    fetchDietPlan();
  }, [selectedGoal, selectedDietType]);

  const fetchDietPlan = async () => {
    try {
      const plan = await dietService.generateDietPlan({
        goal: selectedGoal,
        dietType: selectedDietType
      });
      setDietPlan(plan);
    } catch (error) {
      console.error('Failed to fetch diet plan', error);
    }
  };

  const MealCard = ({ meal, items }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{meal}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span className="text-muted-foreground">
                {item.calories} cal | {item.protein}g protein
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Personalized Diet Plan</h2>
      
      <div className="flex space-x-4 mb-6">
        <div className="w-1/2">
          <label className="block mb-2">Diet Goal</label>
          <Select 
            value={selectedGoal}
            onValueChange={setSelectedGoal}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Diet Goal" />
            </SelectTrigger>
            <SelectContent>
              {dietGoals.map(goal => (
                <SelectItem key={goal.value} value={goal.value}>
                  {goal.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-1/2">
          <label className="block mb-2">Diet Type</label>
          <Select 
            value={selectedDietType}
            onValueChange={setSelectedDietType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Diet Type" />
            </SelectTrigger>
            <SelectContent>
              {dietTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {dietPlan && (
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Daily Nutritional Targets</h3>
            <div className="flex space-x-4 mt-2">
              <div className="bg-secondary p-3 rounded">
                <p className="font-medium">Calories: {dietPlan.dailyCalories} kcal</p>
              </div>
              <div className="bg-secondary p-3 rounded">
                <p className="font-medium">Protein: {dietPlan.dailyProtein}g</p>
              </div>
              <div className="bg-secondary p-3 rounded">
                <p className="font-medium">Carbs: {dietPlan.dailyCarbs}g</p>
              </div>
            </div>
          </div>

          <MealCard meal="Breakfast" items={dietPlan.breakfast} />
          <MealCard meal="Lunch" items={dietPlan.lunch} />
          <MealCard meal="Dinner" items={dietPlan.dinner} />
          <MealCard meal="Snacks" items={dietPlan.snacks} />
        </div>
      )}

      <Button onClick={fetchDietPlan} className="mt-4 w-full">
        Regenerate Diet Plan
      </Button>
    </div>
  );
};

export default DietPlan;