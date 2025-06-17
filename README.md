# 🛒 Full Ecommerce Web Application (.NET & Angular)

This is a **full-stack e-commerce application** built with **ASP.NET Core** for the backend and **Angular** for the frontend. It follows **Clean Architecture** principles, integrates with **Stripe** for payments, uses **Redis** for basket caching, and applies **Entity Framework Core** with **Fluent API** for database interaction.

---

## 📁 Project Structur

```
│
├── Ecom/ # Backend solution
│ ├── Ecom.Api/ # Main ASP.NET Core Web API project
│ │ ├── Controllers/ # API Endpoints (Account, Basket, Orders, Products, etc.)
│ │ ├── Helper/ # API Helpers (Pagination, ResponseAPI, Exceptions)
│ │ ├── Mapping/ # AutoMapper profiles for entities and DTOs
│ │ ├── Middleware/ # Custom exception handling middleware
│ │ ├── wwwroot/Images/ # Static image storage
│ │ └── Program.cs # App startup
│ │ └── appsettings.json # Configuration files
│ │ └── Dockerfile # For containerization
│ │
│ ├── Ecom.Core/ # Domain layer (Entities, Interfaces, DTOs)
│ │ ├── DTOs/ # Data Transfer Objects
│ │ ├── Entities/ # Domain models (Product, Order, User, etc.)
│ │ ├── Interfaces/ # Service and repository contracts
│ │ ├── Services/ # Service interfaces
│ │ └── Sharing/ # Shared helper classes
│ │
│ ├── Ecom.Infrastructure/ # Infrastructure layer
│ │ ├── Data/ # DB Context, Configs, Migrations
│ │ ├── Repositories/ # Repository implementations
│ │ ├── Services/ # Concrete service implementations
│ │ └── infrastructureRegisteration.cs # Dependency Injection
│
│ └── Ecom.sln # Visual Studio solution file
│
├── client/ # Angular Frontend
│ ├── src/
│ │ ├── app/
│ │ │ ├── basket/ # Basket functionality
│ │ │ ├── checkout/ # Checkout process (address, delivery, payment)
│ │ │ ├── identity/ # Auth (register, login, reset-password)
│ │ │ ├── orders/ # Order history & details
│ │ │ ├── search/ # Search functionality
│ │ │ ├── shop/ # Product browsing
│ │ │ ├── core/ # Services, Interceptors, Nav/Footer
│ │ │ └── shared/ # Shared components and models
│ │ ├── assets/
│ │ ├── environments/
│ │ └── styles.scss # Global styles
│ ├── angular.json
│ └── server.ts # Angular Universal SSR entry (optional)
│
├── README.md
└── dbo.Products.data.sql # Sample data for seeding
```


---

## 🚀 Technologies Used

### 🔧 Backend (.NET Core)
- **ASP.NET Core 7**
- **Entity Framework Core** + **Code-First Migrations**
- **Fluent API** for model configuration
- **Clean Architecture** (Core / Infrastructure / API separation)
- **AutoMapper** for mapping entities to DTOs
- **Redis** for caching the basket
- **Stripe API** for payment processing
- **JWT Authentication**
- **Custom Middleware** for global exception handling
- **Repository & Unit of Work Patterns**
- **Dockerfile** included for containerization

### 🎨 Frontend (Angular)
- **Angular 16+**
- **Lazy Loading Modules** for feature separation
- **Reactive Forms** for checkout and login
- **HTTP Interceptors** for token handling & error catching
- **Angular Services** for business logic separation
- **Modular Folder Structure** (Shop, Orders, Basket, etc.)
- **SCSS** for styling
- **Angular Routing** with guards

---

## 💡 Key Features

- ✅ User Authentication (Register / Login / JWT)
- 🛒 Basket system with Redis caching
- 💳 Checkout and Stripe payment integration
- 📦 Order history and tracking
- 📷 Image handling (upload & display)
- 📁 Clean, maintainable architecture
- 🧪 Ready for deployment with Docker

---

## 📦 Getting Started

### 🔙 Backend
```bash
cd Ecom
dotnet ef database update       # Apply migrations
dotnet run                      # Start API

```
### 🎯 Frontend

```bash
cd client
npm install
ng serve
```

### 📌 Notes
Make sure to configure Stripe API Keys and Redis Connection in appsettings.json.

Do not commit sensitive data (use environment variables or user secrets in production).

👨‍💻 Author
Youssef Ibrahim
Full Stack .NET & Angular Developer
