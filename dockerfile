FROM node:18

WORKDIR /app

# Copy and install backend dependencies
COPY backend/package.json backend/package-lock.json* ./backend/
RUN npm install --only=production --prefix backend

# Copy and install frontend dependencies
COPY frontend/package.json frontend/package-lock.json* ./frontend/
RUN npm install --prefix frontend

# Copy full backend and frontend source
COPY backend ./backend
COPY frontend ./frontend

# Build frontend
RUN npm run build --prefix frontend

# Expose port for backend (assumed on 3000)
EXPOSE 5000

# Start backend server
CMD ["npm", "start", "--prefix", "backend"]
