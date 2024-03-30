# ECOMMERCE API DOCUMENTATION

This is eCommerce Backend API documentation.It allows you to manage user registration, login, logout , products, orders, and customers .

## Endpoints for Authentication

- $\color{blue}{POST}$ register:-

> https://ecommerce-api-314i.onrender.com/api/v1/user/register

##### Body raw(json)

````JSON
{
    "firstname":"Naincy",
    "lastname":"verma",
    "email":"nain@gmail.com",
    "password":"12345678",
    "role":"admin"
}
````

- $\color{blue}{POST}$ Login:-

> https://ecommerce-api-314i.onrender.com/api/v1/user/login

##### Body raw(json)

````JSON
{
    "email":"nain@gmail.com",
    "password":"12345678"
}
````
- $\color{blue}{POST}$ Logout:-

> https://ecommerce-api-314i.onrender.com/api/v1/user/logout


````javascript Header
{ Authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDdkZjNiZmQ0MTM1Nzg4OTcyNmZjOCIsIm5hbWUiOiJqb2hhbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTcxMTc5NTU0OCwiaWF0IjoxNzExNzkxOTQ4fQ.A07WUEmK2lvPTknrw6VZlAVFBw5pjq0yv9yQZwASdBc"}
````

## Endpoints of Products for admin, seller and also user

- $\color{blue}{POST}$ createProduct:-

> https://ecommerce-api-314i.onrender.com/api/v1/product

##### Body raw(json)

````JSON
{
    "title": "Dell",
    "description": "this is best dell core i5 pc for coding",
    "price": 45000,
    "stock": 4,
    "brand": "dell",
    "category": "laptop"
}
````
- $\color{green}{GET}$ getAllProduct:-

> https://ecommerce-api-314i.onrender.com/api/v1/product

- $\color{blue}{POST}$ createProduct:-

> https://ecommerce-api-314i.onrender.com/api/v1/product

##### Body raw(json)

````JSON
{
    "title": "Dell",
    "description": "this is best dell core i5 pc for coding",
    "price": 45000,
    "stock": 4,
    "brand": "dell",
    "category": "laptop"
}
````








   

    
