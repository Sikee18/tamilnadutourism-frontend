# Postman Testing Guide

This guide provides step-by-step instructions to test the Tourism Application API using Postman. It covers authentication, role-based operations (User, Guide, Shopkeeper), and interacting with the chatbot.

## Setup
1.  **Base URL**: `http://localhost:3000` (or your server URL).
2.  **Environment Variables**: Create a Postman Environment to store:
    -   `url`: `http://localhost:3000`
    -   `jwt_token`: <Auth Token returned from login>

---

## 1. Authentication (All Roles)

Before performing any role-specific operations, you must create an account and log in to get a JWT token.

### 1.1 Sign Up
*   **Method**: `POST`
*   **URL**: `{{url}}/auth/signup`
*   **Body** (JSON):
    ```json
    {
        "email": "user@example.com",
        "password": "password123",
        "fullName": "John Doe",
        "role": "USER" 
    }
    ```
    *Note: Change `role` to `GUIDE` or `SHOPKEEPER` to test other personas.*

### 1.2 Login
*   **Method**: `POST`
*   **URL**: `{{url}}/auth/login`
*   **Body** (JSON):
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
*   **Response**: 
    ```json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIs..."
    }
    ```
*   **Action**: Copy the `access_token` and set it as your `Bearer Token` Authorization for subsequent requests.

---

## 2. User Operations
*Role Required*: `USER`

### 2.1 View Available Tours
*   **Method**: `GET`
*   **URL**: `{{url}}/guide/available-tours`
*   **Auth**: Bearer Token
*   **Description**: Lists all tours available for booking.

### 2.2 Apply Coupon/Promo Code
*   **Method**: `POST`
*   **URL**: `{{url}}/promo/apply`
*   **Auth**: Bearer Token
*   **Body** (JSON):
    ```json
    {
        "promoCode": "SUMMER2024"
    }
    ```

### 2.3 Initialize User Context (For Chatbot)
Updates the system with your current status for better chatbot responses.
*   **Method**: `POST`
*   **URL**: `{{url}}/user-context/init`
*   **Auth**: Bearer Token (Optional, acts on passed userId)
*   **Body** (JSON):
    ```json
    {
        "userId": "<YOUR_USER_ID>"
    }
    ```

### 2.4 Chat with Chatbot (User Persona)
*   **Method**: `POST`
*   **URL**: `{{url}}/chat-bot`
*   **Body** (JSON):
    ```json
    {
        "prompt": "I'm looking for a beach destination in Kerala.",
        "userId": "<YOUR_USER_ID>"
    }
    ```

---

## 3. Guide Operations
*Role Required*: `GUIDE`

### 3.1 Create Guide Profile
*   **Method**: `POST`
*   **URL**: `{{url}}/guide/profile`
*   **Auth**: Bearer Token
*   **Body** (JSON):
    ```json
    {
        "name": "Jane Guide",
        "place": "Varkala",
        "qualification": "Certified Tour Guide",
        "experience": "5 Years",
        "languagesKnown": "English, Malayalam, Hindi"
    }
    ```

### 3.2 Create a New Tour
*   **Method**: `POST`
*   **URL**: `{{url}}/guide/tours`
*   **Auth**: Bearer Token
*   **Body** (JSON):
    ```json
    {
        "tourName": "Varkala Cliff Walk",
        "location": "Varkala",
        "description": "A scenic walk along the cliffs.",
        "duration": "3 hours",
        "maxParticipants": 15,
        "startDate": "2024-01-15T09:00:00Z",
        "endDate": "2024-01-15T12:00:00Z",
        "placesCovered": ["North Cliff", "Black Beach"]
    }
    ```

### 3.3 View My Created Tours
*   **Method**: `GET`
*   **URL**: `{{url}}/guide/tours`
*   **Auth**: Bearer Token

### 3.4 Search Users (Potential Travellers)
*   **Method**: `GET`
*   **URL**: `{{url}}/guide/users?q=John`
*   **Auth**: Bearer Token

### 3.5 Chat with Chatbot (Guide Persona)
*   **Method**: `POST`
*   **URL**: `{{url}}/chat-bot`
*   **Body** (JSON):
    ```json
    {
        "prompt": "How can I improve my tour descriptions to attract more nature lovers?",
        "userId": "<YOUR_USER_ID>"
    }
    ```

---

## 4. Shopkeeper Operations
*Role Required*: `SHOPKEEPER`

### 4.1 Create Shopkeeper Profile
*   **Method**: `POST`
*   **URL**: `{{url}}/shopkeeper/profile`
*   **Auth**: Bearer Token
*   **Body** (JSON):
    ```json
    {
        "shopName": "Varkala Spices",
        "promoCode": "VAR10",
        "location": "Varkala North Cliff"
    }
    ```

### 4.2 View Shopkeeper Profile
*   **Method**: `GET`
*   **URL**: `{{url}}/shopkeeper/profile`
*   **Auth**: Bearer Token
*   **Description**: Returns your shopkeeper profile details.

### 4.3 View Users Who Used Promo
*   **Method**: `GET`
*   **URL**: `{{url}}/shopkeeper/promo/users`
*   **Auth**: Bearer Token
*   **Description**: Returns a list of users who have applied your shop's promo code.

### 4.4 Mark User as Paid
*   **Method**: `PATCH`
*   **URL**: `{{url}}/shopkeeper/promo/mark-paid`
*   **Auth**: Bearer Token
*   **Body** (JSON):
    ```json
    {
        "userId": "<TARGET_USER_UUID>"
    }
    ```

### 4.5 Chat with Chatbot (Shopkeeper Persona)
*   **Method**: `POST`
*   **URL**: `{{url}}/chat-bot`
*   **Body** (JSON):
    ```json
    {
        "prompt": "What are some trending souvenir items this season?",
        "userId": "<YOUR_USER_ID>"
    }
    ```

---

## Summary of Chatbot Integration

The chatbot endpoint `POST /chat-bot` is universal. It processes the `prompt` and optionally uses the `userId` to fetch context (like user role, current navigation path, or booking history) to give a personalized answer.

**Request Body:**
```json
{
    "prompt": "Your question here...",
    "userId": "Optional UUID for context"
}
```
