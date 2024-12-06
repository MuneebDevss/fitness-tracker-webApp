import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fitnessService } from '../../services/fitnessService';

const ProgressTracker = () => {
  const [progressData, setProgressData] = useState([]);
  const [newProgress, setNewProgress] = useState({
    weight: '',
    bodyFatPercentage: '',
    muscleMass: ''
  });

  useEffect(() => {
    fetchProgressHistory();
  }, []);

  const fetchProgressHistory = async () => {
    try {
      const history = await fitnessService.getProgressHistory();
      setProgressData(history);
    } catch (error) {
      console.error('Failed to fetch progress history', error);
    }
  };

  const handleProgressSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        ...newProgress,
        date: new Date().toISOString().split('T')[0]
      };
      
      await fitnessService.addProgressEntry(submissionData);
      fetchProgressHistory();
      
      // Reset form
      setNewProgress({
        weight: '',
        bodyFatPercentage: '',
        muscleMass: ''
      });
    } catch (error) {
      console.error('Failed to add progress', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Progress Tracker</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Progress Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={500} height={300} data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" />
              <Line type="monotone" dataKey="muscleMass" stroke="#82ca9d" />
              <Line type="monotone" dataKey="bodyFatPercentage" stroke="#ffc658" />
            </LineChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Log New Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProgressSubmit} className="space-y-4">
              <Input 
                type="number"
                name="weight"
                placeholder="Weight (lbs)"
                value={newProgress.weight}
                onChange={handleInputChange}
                required
                step="0.1"
              />
              <Input 
                type="number"
                name="bodyFatPercentage"
                placeholder="Body Fat Percentage"
                value={newProgress.bodyFatPercentage}
                onChange={handleInputChange}
                required
                step="0.1"
              />
              <Input 
                type="number"
                name="muscleMass"
                placeholder="Muscle Mass (lbs)"
                value={newProgress.muscleMass}
                onChange={handleInputChange}
                required
                step="0.1"
              />
              <Button type="submit" className="w-full">
                Log Progress
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracker;