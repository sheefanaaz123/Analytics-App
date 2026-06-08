# Analytics Dashboard with AI-Powered Insights

> A full-stack analytics platform that visualizes business metrics, generates AI-driven insights, and delivers actionable recommendations through an interactive dashboard experience.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![Flask](https://img.shields.io/badge/Flask-3.1.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7.2-purple)

---

## 🚀 Features

* Interactive analytics dashboard with KPI visualization
* AI-powered business insights using Google Gemini
* Trend detection and recommendation engine
* Risk analysis and insight generation workflows
* JWT-based authentication and protected routes
* Responsive React frontend with modern UI components
* Data visualization using ECharts and Recharts
* Dashboard modules for:

  * Overview
  * Analytics
  * Reports
  * Insights
  * Settings
* Dockerized frontend and backend services
* Theme support with light and dark modes

---

## 🛠️ Tech Stack

### Frontend

| Technology        | Version |
| ----------------- | ------- |
| React             | 19.2.0  |
| TypeScript        | 5.9.x   |
| Vite              | 7.2.2   |
| React Router DOM  | 7.9.6   |
| Redux Toolkit     | 2.10.1  |
| Material UI       | 7.3.5   |
| Ant Design        | 6.3.0   |
| Styled Components | 6.3.10  |
| Axios             | 1.13.2  |
| Recharts          | 3.7.0   |
| ECharts           | 6.0.0   |

### Backend

| Technology       | Version           |
| ---------------- | ----------------- |
| Python           | 3.11+ Recommended |
| Flask            | 3.1.3             |
| Flask-CORS       | 6.0.2             |
| PyJWT            | 2.12.1            |
| Python Dotenv    | 1.2.2             |
| Google GenAI SDK | 1.66.0            |
| LangGraph        | Configured        |
| LangChain Core   | Configured        |

### AI & Agent Layer

* Google Gemini 2.5 Flash
* LangGraph
* Multi-agent insight generation
* Trend analysis agent
* Risk assessment agent
* Recommendation agent

### DevOps & Tooling

| Tool           | Purpose                     |
| -------------- | --------------------------- |
| Docker         | Containerization            |
| Docker Compose | Multi-service orchestration |
| ESLint         | Code quality                |
| Git            | Version control             |

---

## 📂 Project Structure

```text
Analytics-App-main/
│
├── backend/
│   ├── agents/
│   │   ├── insight_graph.py          # LangGraph workflow
│   │   ├── trend_agent.py           # Trend analysis agent
│   │   ├── risk_agent.py            # Risk detection agent
│   │   └── recommendation_agent.py # Recommendation engine
│   │
│   ├── routes/
│   │   ├── login.py
│   │   ├── overview.py
│   │   ├── analytics.py
│   │   ├── reports.py
│   │   └── insights.py
│   │
│   ├── services/
│   │   └── gemini_service.py        # Gemini integration
│   │
│   ├── utils/
│   │   └── auth.py                  # JWT authentication
│   │
│   ├── data/
│   │   ├── overview.json
│   │   ├── analytics.json
│   │   ├── reports.json
│   │   ├── insights.json
│   │   └── users.json
│   │
│   ├── app.py                       # Flask entry point
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── app/
│   │   │   └── router.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Overview.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── Reports.tsx
│   │   │   ├── Insights.tsx
│   │   │   └── Setting.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   │
│   │   ├── layouts/
│   │   │   └── DashboardLayout/
│   │   │
│   │   ├── context/
│   │   ├── theme/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── assets/
│   │
│   ├── package.json
│   ├── Dockerfile
│   └── vite.config.*
│
├── docker-compose.yml
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

Install the following tools:

* Node.js 20+
* npm 10+
* Python 3.11+
* Docker (optional)
* Docker Compose (optional)

Verify installation:

```bash
node -v
npm -v
python --version
docker --version
```

---

### Installation

#### 1. Clone Repository

```bash
git clone https://github.com/your-username/analytics-dashboard.git

cd analytics-dashboard
```

---

#### 2. Install Frontend Dependencies

```bash
cd frontend

npm install
```

---

#### 3. Install Backend Dependencies

```bash
cd ../backend

pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file inside the `backend` directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here

SECRET_KEY=your_jwt_secret_here

GOOGLE_CLIENT_ID=your_google_client_id_here
```

> Note: `GOOGLE_CLIENT_ID` appears to be planned for Google OAuth integration but is currently commented out in the backend implementation.

---

## Running the Application

### Start Backend

```bash
cd backend

python app.py
```

Backend will run at:

```text
http://localhost:5000
```

---

### Start Frontend

```bash
cd frontend

npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

### Production Build

```bash
cd frontend

npm run build
```

Preview production build:

```bash
npm run preview
```

---

### Run with Docker

Build and start all services:

```bash
docker-compose up --build
```

Services:

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:5000 |

Stop containers:

```bash
docker-compose down
```

---

## API Overview

### Authentication

```http
POST /api/auth/login
```

Returns:

```json
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "User",
    "email": "user@example.com"
  }
}
```

---

### AI Insights

```http
GET /api/smart-summary
```

Protected endpoint requiring JWT authentication.

Returns:

```json
{
  "summary": "...",
  "insights": [],
  "recommendation": "..."
}
```

---

## 🧪 Running Tests

No automated test suite is currently configured in the repository.

### Lint Frontend

```bash
cd frontend

npm run lint
```

### TypeScript Build Validation

```bash
npm run build
```

Recommended future additions:

* Vitest
* React Testing Library
* Pytest
* Integration testing for API endpoints

---

## 🤝 Contributing

Contributions are welcome.

### Workflow

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

Please ensure:

* Code follows existing style conventions
* Linting passes successfully
* New features include appropriate documentation
* Pull requests contain a clear description of changes

---

## 📄 License

No license file was detected in the repository.

Unless otherwise specified by the project owner, consider adding an MIT License:

```text
MIT License
Copyright (c) 2026
```

---

## Future Enhancements

* Google OAuth authentication
* Persistent database integration
* Real-time analytics updates
* User management and role-based access control
* Automated testing pipeline
* CI/CD deployment workflows
* Cloud deployment support (AWS, GCP, Azure)
* Advanced AI reporting and forecasting
