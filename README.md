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

## 🌐 Deployment

### Backend Deployment (Railway)

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Deploy from GitHub**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your RiskWatch repository
   - Select the `server` folder as the root directory

3. **Set Environment Variables**
   - Go to your project settings
   - Add these environment variables:
     ```
     MONGODB_URI=your-mongodb-connection-string
     JWT_SECRET=your-super-secret-jwt-key
     NODE_ENV=production
     ```

4. **Add MongoDB Database**
   - In Railway dashboard, click "New"
   - Select "Database" → "MongoDB"
   - Connect it to your backend service

### Frontend Deployment (Vercel)

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your RiskWatch repository
   - Set the root directory to `client`

3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set Environment Variables**
   - Add `VITE_API_URL` with your Railway backend URL
   - Example: `https://your-app.railway.app`

## 🔧 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/creditcard-fraud
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
NODE_ENV=development
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend-url.railway.app
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
