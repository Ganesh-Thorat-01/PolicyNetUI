import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Clock, AlertTriangle, Users, Database, FileText } from 'lucide-react';
import { apiService } from '../services/api';

const StatusTracker: React.FC = () => {
  const { policyId } = useParams<{ policyId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const { data: status, isLoading } = useQuery({
    queryKey: ['status', policyId],
    queryFn: () => apiService.getStatus(policyId!),
    enabled: !!policyId,
    refetchInterval: 3000, // Poll every 3 seconds
  });

  useEffect(() => {
    if (status?.status === 'completed') {
      navigate(`/report/${policyId}`);
    }
  }, [status, policyId, navigate]);

  useEffect(() => {
    if (status?.status === 'completed') {
      setCurrentStep(3); // Move to final step when completed
      return;
    }
    
    // Start progression timer immediately
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 2) return prev + 1; // Move to Multi-Agent Analysis and stay there
        return prev;
      });
    }, 7000); // 7 seconds
    
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-center h-32">
            <Clock className="h-8 w-8 text-blue-600 animate-spin mr-2" />
            <span>Loading status...</span>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (currentStatus: string) => {
    switch (currentStatus) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'failed':
        return <AlertTriangle className="h-6 w-6 text-red-600" />;
      default:
        return <Clock className="h-6 w-6 text-blue-600 animate-spin" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center mb-4">
          {getStatusIcon(status?.status)}
          <div className="ml-3">
            <h1 className="text-2xl font-bold text-gray-900">Policy Analysis in Progress</h1>
            <p className="text-gray-600">{status?.message || 'Analyzing your policy...'}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{status?.progress || 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(status?.progress || 0)}`}
              style={{ width: `${status?.progress || 0}%` }}
            />
          </div>
        </div>

        {status?.current_agent && (
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span>Current Agent: {status.current_agent}</span>
          </div>
        )}
      </div>

      {/* Analysis Steps Animation */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-6">Analysis Pipeline</h2>
        <div className="space-y-4">
          {[
            { name: 'Document Processing', icon: FileText, delay: 0 },
            { name: 'Data Collection', icon: Database, delay: 200 },
            { name: 'Multi-Agent Analysis', icon: Users, delay: 400 },
            { name: 'Report Generation', icon: CheckCircle, delay: 600 },
          ].map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep >= index && (status?.status !== 'completed' || index <= 3);
            const isCompleted = (status?.status === 'completed' && index < 3) || (currentStep > index && index < 2);
            
            return (
              <div
                key={step.name}
                className={`flex items-center p-4 rounded-lg transition-all duration-500`}
                style={{ animationDelay: `${step.delay}ms` }}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${
                  isCompleted ? 'bg-green-100' : isActive ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`h-5 w-5 ${
                    isCompleted ? 'text-green-600' : isActive ? 'text-blue-600 animate-pulse' : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    isCompleted ? 'text-green-900' : isActive ? 'text-blue-900' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isCompleted ? 'Completed' : isActive ? (index === 2 && status?.current_agent ? `Agent: ${status.current_agent}` : 'In Progress...') : 'Pending'}
                  </p>
                </div>
                {isActive && !isCompleted && (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Updates */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-blue-600 mr-2 animate-spin" />
          <div>
            <p className="text-blue-900 font-medium">Live Analysis</p>
            <p className="text-blue-700 text-sm">
              Your policy is being analyzed by our AI agents using real data sources. 
              You'll be automatically redirected when complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;