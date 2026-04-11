# 🤖 AI ChatBot

A full-stack conversational AI chatbot application built with React, TypeScript, and Node.js. This project demonstrates a modern web application with real-time chat functionality, AI-powered responses, and a responsive user interface.

## 🌐 Live Preview

**Try the application now:** [AI ChatBot Live Demo](https://ai-chat-bot-nu-one.vercel.app/)

Experience the full chatbot functionality with real-time AI responses and conversation management.

## ✨ Features

- **Interactive Chat Interface** - Clean, responsive UI with smooth animations
- **Persistent Chat History** - Store and manage multiple conversations
- **AI-Powered Responses** - Integration with OpenRouter API using Llama 3 8B model
- **Real-time Updates** - Instant message delivery and reactions
- **Chat Management** - Create new chats, rename conversations, and delete old chats
- **Responsive Design** - Mobile-friendly interface with adaptive layouts
- **Toast Notifications** - User-friendly feedback for all actions
- **Smooth Animations** - Framer Motion animations for enhanced UX

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web server framework
- **MongoDB** - Document database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### AI Integration
- **OpenRouter API** - Access to multiple AI models
- **Llama 3 8B** - Default language model

## 📁 Project Structure

```
Ai-ChatBot/
├── backend/                           # Express server
│   ├── src/
│   │   ├── index.mjs                  # Server entry point
│   │   ├── models/
│   │   │   └── chatsModel.mjs         # Chat MongoDB schema
│   │   ├── routes/
│   │   │   └── chatsRouter.mjs        # Chat API endpoints
│   │   ├── services/
│   │   │   └── db.mjs                 # MongoDB connection
│   │   └── utils/
│   │       ├── aiResponse.mjs         # AI API integration
│   │       └── utilFunction.mjs       # Utility functions
│   └── package.json
│
├── frontend/                          # React application
│   ├── src/
│   │   ├── main.tsx                   # React entry point
│   │   ├── App.tsx                    # Root component
│   │   ├── Types.tsx                  # TypeScript type definitions
│   │   ├── pages/
│   │   │   ├── ChatPage.tsx           # Main chat page
│   │   │   └── Welcome.tsx            # Welcome page
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx         # Chat display area
│   │   │   ├── InputBox.tsx           # Message input
│   │   │   ├── MessageBubble.tsx      # Message display
│   │   │   └── Sidebar.tsx            # Chat list sidebar
│   │   ├── api/
│   │   │   └── ChatApi.tsx            # API service layer
│   │   ├── assets/                    # Images and assets
│   │   ├── App.css                    # Global styles
│   │   └── index.css                  # Base styles
│   ├── public/
│   │   └── icons/                     # SVG icons
│   ├── package.json
│   ├── vite.config.ts                 # Vite configuration
│   ├── tsconfig.json                  # TypeScript configuration
│   └── eslint.config.js               # ESLint configuration
└── Readme.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud)
- OpenRouter API key

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Manish463/Ai-ChatBot.git
cd Ai-ChatBot
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with required variables
echo "MONGODB_URI=mongodb://localhost:27017/chatbot" > .env
echo "AI_KEY=your_openrouter_api_key" >> .env

# Start the backend server
npm start
```

The backend server will run on `http://localhost:3000`

#### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173` (or as indicated by Vite)

## 📝 Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/chatbot
AI_KEY=your_openrouter_api_key
PORT=3000
```

### Frontend

The frontend connects to the backend API at `http://localhost:3000` by default.

## 🔌 API Endpoints

### Chat Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/chats` | Get all chats |
| POST | `/chats` | Create a new chat |
| PATCH | `/chats/:id` | Rename a chat |
| POST | `/chats/:id` | Update chat (add message) |
| DELETE | `/chats/:id` | Delete a chat |

## 🎯 Key Components

### ChatPage.tsx
Main page container that manages chat state, handles new chat creation, and coordinates between sidebar and chat window.

### Sidebar.tsx
Displays list of recent chats with options to rename and delete. Fully responsive with collapsible design on mobile.

### ChatWindow.tsx
Displays active chat messages and manages the overall chat UI layout.

### InputBox.tsx
Message input field with send functionality. Supports Enter key submission and shows loading state during message transmission.

### MessageBubble.tsx
Individual message component with different styling for user and AI messages. Includes smooth animations.

### ChatApi.tsx
API service layer handling all communication with the backend using Axios.

## 🎨 Design Features

- **Dark Mode Ready** - Tailwind CSS supports easy dark mode implementation
- **Mobile Responsive** - Breakpoints at md (768px) for adaptive layouts
- **Smooth Animations** - Framer Motion for enter/exit animations
- **Loading States** - Visual feedback with spinners and disabled states
- **Color Scheme** - Blue accent colors with gray backgrounds
- **Typography** - Clear hierarchy with semibold fonts
- **Spacing** - Consistent padding and margins for readability

## 🧪 Development

### Linting

```bash
# Frontend
cd frontend
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Code Style

The project uses ESLint with TypeScript support for consistent code style.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🔗 API Integration

The application uses [OpenRouter](https://openrouter.ai/) for AI model access, which provides:
- Multiple model options
- Reliable API infrastructure
- Easy authentication
- Competitive pricing

Currently configured to use **Llama 3 8B** for responses.

## 🐛 Troubleshooting

### Backend Connection Issues
- Verify MongoDB is running
- Check MONGODB_URI in .env file
- Ensure Port 3000 is not in use

### AI Response Errors
- Verify OpenRouter API key is valid
- Check API key hasn't expired
- Ensure account has sufficient credits

### Frontend Connection Issues
- Verify backend is running on port 3000
- Check CORS settings if accessing from different origin
- Clear browser cache and reload

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ using React, Node.js, and AI**
