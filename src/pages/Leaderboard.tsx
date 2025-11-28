import { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

interface Player {
  rank: number;
  name: string;
  xp: number;
  challengesCompleted: number;
  streak: number;
  avatar: string;
  badge?: string;
}

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'all' | 'month' | 'week'>('all');

  const players: Player[] = [
    { rank: 1, name: 'Alex Chen', xp: 12450, challengesCompleted: 87, streak: 15, avatar: 'A', badge: 'Elite Coder' },
    { rank: 2, name: 'Sarah Kim', xp: 11280, challengesCompleted: 76, streak: 12, avatar: 'S', badge: 'SQL Master' },
    { rank: 3, name: 'Mike Johnson', xp: 10940, challengesCompleted: 71, streak: 8, avatar: 'M', badge: 'Python Pro' },
    { rank: 4, name: 'Emily Davis', xp: 9870, challengesCompleted: 65, streak: 10, avatar: 'E' },
    { rank: 5, name: 'David Lee', xp: 9340, challengesCompleted: 62, streak: 7, avatar: 'D' },
    { rank: 6, name: 'Lisa Wang', xp: 8920, challengesCompleted: 58, streak: 5, avatar: 'L' },
    { rank: 7, name: 'James Brown', xp: 8450, challengesCompleted: 54, streak: 9, avatar: 'J' },
    { rank: 8, name: 'Maria Garcia', xp: 8120, challengesCompleted: 51, streak: 6, avatar: 'M' },
    { rank: 9, name: 'Tom Wilson', xp: 7850, challengesCompleted: 49, streak: 4, avatar: 'T' },
    { rank: 10, name: 'Anna Martinez', xp: 7630, challengesCompleted: 47, streak: 8, avatar: 'A' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-600" />;
      default:
        return null;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Global Leaderboard</h1>
          </div>
          <p className="text-xl text-yellow-100 max-w-2xl">
            Compete with learners worldwide and climb to the top!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setTimeframe('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeframe === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeframe === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeframe('week')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeframe === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {players.slice(0, 3).map((player) => (
            <Card key={player.rank} className={`${getRankBg(player.rank)} border-2`}>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {getRankIcon(player.rank)}
                </div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {player.avatar}
                </div>
                <h3 className="text-2xl font-bold mb-2">{player.name}</h3>
                {player.badge && (
                  <Badge className="mb-3">{player.badge}</Badge>
                )}
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {player.xp.toLocaleString()} XP
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Challenges</div>
                    <div className="font-bold">{player.challengesCompleted}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Streak</div>
                    <div className="font-bold flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      {player.streak} days
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Player</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">XP</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Challenges</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Streak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {players.map((player) => (
                    <tr key={player.rank} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {player.rank <= 3 && getRankIcon(player.rank)}
                          <span className="font-bold text-lg">{player.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {player.avatar}
                          </div>
                          <div>
                            <div className="font-semibold">{player.name}</div>
                            {player.badge && (
                              <Badge variant="default" className="text-xs">{player.badge}</Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-blue-600">{player.xp.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700">{player.challengesCompleted}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-orange-600 font-semibold">
                          <TrendingUp className="h-4 w-4" />
                          {player.streak} days
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
