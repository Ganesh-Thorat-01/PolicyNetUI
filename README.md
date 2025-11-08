# PolicyNet UI

A modern React-based user interface for the PolicyNet Multi-Agent System, designed to analyze policy documents using AI agents and real-time data integration.

## 🚀 Features

- **Multi-Agent Analysis**: Integrated analysis from specialized agents including Legal, Equity, Impact, Sentiment, International, and Compliance experts
- **Real-Time Processing**: Live status tracking and progress updates during policy analysis
- **Interactive Visualizations**: Risk radar charts and implementation roadmaps
- **Modern UI**: Built with React 18, TypeScript, and Tailwind CSS
- **Responsive Design**: Works seamlessly across desktop and tablet devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **State Management**: React Query
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Animation**: Framer Motion

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ganesh-Thorat-01/PolicyNetUI.git
   ```

2. Navigate to the project directory:
   ```bash
   cd PolicyNetUI
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
policynet-ui/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/      # Layout components
│   │   ├── forms/       # Form components
│   │   ├── analysis/    # Analysis and visualization components
│   │   └── common/      # Shared components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── package.json
└── tailwind.config.js
```

## 🔍 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 API Integration

The UI connects to a PolicyNet backend API running on `http://localhost:8000`. Ensure the backend server is running before starting the application.

## 🛡️ Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=http://localhost:8000
```

## 📚 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - [Your GitHub Profile](https://github.com/Ganesh-Thorat-01)

