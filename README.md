# Real-Time Enterprise Chat Application

A robust, scalable, and real-time chat application designed for teams and enterprises. This platform provides workspace management, group conversations, direct messaging, user presence, and enterprise-grade administrative features.

## ✨ Core Features

-   **User Authentication**: Secure user registration and login with Email and One-Time Passcodes (OTP).
    
-   **Workspace Management**: Create and manage multiple workspaces, each with its own members, channels, and settings.
    
-   **Real-Time Conversations**:
    
    -   **Group Channels**: Public and private channels for team discussions.
        
    -   **Direct Messages (DMs)**: Secure 1-on-1 conversations.
        
    -   **Live User Status**: See who is Online, Away, or Offline in real-time.
        
    -   **Typing Indicators**: Know when someone is actively typing a reply.
        
-   **Notifications**: In-app and browser-based notifications for mentions and new messages.
    
-   **Enterprise Admin Console**:
    
    -   **User & Role Management (RBAC)**: Assign roles and permissions (Admin, Member, Guest, Custom Roles).
        
    -   **Audit Logs**: Track significant actions for security and compliance.
        
    -   **Data Governance**: Implement data retention and eDiscovery policies.
        

## 🛠️ Tech Stack

This project uses a modern technology stack, separating concerns between a RESTful API for state management and WebSockets for real-time communication.

| **Area** | **Technology** | **Description** | | **Backend** | Go with Gin | For building a high-performance, robust REST API. | | | Gorilla WebSocket | For handling persistent, real-time WebSocket connections. | | | PostgreSQL | Primary relational database for storing users, messages, etc. | | | Redis | For managing user session data and real-time presence status. | | | JWT (JSON Web Tokens) | For securing API endpoints and authenticating WebSocket connections. | | **Frontend** | React with TypeScript (Vite) | A modern, type-safe JavaScript framework for a reactive UI. | | | Tailwind CSS | For utility-first styling. | | | Zustand / Redux | For predictable global state management. | | **DevOps** | Docker | For containerizing the application for easy deployment. |

## 🏛️ Architecture Overview

The system is designed with a hybrid architecture to ensure both reliability and real-time performance.

1.  **REST API (Stateless)**: Handles all non-real-time actions that require a definitive state change. This includes:
    
    -   User registration, login, and profile updates.
        
    -   Workspace and channel creation/management.
        
    -   Fetching historical data (e.g., loading past messages in a channel).
        
2.  **WebSocket Server (Stateful)**: Manages all live, ephemeral events. Once the user logs in, the frontend establishes a persistent WebSocket connection for:
    
    -   Sending and receiving new messages in real-time.
        
    -   Broadcasting and receiving user presence updates (online/offline).
        
    -   Showing typing indicators.
        

This separation ensures that critical data management is handled reliably by the REST API, while the low-latency communication needed for a chat app is handled efficiently by WebSockets.

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Go (v1.20.x or later)
    
-   Node.js (v18.x or later for frontend tooling)
    
-   npm / yarn
    
-   PostgreSQL
    
-   Redis
    
-   Docker (optional, for containerized setup)
    

### Installation & Setup

1.  **Clone the repository:**
    
    ```
    git clone https://github.com/your-username/real-time-chat-app.git
    cd real-time-chat-app
    
    
    ```
    
2.  **Backend Setup (Go):**
    
    ```
    cd server
    go mod tidy
    
    
    ```
    
    Create a `.env` file from the provided `.env.example` and fill in your database credentials, JWT secret, and other environment variables.
    
    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/chatapp"
    REDIS_URL="redis://localhost:6379"
    JWT_SECRET="your-super-secret-key"
    PORT=5000
    
    
    ```
    
3.  **Frontend Setup (React + Vite):**
    
    ```
    cd client
    npm install
    
    
    ```
    
    Create a `.env.local` file and specify the backend API URL.
    
    ```
    VITE_API_BASE_URL=http://localhost:5000
    VITE_WS_URL=ws://localhost:5000
    
    
    ```
    

### Running the Application

1.  **Start the Backend Server:**
    
    ```
    cd server
    go run main.go
    
    
    ```
    
    The server should now be running on `http://localhost:5000`.
    
2.  **Start the Frontend Development Server:**
    
    ```
    cd client
    npm run dev
    
    
    ```
    
    The application will be accessible at `http://localhost:5173`.
    

## 📄 API & WebSocket Event Reference

### Key REST API Endpoints

-   `POST /api/auth/register`: Create a new user account.
    
-   `POST /api/auth/login`: Log in a user and receive a JWT.
    
-   `GET /api/users/me`: Get the profile of the currently logged-in user.
    
-   `GET /api/workspaces`: Get all workspaces the user is a member of.
    
-   `POST /api/workspaces`: Create a new workspace.
    
-   `GET /api/channels/{id}/messages`: Fetch message history for a channel.
    

### Primary WebSocket Events

The client and server communicate via JSON payloads with a `type` and `payload` structure.

-   **Client to Server:**
    
    -   `{ "type": "sendMessage", "payload": { "channelId", "text" } }`: Sends a new message to a channel.
        
    -   `{ "type": "typingStart", "payload": { "channelId" } }`: Notifies that the user has started typing.
        
-   **Server to Client (Broadcasts):**
    
    -   `{ "type": "newMessage", "payload": { ...messageObject } }`: A new message has been posted in a channel.
        
    -   `{ "type": "statusUpdate", "payload": { "userId", "status": "online" | "offline" } }`: A user's presence has changed.
        
    -   `{ "type": "userTyping", "payload": { "userId", "channelId" } }`: A user is currently typing in a channel.
        

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
    
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
    
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
    
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
    
5.  Open a Pull Request
    

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.