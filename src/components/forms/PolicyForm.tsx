import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PolicyDraftInput } from '../../services/api';

interface PolicyFormProps {
  form: UseFormReturn<PolicyDraftInput>;
  onSubmit: (data: PolicyDraftInput) => Promise<void>;
  isSubmitting: boolean;
  uploadedContent?: string;
}

const PolicyForm: React.FC<PolicyFormProps> = ({
  form,
  onSubmit,
  isSubmitting,
  uploadedContent,
}) => {
  const { register, handleSubmit, formState: { errors } } = form;

  const categories = [
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'environment', label: 'Environment' },
    { value: 'economy', label: 'Economy' },
    { value: 'social_welfare', label: 'Social Welfare' },
    { value: 'technology', label: 'Technology' },
    { value: 'employment', label: 'Employment' },
    { value: 'housing', label: 'Housing' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Policy Title
        </label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          {...register('category')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        >
          {categories.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Policy Content
        </label>
        <textarea
          {...register('content')}
          rows={10}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          defaultValue={uploadedContent}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State/Region
          </label>
          <input
            type="text"
            {...register('state')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="budget_estimate" className="block text-sm font-medium text-gray-700">
            Budget Estimate (₹ in Crores)
          </label>
          <input
            type="number"
            {...register('budget_estimate', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="target_beneficiaries" className="block text-sm font-medium text-gray-700">
          Target Beneficiaries
        </label>
        <input
          type="text"
          {...register('target_beneficiaries')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="implementation_timeline" className="block text-sm font-medium text-gray-700">
          Implementation Timeline
        </label>
        <input
          type="text"
          {...register('implementation_timeline')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          placeholder="e.g., Q4 2023 - Q2 2024"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-md px-4 py-2 text-white font-medium ${
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Analyzing...' : 'Start Analysis'}
        </button>
      </div>
    </form>
  );
};

export default PolicyForm;