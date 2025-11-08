import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { AgentReport } from '../../services/api';

interface RiskRadarProps {
  reports: AgentReport[];
}

const RiskRadar: React.FC<RiskRadarProps> = ({ reports }) => {
  const radarData = reports.map(report => ({
    subject: report.agent_name.split(' ')[0], // Take first word
    risk: report.risk_score,
    fullMark: 10,
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar
            name="Risk Score"
            dataKey="risk"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskRadar;