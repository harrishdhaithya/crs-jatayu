# crs-jatayu

A serverless Central Reservation System (CRS) REST API built with AWS Lambda, API Gateway, Node.js, and Prisma ORM backed by a MySQL database.

## Tech Stack

- **Runtime**: Node.js 12.x
- **Framework**: Serverless Framework
- **ORM**: Prisma v3
- **Database**: MySQL
- **Cloud**: AWS (Lambda + API Gateway)

## Data Model

```
State → City → Hotel → Room → Availability
                            → Facility
                            → Booking → SoldOut → Sellables
```

## Prerequisites

- Node.js 12+
- AWS CLI configured with a `serverlessUser` profile
- MySQL database
- Serverless Framework: `npm install -g serverless`

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Copy the example env file and set your database URL:
   ```bash
   cp .env.example .env
   ```
   ```env
   DATABASE_URL="mysql://user:password@host:3306/dbname"
   ```

3. Run Prisma migrations:
   ```bash
   npx prisma migrate deploy
   ```

4. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

## Running Locally

```bash
serverless offline
```

## Deployment

```bash
serverless deploy
```

## API Reference

### State
| Method | Path | Description |
|--------|------|-------------|
| GET | /states | List all states |
| POST | /state/add | Add a state |
| DELETE | /state/delete/{id} | Delete a state |

### City
| Method | Path | Description |
|--------|------|-------------|
| GET | /cities | List all cities |
| POST | /city/add | Add a city |
| DELETE | /city/delete/{id} | Delete a city |

### Hotel
| Method | Path | Description |
|--------|------|-------------|
| GET | /hotels | List all hotels (includes city and rooms) |
| POST | /hotel/add | Add a hotel |
| PATCH | /hotel/update/{id} | Update a hotel |
| DELETE | /hotel/delete/{id} | Delete a hotel |

### Room
| Method | Path | Description |
|--------|------|-------------|
| GET | /rooms | List all rooms |
| POST | /room/add | Add a room |
| PATCH | /room/update/{id} | Update a room |
| DELETE | /room/delete/{id} | Delete a room |

### Availability
| Method | Path | Description |
|--------|------|-------------|
| POST | /availability/add | Add availability for a room |
| PATCH | /availability/update | Update availability |

### Booking
| Method | Path | Description |
|--------|------|-------------|
| POST | /booking/create | Create a booking |
| DELETE | /booking/cancel/{id} | Cancel a booking |

### Facility Types
| Method | Path | Description |
|--------|------|-------------|
| GET | /factypes | List all facility types |
| POST | /factype/add | Add a facility type |
| DELETE | /factype/delete/{id} | Delete a facility type |

### Facility
| Method | Path | Description |
|--------|------|-------------|
| POST | /facility/add | Assign a facility to a room |
| GET | /facility/room/{id} | Get facilities for a room |
| DELETE | /facility/delete/{id} | Remove a facility |

### Sellables
| Method | Path | Description |
|--------|------|-------------|
| POST | /sellable/add | Add a sellable item to a hotel |
| DELETE | /sellable/delete/{id} | Delete a sellable item |

## Request Body Examples

**POST /state/add**
```json
{ "name": "Maharashtra" }
```

**POST /city/add**
```json
{ "name": "Mumbai", "stateId": 1 }
```

**POST /hotel/add**
```json
{
  "name": "Grand Hotel",
  "address": "123 Main St",
  "email": "contact@grandhotel.com",
  "phoneNumber": "+911234567890",
  "cityId": 1
}
```

**POST /room/add**
```json
{
  "type": "Deluxe",
  "beds": 2,
  "description": "Spacious room with sea view",
  "hotelId": 1,
  "price": 4999.00,
  "checkInTime": "14:00"
}
```

**POST /availability/add**
```json
{ "roomId": 1, "quantity": 5, "date": "2026-04-01T00:00:00.000Z" }
```

**POST /booking/create**
```json
{
  "roomId": 1,
  "userid": "user_abc123",
  "date": "2026-04-01T00:00:00.000Z",
  "Price": 4999.00
}
```


