import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PolicyDraftInput {
  title: string;
  category: string;
  content: string;
  state?: string;
  budget_estimate?: number;
  target_beneficiaries?: string;
  implementation_timeline?: string;
}

export interface AnalysisStatus {
  policy_id: string;
  status: string;
  progress: number;
  current_agent?: string;
  message?: string;
}

export interface AgentReport {
  agent_name: string;
  agent_role: string;
  analysis: string;
  risk_score: number;
  recommendations: string[];
  data_sources: string[];
  key_findings: string[];
  collaboration_notes?: string;
  timestamp: string;
}

export interface ComprehensiveReport {
  policy_id: string;
  policy_title: string;
  overall_score: number;
  overall_grade: string;
  agent_reports: AgentReport[];
  final_synthesis: string;
  critical_issues: string[];
  priority_recommendations: string[];
  strengths: string[];
  weaknesses: string[];
  implementation_roadmap: string;
  workflow_trace: string[];
  generated_at: string;
  processing_time: number;
  model_used: string;
}

export const apiService = {
  // Health check
  getHealth: () => api.get('/health').then(res => res.data),

  // Policy analysis
  analyzePolicy: (data: PolicyDraftInput) => 
    api.post('/api/analyze', data).then(res => res.data),

  // File upload
  uploadPolicy: (formData: FormData) =>
    api.post('/api/upload-policy', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data),

  // Upload and analyze policy document
  analyzeUpload: (formData: FormData) =>
    api.post('/api/analyze-upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data),

  // Status tracking
  getStatus: (policyId: string) =>
    api.get(`/api/status/${policyId}`).then(res => res.data),

  // Report retrieval
  getReport: (policyId: string) =>
    api.get(`/api/report/${policyId}`).then(res => res.data),

  // List reports
  listReports: () =>
    api.get('/api/reports').then(res => res.data),

  // Tools testing
  testTools: () =>
    api.get('/api/test-tools').then(res => res.data),

  // Tools info
  getToolsInfo: () =>
    api.get('/api/tools-info').then(res => res.data),

  // Test single tool
  testSingleTool: (toolName: string, params: any) =>
    api.post('/api/test-single-tool', { tool_name: toolName, ...params })
      .then(res => res.data),
};

export { api };