# ECOMMERCE API DOCUMENTATION

This is eCommerce Backend API documentation.It allows you to manage user registration, login, logout , products, orders, and customers .

## Endpoints for Authentication
### Method:- $\color{blue}{POST}$

#### register URL:-
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

### Method:- $\color{blue}{POST}$ 

#### Login URL:-
> https://ecommerce-api-314i.onrender.com/api/v1/user/login

##### Body raw(json)

````JSON
{
    "email":"nain@gmail.com",
    "password":"12345678"
}
````
### Method:- $\color{blue}{POST}$
#### Logout URL:-

> https://ecommerce-api-314i.onrender.com/api/v1/user/logout


````javascript Header
{ Authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDdkZjNiZmQ0MTM1Nzg4OTcyNmZjOCIsIm5hbWUiOiJqb2hhbiIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTcxMTc5NTU0OCwiaWF0IjoxNzExNzkxOTQ4fQ.A07WUEmK2lvPTknrw6VZlAVFBw5pjq0yv9yQZwASdBc"}
````

## Endpoints of Products for admin, seller and also user

### Method:- $\color{blue}{POST}$ 
#### createProduct URL:-

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
### Method:- $\color{green}{GET}$ 
#### getAllProduct URL:-

> https://ecommerce-api-314i.onrender.com/api/v1/product

### Method:- $\color{blue}{POST}$ 
#### updateProduct URL:-

> https://ecommerce-api-314i.onrender.com/api/v1/product/:productId 

##### Body raw(json)

````JSON
{
    "title": "Dell",
    "description": "this is best dell core i5 pc for coding",
    "price": 55000,
    "stock": 3,
}
````

### Method:- $\color{red}{DELETE}$ 
#### deleteProduct URL:-

> https://ecommerce-api-314i.onrender.com/api/v1/product/:productId 







   

    
