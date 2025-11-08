import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AnalyzePolicy from './pages/AnalyzePolicy';
import ReportView from './pages/ReportView';
import StatusTracker from './pages/StatusTracker';
import ReportsList from './pages/ReportsList';
import ToolsInfo from './pages/ToolsInfo';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyze" element={<AnalyzePolicy />} />
          <Route path="/report/:policyId" element={<ReportView />} />
          <Route path="/status/:policyId" element={<StatusTracker />} />
          <Route path="/reports" element={<ReportsList />} />
          <Route path="/tools" element={<ToolsInfo />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;