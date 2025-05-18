# Quiz App v2

built with **Node.js**, **React**, **DynamoDB**, **Docker**, and **AWS ECS**.


## Features

- User authentication (JWT-based signup/signin)
- Create, edit, delete quizzes
- Take quizzes and view results
- Responsive UI
- AWS deployment
- Automated CI/CD with GitHub Actions

---

## Architecture

- **Frontend:** React (served via Nginx in Docker)
- **Backend:** Node.js (Express, JWT Auth)
- **Database:** AWS DynamoDB
- **Containerization:** Docker
- **Orchestration:** AWS ECS (Fargate)
- **Load Balancer:** AWS ALB (HTTPS)
- **CI/CD:** GitHub Actions

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/)
- [AWS CLI](https://aws.amazon.com/cli/)
- AWS account with permissions for ECS, ECR, ACM, CloudFormation, and DynamoDB
- [GitHub account](https://github.com/)

---

## Local Development

### 1. Clone the Repository

git clone https://github.com/your-username/quiz-app-v2.git
cd quiz-app-v2


### 2. Environment Setup

#### **Backend**

Create `backend/.env`:

AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
JWT_SECRET=your-jwt-secret
PORT=3001


#### **Frontend**

Create `frontend/.env`:

REACT_APP_API_URL=http://localhost:3001


### 3. Run Locally with Docker Compose

docker-compose up --build


- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)

---

## Cloud Deployment

### 1. Build and Push Docker Images

docker build -t <your-backend-ecr-uri>:latest ./backend
docker build -t <your-frontend-ecr-uri>:latest ./frontend

docker push <your-backend-ecr-uri>:latest
docker push <your-frontend-ecr-uri>:latest


### 2. Deploy Infrastructure with CloudFormation

Edit `infra/quiz-app-all.yml` parameters as needed, then run:

./infra/deploy-quiz-app-v2-all.sh


### 3. Access the App

- Open your browser to `https://<ALB_DNS_NAME>/` (from CloudFormation outputs).

---

## API Endpoints

### **Authentication**

- `POST /api/auth/signup` – Register a new user
- `POST /api/auth/login` – Login and receive JWT

### **Quiz Management** (Authenticated)

- `GET /api/quizzes` – List all quizzes
- `POST /api/quizzes` – Create a quiz
- `GET /api/quizzes/:id` – Get a specific quiz
- `PUT /api/quizzes/:id` – Update a quiz
- `DELETE /api/quizzes/:id` – Delete a quiz

**All quiz endpoints require the `Authorization: Bearer <JWT_TOKEN>` header.**

---

## Testing the API with curl

> Replace `<ALB_DNS>` with your ALB DNS name or `localhost:3001` for local testing.  
> Replace `YOUR_JWT_TOKEN` with the token from login, and `<quiz_id>` with the actual quiz ID.

### **Register a new user**

curl -X POST https://<ALB_DNS>/api/auth/signup
-H "Content-Type: application/json"
-d '{"username": "testuser", "password": "testpassword"}'


### **Login**

curl -X POST https://<ALB_DNS>/api/auth/login
-H "Content-Type: application/json"
-d '{"username": "testuser", "password": "testpassword"}'


### **Create a new quiz**

curl -X POST https://<ALB_DNS>/api/quizzes
-H "Content-Type: application/json"
-H "Authorization: Bearer YOUR_JWT_TOKEN"
-d '{
"title": "Sample Quiz",
"questions": [
{
"text": "What is 2+2?",
"options": ["3", "4", "5", "2"],
"correct": 1
}
]
}'


### **Get all quizzes**

curl -X GET https://<ALB_DNS>/api/quizzes
-H "Authorization: Bearer YOUR_JWT_TOKEN"


### **Get a specific quiz**

curl -X GET https://<ALB_DNS>/api/quizzes/<quiz_id>
-H "Authorization: Bearer YOUR_JWT_TOKEN"


### **Update a quiz**

curl -X PUT https://<ALB_DNS>/api/quizzes/<quiz_id>
-H "Content-Type: application/json"
-H "Authorization: Bearer YOUR_JWT_TOKEN"
-d '{
"title": "Updated Quiz Title",
"questions": [
{
"text": "Updated question?",
"options": ["A", "B", "C", "D"],
"correct": 2
}
]
}'


### **Delete a quiz**

curl -X DELETE https://<ALB_DNS>/api/quizzes/<quiz_id>
-H "Authorization: Bearer YOUR_JWT_TOKEN"


---

graph TD
  User((User))
  subgraph AWS Cloud
    ALB[Application Load Balancer<br/>HTTPS/443, HTTP/80]
    FE[ECS Fargate: Frontend (React/Nginx)]
    BE[ECS Fargate: Backend (Node.js/Express)]
    DB[(DynamoDB)]
  end

  User-->|HTTPS|ALB
  ALB-->|80|FE
  ALB-->|3001|BE
  FE-->|API Calls (HTTPS/443 via ALB)|ALB
  BE-->|DynamoDB API|DB
