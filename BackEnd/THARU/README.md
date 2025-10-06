# Tharu Salon API (Spring Boot + MySQL)

This module provides a Spring Boot backend to power the Tharu Salon frontend. It exposes REST endpoints to read bookings from a local MySQL database.

## Prerequisites

- **Java 17** (or newer) on your PATH
- **Maven 3.9+**
- **MySQL 8.x** running locally (default port `3306`)

## 1. Install dependencies

```powershell
cd BackEnd/spring-boot
mvn dependency:go-offline
```

## 2. Provision the database

1. Ensure your MySQL server is running.
2. Execute the schema + seed script:
   ```powershell
   mysql -u root -p < database/init.sql
   ```
   Adjust the credentials if you use a non-root account.

## 3. Configure environment variables

Create a `.env` file (or set OS-level variables) to store your credentials. Spring Boot reads the following variables defined in `application.yml`:

```
PORT=8080
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tharu_user
DB_PASSWORD=tharu_password
DB_NAME=tharu_salon
APP_CORS_ORIGINS=http://localhost:5173
```

Ensure the database user exists and has privileges:

```sql
CREATE USER IF NOT EXISTS 'tharu_user'@'localhost' IDENTIFIED BY 'tharu_password';
GRANT ALL PRIVILEGES ON tharu_salon.* TO 'tharu_user'@'localhost';
FLUSH PRIVILEGES;
```

> When running locally you can pass environment variables inline (PowerShell example):
>
> ```powershell
> $env:DB_USER="root"; $env:DB_PASSWORD="yourpassword"; $env:APP_CORS_ORIGINS="http://localhost:5173"; mvn spring-boot:run
> ```

## 4. Run the API

```powershell
mvn spring-boot:run
```

The API listens on `http://localhost:8080` by default.

## 5. Verify the endpoints

Health check:

```powershell
Invoke-RestMethod http://localhost:8080/api/health
```

Bookings list:

```powershell
Invoke-RestMethod http://localhost:8080/api/bookings?limit=5
```

Sample response:

```json
{
  "count": 1,
  "data": [
    {
      "id": 1,
      "reference": "BK-1024",
      "clientName": "Dilani & Nuwan",
      "service": "Signature Bridal Makeup",
      "artist": "Ishara",
      "eventDate": "2025-11-12",
      "status": "CONFIRMED",
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-01T10:00:00Z"
    }
  ]
}
```

## Project structure

```
BackEnd/spring-boot
├── database/
│   └── init.sql
├── pom.xml
├── README.md
└── src/
    ├── main/java/com/tharu/salon
    │   ├── controller/
    │   │   ├── BookingController.java
    │   │   └── HealthController.java
    │   ├── domain/
    │   │   └── Booking.java
    │   ├── dto/
    │   │   └── BookingResponse.java
    │   ├── repository/
    │   │   └── BookingRepository.java
    │   ├── service/
    │   │   └── BookingService.java
    │   └── TharuSalonApiApplication.java
    └── main/resources/
        └── application.yml
```

## Next steps

- Add POST/PUT endpoints to create or update bookings.
- Introduce Spring Security / JWT if authentication is required.
- Use Flyway or Liquibase migrations instead of the manual SQL script once the schema stabilises.
- Dockerise the backend together with a MySQL container for easier onboarding.
