# Stretford Cafe - Backend

<br/>

<div style="display:flex; justify-content:center">
    <img src="public/images/coffee 1.png" alt="stretford-cafe" />
</div>

## Build With

[![express](https://img.shields.io/npm/v/express?label=express)](https://www.npmjs.com/package/express)
[![jsonwebtoken](https://img.shields.io/npm/v/jsonwebtoken?label=jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
[![bcrypt](https://img.shields.io/npm/v/bcrypt?label=bcrypt)](https://www.npmjs.com/package/bcrypt)
[![cors](https://img.shields.io/npm/v/cors?label=cors)](https://www.npmjs.com/package/cors)
[![multer](https://img.shields.io/npm/v/multer?label=multer)](https://www.npmjs.com/package/multer)

<br/>

## Description

Stretford Cafe is a web application that can make it easier for customer to order food and beverages from coffee shop. Customer can simply register, login, see products, order, see order history, edit their profile, etc.

## API Endpoint

#### Register

Endpoint: `/auth/new`

- Body
  | KEY | TYPEDATA |
  | --- | --- |
  | Email | `string` |
  | Password | `string` |
  | Phone | `string` |

#### Login

Endpoint: `/auth`

- Body
  | KEY | TYPEDATA |
  | --- | --- |
  | Email | `string` |
  | Password | `string` |

#### Search Product

Endpoint: `/products`

- Query `optional`
  | KEY | TYPEDATA |
  | --- | --- |
  | categories | `string` |
  | page | `number` |
  | limit | `number` |
  | find | `string` |
  | sort | `string` |
  | order | `string` |

#### Forgot Password

#### Product detail

#### Edit profile

### Users:

- Login
- Register
- Forgot Password
- Search product
- Product's detail
- Payment
- History
- Edit profile

### Admin:

- Add product
- Edit product
- Add promo
- Edit promo
- Dashboard Admin

## How to Run the Application

### 1. Clone this repository

Clone this repository by run the following code:

```
$ git clone https://github.com/IlhamNurrohman/Stretford-Cafe.git
```

### 2. Install dependency packages

Install dependency packages by run the following code inside project folder:

```
$ npm install
```

### 3. Set up .env

| KEYWORD          | VALUE                       |
| ---------------- | --------------------------- |
| CLOUD_NAME       | "YOUR API NAME"             |
| CLOUD_API        | "YOUR API KEY"              |
| CLOUD_SECRET     | "YOUR CLOUD SECRET"         |
| DATABASE_URL     | "YOUR DATABASE URL"         |
| JWT_SECRET       | "YOUR JWT SECRET"           |
| JWT_ISSUER       | "YOUR JWT ISSUER"           |


### 4. Run 

```
$ npm run startDev
```

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Postman Documentation

[Postman documentation link](https://documenter.getpostman.com/view/20653518/UyrEgZxu)

## Deployment

[Heroku deploy link](https://stretford-cafe.herokuapp.com/)

## Related Projects

[Stretford Cafe - Frontend](https://github.com/IlhamNurrohman/stretford-cafe-client.git)