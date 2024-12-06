import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fitnessService } from '../../services/fitnessService';

const ExercisePlan = () => {
  const [exercisePlan, setExercisePlan] = useState(null);
  const [selectedPlanType, setSelectedPlanType] = useState('beginner');

  const planTypes = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  useEffect(() => {
    fetchExercisePlan();
  }, [selectedPlanType]);

  const fetchExercisePlan = async () => {
    try {
      const plan = await fitnessService.getExercisePlan(selectedPlanType);
      setExercisePlan(plan);
    } catch (error) {
      console.error('Failed to fetch exercise plan', error);
    }
  };

  const exerciseGroups = [
    { name: 'Chest', exercises: ['Push-ups', 'Bench Press', 'Dumbbell Flyes'] },
    { name: 'Back', exercises: ['Pull-ups', 'Rows', 'Deadlifts'] },
    { name: 'Legs', exercises: ['Squats', 'Lunges', 'Leg Press'] },
    { name: 'Shoulders', exercises: ['Shoulder Press', 'Lateral Raises', 'Front Raises'] }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Personalized Exercise Plan</h2>
      
      <div className="flex space-x-4 mb-6">
        {planTypes.map(plan => (
          <Button 
            key={plan.id}
            variant={selectedPlanType === plan.id ? 'default' : 'outline'}
            onClick={() => setSelectedPlanType(plan.id)}
          >
            {plan.label}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {exerciseGroups.map(group => (
          <Card key={group.name}>
            <CardHeader>
              <CardTitle>{group.name} Exercises</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {group.exercises.map(exercise => (
                  <li key={exercise} className="flex justify-between items-center">
                    {exercise}
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExercisePlan;