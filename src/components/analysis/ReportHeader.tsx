import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { ComprehensiveReport } from '../../services/api';

interface ReportHeaderProps {
  report: ComprehensiveReport;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ report }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{report.policy_title}</h2>
          <p className="mt-1 text-sm text-gray-500">
            Generated on {new Date(report.generated_at).toLocaleDateString()}
          </p>
        </div>
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(report.overall_score)}`}>
            {report.overall_score.toFixed(1)}
          </div>
          <div className="text-sm text-gray-500 mt-1">Overall Score</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Strengths
          </h3>
          <ul className="mt-2 text-sm text-green-700 list-disc list-inside">
            {report.strengths.slice(0, 3).map((strength, idx) => (
              <li key={idx}>{strength}</li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-800 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Critical Issues
          </h3>
          <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
            {report.critical_issues.slice(0, 3).map((issue, idx) => (
              <li key={idx}>{issue}</li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg col-span-2">
          <h3 className="text-sm font-medium text-blue-800">Key Recommendations</h3>
          <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
            {report.priority_recommendations.slice(0, 3).map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;