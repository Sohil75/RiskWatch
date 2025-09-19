# RiskWatch - Credit Card Fraud Detection

A comprehensive credit card fraud detection application built with React frontend and Node.js backend.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Fraud Detection**: Advanced algorithms to detect suspicious transactions
- **Transaction History**: Complete transaction tracking and analysis
- **Real-time Monitoring**: Live fraud detection and alerts
- **Dashboard**: Comprehensive analytics and reporting

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- Material-UI (MUI)
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sohil75/RiskWatch.git
   cd RiskWatch
   ```

2. **Install dependencies**

   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   ```bash
   # Copy the example environment file
   cp server/env.example server/.env

   # Edit server/.env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

## 🌐 Free Deployment Guide

### Backend Deployment (Render - 100% Free)

1. **Set up MongoDB Atlas (Free)**

   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Sign up for free account
   - Create a new cluster (choose the free M0 tier)
   - Create a database user
   - Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/creditcard-fraud`)

2. **Deploy to Render**

   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account (no credit card required)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose your RiskWatch repository
   - **Important**: Set the root directory to `server`

3. **Configure Render Settings**

   - **Name**: `riskwatch-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

4. **Set Environment Variables in Render**

   - Go to Environment tab
   - Add these variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/creditcard-fraud
     JWT_SECRET=your-super-secret-jwt-key-make-it-very-long-and-random
     NODE_ENV=production
     ```

5. **Deploy**: Click "Create Web Service" - Render will automatically deploy!

### Frontend Deployment (Vercel - 100% Free)

1. **Sign up for Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account (no credit card required)

2. **Import Project**

   - Click "New Project"
   - Import your RiskWatch repository
   - Set the root directory to `client`

3. **Configure Build Settings**

   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set Environment Variables**

   - Go to your project settings in Vercel
   - Click on "Environment Variables" tab
   - Add a new variable:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://riskwatch-backend.onrender.com` (replace with your actual Render URL)
     - **Environment**: Production, Preview, Development (select all)
   - Click "Save"

5. **Deploy**: Click "Deploy" - Vercel will automatically build and deploy!

## 🔧 Environment Variables

### Backend (.env for local development)

```env
MONGODB_URI=mongodb://localhost:27017/creditcard-fraud
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
```

### Backend (Render - Production)

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/creditcard-fraud
JWT_SECRET=your-super-secret-jwt-key-make-it-very-long-and-random
NODE_ENV=production
```

### Frontend (Vercel)

```env
VITE_API_URL=https://your-backend-name.onrender.com
```

## 📱 Usage

1. **Register/Login**: Create an account or sign in
2. **Dashboard**: View your transaction overview
3. **Add Transactions**: Input new credit card transactions
4. **Fraud Detection**: System automatically analyzes for fraud
5. **History**: Review all past transactions and fraud alerts

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation and sanitization
- Secure MongoDB connections

## 📊 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/health` - Health check

### Fraud Detection

- `POST /api/fraud/check` - Check transaction for fraud
- `GET /api/fraud/history` - Get fraud detection history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Sohil75**

- GitHub: [@Sohil75](https://github.com/Sohil75)

## 🆘 Support

If you have any questions or need help with deployment, please open an issue on GitHub.

---

**Live Demo**: [Your deployed frontend URL]
**API Documentation**: [Your deployed backend URL]/api
