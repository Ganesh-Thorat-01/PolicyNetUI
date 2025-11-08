import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, BarChart3, Users, Shield, Globe, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import StatCard from '../components/common/StatCard';

const Dashboard: React.FC = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => apiService.getHealth(),
  });

  const { data: recentReports } = useQuery({
    queryKey: ['recent-reports'],
    queryFn: () => apiService.listReports(),
  });

  // Placeholder agents array
  const agents = [
    { name: 'Legal Agent', role: 'Constitutional Lawyer', icon: Shield, description: 'Analyzes constitutional validity and legal compliance', color: 'bg-red-500' },
    { name: 'Equity Agent', role: 'Social Equity Expert', icon: Users, description: 'Assesses impact on vulnerable groups and regional disparities', color: 'bg-green-500' },
    { name: 'Impact Agent', role: 'Implementation Realist', icon: TrendingUp, description: 'Evaluates ground-level implementation feasibility', color: 'bg-blue-500' },
    { name: 'Sentiment Agent', role: 'Communication Strategist', icon: Users, description: 'Analyzes public sentiment and communication needs', color: 'bg-purple-500' },
    { name: 'International Agent', role: 'Global Policy Expert', icon: Globe, description: 'Benchmarks against global standards and SDGs', color: 'bg-yellow-500' },
    { name: 'Compliance Agent', role: 'Financial Expert', icon: BarChart3, description: 'Assesses budget adequacy and FRBM compliance', color: 'bg-indigo-500' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">PolicyNet Multi-Agent System</h1>
            <p className="mt-2 text-gray-600">AI-powered policy analysis with real-time data integration</p>
          </div>
          <Link to="/analyze" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Analyze Policy
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Analyses"
          value={recentReports?.length || 0}
          icon={BarChart3}
          color="blue"
        />
        <StatCard
          title="AI Status"
          value={stats?.ai_enabled ? "Active" : "Demo Mode"}
          icon={Zap}
          color={stats?.ai_enabled ? "green" : "yellow"}
        />
        <StatCard
          title="Tools Integrated"
          value="10"
          icon={Shield}
          color="purple"
        />
        <StatCard
          title="Avg Processing Time"
          value="~10 minutes"
          icon={TrendingUp}
          color="indigo"
        />
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Specialist Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent, index) => (
              <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-lg ${agent.color} flex items-center justify-center mb-3`}>
                  {React.createElement(agent.icon, { className: 'h-6 w-6 text-white' })}
                </div>
                <h3 className="font-medium text-gray-900">{agent.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{agent.role}</p>
                <p className="text-sm text-gray-600 mt-2">{agent.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Analyses</h2>
          {recentReports?.length ? (
            <div className="space-y-4">
              {recentReports.slice(0, 5).map((report: any, index: number) => (
                <Link
                  key={index}
                  to={`/report/${report.policy_id}`}
                  className="block p-4 rounded-lg border hover:border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{report.policy_title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(report.generated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No reports available yet</p>
          )}
        </div>
      </div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">PolicyNet Multi-Agent System</h1>
            <p className="mt-2 text-gray-600">AI-powered policy analysis with real-time data integration</p>
          </div>
          <Link to="/analyze" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Analyze Policy
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
      {/* ...existing code for stats, agents, and reports grid... */}
    </div>
  );
};

export default Dashboard;
