# Governance Insight 📰🤖

> AI-powered platform for real-time news monitoring, sentiment analysis, and ministry-wise classification with tools to flag misleading content.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-blue?logo=mui)](https://mui.com/)
[![Docker](https://img.shields.io/badge/Docker-blue?logo=docker)](https://www.docker.com/)

## 🚀 Features

### 🔍 **Intelligent News Monitoring**
- **Real-time Crawling**: Automatically scrapes news from multiple sources
- **Smart Classification**: AI-powered categorization by government ministries
- **Advanced Filtering**: Search and filter by classification, sentiment, ministry, and date

### 🧠 **AI-Powered Analysis**
- **Sentiment Analysis**: Automatic detection of positive, negative, and neutral sentiment
- **Content Classification**: Intelligent categorization into Entertainment, Politics, Business, etc.
- **Ministry Assignment**: Automatic assignment to relevant government ministries

### 📊 **Analytics Dashboard**
- **Interactive Visualizations**: Comprehensive charts and graphs
- **Trend Analysis**: Track sentiment trends over time
- **Ministry-wise Reports**: Detailed analytics for each government ministry
- **Real-time Statistics**: Live updates on crawling status and article counts

### 🛡️ **Content Moderation**
- **Article Reporting**: Flag inappropriate or misleading content
- **Email Notifications**: Automated alerts to ministries and sources
- **Review System**: Comprehensive reporting and review workflow

### 🎨 **Modern User Experience**
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Professional dark mode interface
- **Lottie Animations**: Engaging micro-interactions
- **Intuitive Navigation**: Clean and user-friendly interface

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │     Backend      │    │    External     │
│   (Next.js)     │◄──►│    (FastAPI)     │◄──►│  News Sources   │
│                 │    │                  │    │                 │
│ • React Pages   │    │ • News Crawler   │    │ • RSS Feeds     │
│ • Material-UI   │    │ • AI Analysis    │    │ • Web Articles  │
│ • TypeScript    │    │ • Database       │    │ • APIs          │
│ • Lottie        │    │ • Email Service  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Styling**: Custom CSS with MUI theming
- **Animations**: Lottie React Player
- **State Management**: React Hooks

### Backend (Assumed)
- **Framework**: FastAPI
- **Language**: Python
- **Database**: PostgreSQL/MySQL
- **AI/ML**: Sentiment analysis models
- **Email**: Automated notification system

### DevOps
- **Containerization**: Docker
- **Deployment**: Production-ready Docker setup
- **Environment**: Node.js 20 Alpine

## 📦 Installation & Setup

### Prerequisites
- Node.js 20 or higher
- Docker (for containerized deployment)
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/newsgovinsight.git
cd newsgovinsight
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
```
http://localhost:3000
```

### Docker Deployment

1. **Build the image**
```bash
docker build -t newsgovinsight .
```

2. **Run the container**
```bash
docker run -p 3000:3000 newsgovinsight
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Your Name]

</div>
