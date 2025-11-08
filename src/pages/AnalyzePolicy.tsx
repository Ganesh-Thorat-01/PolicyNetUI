import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import PolicyForm from '../components/forms/PolicyForm';
import FileUpload from '../components/forms/FileUpload';
import { apiService, PolicyDraftInput } from '../services/api';

const policySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string(),
  content: z.string().min(100, 'Policy content must be at least 100 characters'),
  state: z.string().optional(),
  budget_estimate: z.number().optional(),
  target_beneficiaries: z.string().optional(),
  implementation_timeline: z.string().optional(),
});

const AnalyzePolicy: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedContent, setUploadedContent] = useState<string>('');

  const form = useForm<PolicyDraftInput>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      title: '',
      category: 'education',
      content: '',
      state: '',
      budget_estimate: undefined,
      target_beneficiaries: '',
      implementation_timeline: '',
    },
  });

  const handleFileUpload = async (file: File, shouldAnalyze: boolean = false) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (shouldAnalyze) {
        const response = await apiService.analyzeUpload(formData);
        toast.success('Document uploaded and analysis started!');
        navigate(`/status/${response.policy_id}`);
      } else {
        const response = await apiService.uploadPolicy(formData);
        setUploadedContent(response.full_content);
        form.setValue('content', response.full_content);
        form.setValue('title', response.title);
        toast.success('Document uploaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to upload document');
    }
  };

  const onSubmit = async (data: PolicyDraftInput) => {
    setIsSubmitting(true);
    try {
      const response = await apiService.analyzePolicy(data);
      toast.success('Policy analysis started!');
      navigate(`/status/${response.policy_id}`);
    } catch (error) {
      toast.error('Failed to start analysis');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center mb-6">
          <FileText className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analyze Policy</h1>
            <p className="text-gray-600">Submit a policy draft for multi-agent analysis with real data sources</p>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {/* Policy Form */}
        <PolicyForm 
          form={form}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          uploadedContent={uploadedContent}
        />

        {/* Tool Integration Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">Real Data Integration</h3>
              <p className="text-blue-700 text-sm mt-1">
                Your policy will be analyzed using 10 real data sources including 
                Indian Kanoon, Census data, Union Budget, World Bank, and social sentiment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePolicy;
