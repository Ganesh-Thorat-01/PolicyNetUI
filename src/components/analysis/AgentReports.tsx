import React from 'react';
import { AgentReport as AgentReportType } from '../../services/api';
import { AlertTriangle, CheckCircle, Database } from 'lucide-react';

interface AgentReportsProps {
  reports: AgentReportType[];
}

const AgentReports: React.FC<AgentReportsProps> = ({ reports }) => {
  const getRiskColor = (score: number) => {
    if (score <= 3) return 'bg-green-100 text-green-800 border-green-200';
    if (score <= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="space-y-6">
      {reports.map((report, index) => (
        <div key={index} className="border rounded-lg">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{report.agent_name}</h3>
                <p className="text-sm text-gray-500">{report.agent_role}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${getRiskColor(report.risk_score)}`}>
                Risk Score: {report.risk_score}
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Analysis</h4>
              <p className="mt-1 text-sm text-gray-600">{report.analysis}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Key Findings</h4>
              <ul className="space-y-2">
                {report.key_findings.map((finding, idx) => (
                  <li key={idx} className="flex items-start">
                    {report.risk_score > 6 ? (
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    )}
                    <span className="text-sm text-gray-600">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendations</h4>
              <ul className="space-y-2">
                {report.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="mr-2">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium text-gray-900 flex items-center">
                <Database className="h-4 w-4 mr-2" />
                Data Sources
              </h4>
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {report.data_sources.map((source, idx) => (
                  <li key={idx} className="text-xs text-gray-500">
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgentReports;