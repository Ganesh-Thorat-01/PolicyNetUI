import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Database, Globe, FileText, BarChart3, Users, Shield, Clock, CheckCircle, Settings, Code } from 'lucide-react';
import { apiService } from '../services/api';

const ToolsInfo: React.FC = () => {
  const { data: toolsInfo, isLoading } = useQuery({
    queryKey: ['tools-info'],
    queryFn: () => apiService.getToolsInfo(),
  });

  const agentDescriptions = {
    'Legal Agent': {
      role: 'Legal Compliance Specialist',
      description: 'Ensures your policy aligns with Indian laws and constitutional provisions',
      expertise: ['Constitutional Law', 'Legal Precedents', 'Regulatory Compliance']
    },
    'Equity Agent': {
      role: 'Social Impact Analyst',
      description: 'Evaluates demographic impact and social equity implications',
      expertise: ['Census Analysis', 'Health Data', 'Social Demographics']
    },
    'Compliance Agent': {
      role: 'Financial Compliance Officer',
      description: 'Reviews budget feasibility and fiscal responsibility',
      expertise: ['Budget Analysis', 'FRBM Compliance', 'Financial Planning']
    },
    'International Agent': {
      role: 'Global Standards Advisor',
      description: 'Benchmarks against international best practices and UN SDGs',
      expertise: ['World Bank Data', 'UN SDG Goals', 'Global Benchmarking']
    },
    'Sentiment Agent': {
      role: 'Public Opinion Analyst',
      description: 'Assesses public sentiment and government communication impact',
      expertise: ['Social Media Analysis', 'Press Release Review', 'Public Sentiment']
    }
  };

  const dataSourcesInfo = [
    { name: 'Indian Kanoon', icon: Shield, description: 'Comprehensive legal database with case laws and judgments', category: 'Legal' },
    { name: 'Census Data', icon: Users, description: 'Official demographic and socio-economic statistics', category: 'Demographics' },
    { name: 'Union Budget', icon: BarChart3, description: 'Government budget allocations and financial data', category: 'Financial' },
    { name: 'World Bank Data', icon: Globe, description: 'International development indicators and benchmarks', category: 'Global' },
    { name: 'NFHS Health Data', icon: Database, description: 'National Family Health Survey statistics', category: 'Health' },
    { name: 'PIB Press Releases', icon: FileText, description: 'Official government communications and announcements', category: 'Government' }
  ];

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-center h-32">
            <Clock className="h-8 w-8 text-blue-600 animate-spin mr-2" />
            <span>Loading tools information...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">PolicyNet AI Analysis Platform</h1>
        <p className="text-gray-600 text-lg mb-4">
          Our multi-agent AI system provides comprehensive policy analysis using real Indian data sources and specialized expertise.
        </p>
        <div className="flex items-center text-sm text-blue-600">
          <Settings className="h-4 w-4 mr-2" />
          <span>{toolsInfo?.framework} • {toolsInfo?.total_tools} Analysis Tools</span>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Trusted Data Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataSourcesInfo.map((source, index) => {
            const Icon = source.icon;
            return (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{source.name}</h3>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {source.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{source.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Specialists */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Specialist Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(agentDescriptions).map(([agentKey, agent]) => (
            <div key={agentKey} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{agent.role}</h3>
              <p className="text-gray-600 mb-3">{agent.description}</p>
              <div className="flex flex-wrap gap-2">
                {agent.expertise.map((skill, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Implementation */}
      {toolsInfo?.agent_assignments && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Technical Implementation</h2>
          <div className="space-y-6">
            {Object.entries(toolsInfo.agent_assignments).map(([agentName, tools]: [string, any]) => (
              <div key={agentName} className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{agentName}</h3>
                  <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded">
                    {agentDescriptions[agentName as keyof typeof agentDescriptions]?.role}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tools.map((tool: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Code className="h-4 w-4 text-blue-600 mr-2" />
                        <h4 className="font-medium text-gray-900">{tool.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
                      <div className="text-xs text-blue-600 mb-2">
                        Data Source: {tool.data_source}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {tool.parameters?.map((param: string, paramIndex: number) => (
                          <span key={paramIndex} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">How PolicyNet Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Process</h3>
            <div className="space-y-3">
              {[
                'Upload your policy document or fill the form',
                'AI agents collect real-time data from trusted sources',
                'Multi-perspective analysis by specialized AI experts',
                'Cross-validation and consensus building',
                'Comprehensive report with actionable insights'
              ].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
            <div className="space-y-3">
              {[
                'Evidence-based analysis with real Indian data',
                'Multi-expert perspective evaluation',
                'Constitutional and legal compliance check',
                'Budget feasibility and impact assessment',
                'Implementation roadmap with risk mitigation'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      {toolsInfo && (
        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-green-900">Platform Status: Ready for Analysis</h3>
              <p className="text-green-700">
                All {Object.keys(toolsInfo.agent_assignments || {}).length} AI specialists and {toolsInfo.total_tools} data analysis tools are operational and ready to analyze your policy.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsInfo;