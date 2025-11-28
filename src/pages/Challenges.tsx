import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Trophy, Clock, Users, Target } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  participants: number;
  timeLimit: number;
}

export function Challenges() {
  const { user } = useAuth();
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Data Pipeline Challenge',
      description: 'Build an ETL pipeline to process customer data from CSV files and load into a data warehouse',
      difficulty: 'medium',
      points: 500,
      participants: 342,
      timeLimit: 120,
    },
    {
      id: '2',
      title: 'SQL Optimization Quest',
      description: 'Optimize slow-running queries to improve performance by at least 50%',
      difficulty: 'hard',
      points: 750,
      participants: 189,
      timeLimit: 90,
    },
    {
      id: '3',
      title: 'Python Basics Sprint',
      description: 'Solve 10 Python programming problems covering loops, functions, and data structures',
      difficulty: 'easy',
      points: 250,
      participants: 567,
      timeLimit: 60,
    },
    {
      id: '4',
      title: 'Machine Learning Model',
      description: 'Train a classification model with accuracy above 85% on the provided dataset',
      difficulty: 'hard',
      points: 1000,
      participants: 234,
      timeLimit: 180,
    },
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Coding Challenges</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Test your skills, compete with others, and climb the leaderboard!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Active Challenges</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">All</Button>
                <Button size="sm" variant="outline">Easy</Button>
                <Button size="sm" variant="outline">Medium</Button>
                <Button size="sm" variant="outline">Hard</Button>
              </div>
            </div>

            {challenges.map((challenge) => (
              <Card key={challenge.id} hover>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{challenge.title}</h3>
                        <Badge variant={getDifficultyColor(challenge.difficulty)}>
                          {challenge.difficulty.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{challenge.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>{challenge.points} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{challenge.timeLimit} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participants} participating</span>
                    </div>
                  </div>

                  <Button className="w-full sm:w-auto">
                    Start Challenge
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Top Performers
                </h3>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Alex Chen', xp: 12450, avatar: 'A' },
                    { rank: 2, name: 'Sarah Kim', xp: 11280, avatar: 'S' },
                    { rank: 3, name: 'Mike Johnson', xp: 10940, avatar: 'M' },
                    { rank: 4, name: 'Emily Davis', xp: 9870, avatar: 'E' },
                    { rank: 5, name: 'David Lee', xp: 9340, avatar: 'D' },
                  ].map((player) => (
                    <div key={player.rank} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        player.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        player.rank === 2 ? 'bg-gray-200 text-gray-700' :
                        player.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {player.rank}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{player.name}</div>
                        <div className="text-xs text-gray-600">{player.xp.toLocaleString()} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/leaderboard">
                  <Button variant="outline" className="w-full mt-4">
                    View Full Leaderboard
                  </Button>
                </Link>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold mb-4">Your Stats</h3>
                {user ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total XP</span>
                      <span className="font-bold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Challenges Completed</span>
                      <span className="font-bold">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Global Rank</span>
                      <span className="font-bold">-</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-bold">0%</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-4">Log in to track your progress</p>
                    <Link to="/login">
                      <Button>Log In</Button>
                    </Link>
                  </div>
                )}
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
