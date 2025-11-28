import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Play, Square, CloudLightning, Database, Loader } from 'lucide-react';
import type { Database as DB } from '../lib/database.types';

type LabSession = DB['public']['Tables']['lab_sessions']['Row'];

export function Labs() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<LabSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadSessions();
    }
  }, [user]);

  const loadSessions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('lab_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('started_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const startLab = async (labType: 'snowflake' | 'databricks' | 'general', courseId?: string) => {
    if (!user) return;

    setActionInProgress(labType);
    try {
      const { data, error } = await supabase
        .from('lab_sessions')
        .insert({
          user_id: user.id,
          course_id: courseId || '00000000-0000-0000-0000-000000000000',
          lab_type: labType,
          status: 'starting',
          started_at: new Date().toISOString(),
          connection_info: {
            endpoint: `${labType}.mock-lab.datalearn.io`,
            port: 443,
            credentials: 'Available in lab environment',
          },
        })
        .select()
        .single();

      if (error) throw error;

      setTimeout(async () => {
        await supabase
          .from('lab_sessions')
          .update({ status: 'running' })
          .eq('id', data.id);

        await loadSessions();
        setActionInProgress(null);
      }, 2000);
    } catch (error) {
      console.error('Error starting lab:', error);
      setActionInProgress(null);
    }
  };

  const stopLab = async (sessionId: string) => {
    setActionInProgress(sessionId);
    try {
      await supabase
        .from('lab_sessions')
        .update({
          status: 'stopping',
        })
        .eq('id', sessionId);

      setTimeout(async () => {
        await supabase
          .from('lab_sessions')
          .update({
            status: 'stopped',
            stopped_at: new Date().toISOString(),
          })
          .eq('id', sessionId);

        await loadSessions();
        setActionInProgress(null);
      }, 1500);
    } catch (error) {
      console.error('Error stopping lab:', error);
      setActionInProgress(null);
    }
  };

  const labTypes = [
    {
      type: 'snowflake' as const,
      name: 'Snowflake Lab',
      description: 'Practice data warehousing and analytics with Snowflake',
      icon: <Database className="h-8 w-8 text-blue-600" />,
    },
    {
      type: 'databricks' as const,
      name: 'Databricks Lab',
      description: 'Work with Apache Spark and data lakehouse architecture',
      icon: <CloudLightning className="h-8 w-8 text-orange-600" />,
    },
    {
      type: 'general' as const,
      name: 'General Lab',
      description: 'Python and SQL practice environment',
      icon: <Play className="h-8 w-8 text-green-600" />,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge variant="success">Running</Badge>;
      case 'starting':
        return <Badge variant="warning">Starting...</Badge>;
      case 'stopping':
        return <Badge variant="warning">Stopping...</Badge>;
      case 'stopped':
        return <Badge variant="default">Stopped</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading labs...</p>
      </div>
    );
  }

  const activeSessions = sessions.filter(s => s.status === 'running' || s.status === 'starting');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cloud Labs</h1>
          <p className="text-xl text-gray-600">
            Practice with real cloud platforms in isolated environments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {labTypes.map((lab) => {
            const isActive = activeSessions.some(s => s.lab_type === lab.type);
            const isStarting = actionInProgress === lab.type;

            return (
              <Card key={lab.type} hover>
                <CardHeader>
                  <div className="mb-4">{lab.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {lab.name}
                  </h3>
                  <p className="text-gray-600">{lab.description}</p>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => startLab(lab.type)}
                    disabled={isActive || isStarting}
                  >
                    {isStarting ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Starting...
                      </>
                    ) : isActive ? (
                      'Lab Running'
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Lab
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {sessions.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Lab Sessions</h2>
            <div className="space-y-4">
              {sessions.map((session) => {
                const isStopping = actionInProgress === session.id;
                const connectionInfo = session.connection_info as any;

                return (
                  <Card key={session.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {session.lab_type.charAt(0).toUpperCase() + session.lab_type.slice(1)} Lab
                            </h3>
                            {getStatusBadge(session.status)}
                          </div>
                          {session.status === 'running' && connectionInfo && (
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>Endpoint: {connectionInfo.endpoint}</p>
                              <p>Port: {connectionInfo.port}</p>
                              <p className="text-xs text-gray-500">
                                Started: {new Date(session.started_at!).toLocaleString()}
                              </p>
                            </div>
                          )}
                          {session.stopped_at && (
                            <p className="text-sm text-gray-500">
                              Stopped: {new Date(session.stopped_at).toLocaleString()}
                            </p>
                          )}
                        </div>
                        {(session.status === 'running' || session.status === 'starting') && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => stopLab(session.id)}
                            disabled={isStopping || session.status === 'starting'}
                          >
                            {isStopping ? (
                              <>
                                <Loader className="h-4 w-4 mr-2 animate-spin" />
                                Stopping...
                              </>
                            ) : (
                              <>
                                <Square className="h-4 w-4 mr-2" />
                                Stop Lab
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <Card className="mt-12">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">About Cloud Labs</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Cloud Labs provide hands-on experience with real cloud platforms in isolated, safe environments. Each lab session gives you access to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Fully provisioned cloud resources</li>
              <li>Sample datasets and scenarios</li>
              <li>Step-by-step guided exercises</li>
              <li>Automatic cleanup after session ends</li>
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              Note: This is a demonstration environment. In production, these labs would connect to actual cloud platforms with proper provisioning and security.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
