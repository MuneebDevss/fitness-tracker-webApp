import React, { useState, useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserContext } from '../context/UserContext';
import { fitnessService } from '../../services/fitnessService';

const GoalSetting = () => {
  const { user } = useContext(UserContext);
  const [goal, setGoal] = useState({
    type: '',
    target: '',
    deadline: '',
    category: ''
  });

  const goalCategories = [
    'Weight Loss', 
    'Muscle Gain', 
    'Endurance', 
    'Flexibility', 
    'Overall Fitness'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    try {
      await fitnessService.createGoal({
        ...goal,
        userId: user.id
      });
      alert('Goal set successfully!');
    } catch (error) {
      console.error('Failed to set goal', error);
      alert('Failed to set goal');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Set Your Fitness Goal</h2>
      <form onSubmit={handleGoalSubmit} className="space-y-4">
        <Select 
          onValueChange={(value) => setGoal(prev => ({...prev, category: value}))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Goal Category" />
          </SelectTrigger>
          <SelectContent>
            {goalCategories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input 
          type="text"
          name="type"
          placeholder="Goal Type (e.g., Lose 10 lbs, Run 5k)"
          value={goal.type}
          onChange={handleInputChange}
          required
        />

        <Input 
          type="number"
          name="target"
          placeholder="Numeric Target"
          value={goal.target}
          onChange={handleInputChange}
          required
        />

        <Input 
          type="date"
          name="deadline"
          placeholder="Goal Deadline"
          value={goal.deadline}
          onChange={handleInputChange}
          required
        />

        <Button type="submit" className="w-full">
          Set Goal
        </Button>
      </form>
    </div>
  );
};

export default GoalSetting;