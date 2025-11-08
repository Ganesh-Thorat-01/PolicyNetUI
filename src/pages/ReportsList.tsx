import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { apiService } from '../services/api';

const ReportsList: React.FC = () => {
  const { data: reports, isLoading, error } = useQuery({
    queryKey: ['reports'],
    queryFn: () => apiService.listReports(),
  });

  const getStatusInfo = (report: any) => {
    // If report has overall_grade or generated_at, it's completed
    if (report.overall_grade || report.generated_at || (!report.status && report.policy_id)) {
      return {
        icon: CheckCircle,
        text: 'Complete',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      };
    } else if (report.status === 'processing' || report.status === 'queued') {
      return {
        icon: Clock,
        text: report.status === 'queued' ? 'Queued' : 'Processing',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      };
    } else if (report.status === 'failed') {
      return {
        icon: AlertTriangle,
        text: 'Failed',
        color: 'text-red-600',
        bgColor: 'bg-red-50'
      };
    } else {
      // Default to completed for reports without status
      return {
        icon: CheckCircle,
        text: 'Complete',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      };
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-center h-32">
            <Clock className="h-8 w-8 text-blue-600 animate-spin mr-2" />
            <span>Loading reports...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Policy Analysis Reports</h1>
        
        {error ? (
          <div className="text-red-600 mb-4">Failed to load reports</div>
        ) : null}
        
        {reports && reports.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No policy analyses completed yet</p>
            <p className="text-sm text-gray-500 mt-2">Start by analyzing your first policy document</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports?.map((report: any) => {
              const statusInfo = getStatusInfo(report);
              const StatusIcon = statusInfo.icon;
              const isCompleted = report.generated_at; // All reports in this list are completed
              const linkTo = isCompleted ? `/report/${report.policy_id}` : `/status/${report.policy_id}`;
              
              return (
                <Link
                  key={report.policy_id}
                  to={linkTo}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                      {isCompleted ? (
                        <div className="flex items-center space-x-4 mb-2">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            report.grade?.includes('A') ? 'bg-green-100 text-green-800' :
                            report.grade?.includes('B') ? 'bg-blue-100 text-blue-800' :
                            report.grade?.includes('C') ? 'bg-yellow-100 text-yellow-800' :
                            report.grade ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {report.grade || 'N/A'}
                          </span>
                          <span className="text-sm text-gray-600">{report.score || 0}/10 Score</span>
                        </div>
                      ) : (
                        <div className="mb-2">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                            {statusInfo.text}
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">
                        Analyzed on {new Date(report.generated_at).toLocaleDateString()} at {new Date(report.generated_at).toLocaleTimeString()}
                        {report.processing_time && (
                          <span className="ml-2 text-gray-400">• Processing: {report.processing_time}</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <StatusIcon className={`h-6 w-6 ${statusInfo.color} mb-1`} />
                      <p className={`text-xs ${statusInfo.color} font-medium`}>{statusInfo.text}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsList;