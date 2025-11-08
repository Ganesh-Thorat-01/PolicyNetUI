import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'indigo';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color]} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center">
        <Icon className="h-8 w-8 mr-3" />
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;