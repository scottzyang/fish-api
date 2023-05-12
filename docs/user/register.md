# Getting Started - Registration
> **IMPORTANT**:
>
> You **must** register for an API key and login for a Token prior to usage of API.
>
> **Must include API key and user Token within the HEADER of request. Review documentation of preferred REST client on how to do this.**

<img src="https://t3.ftcdn.net/jpg/03/54/46/24/360_F_354462439_WZBd0rjD3l6bOch1LRFJiyDH8akToXoA.jpg" alt="walleye">

## Authorization & Authentication


- Open up REST client of choice (Postman or Insomnia).
  - You can download them here:
    - [Postman](https://www.postman.com/downloads/)
    - [Insomnia](https://insomnia.rest/download)


### API Key Registration

- Send a `POST` request with the following JSON request body

> **`POST` `/user/register`**

```json
{
	"username": "fishlover1000",
	"password": "password",
	"email": "fishman@gmail.com"
}
```

#### Register Response Body

- Your API key will appear in the response body

```json
{
	"apiKey": "0000-abcd-000"
}
```

### Auth Token

- Send a `POST` request with your login information (same as API registration)
  > **`POST` `/user/auth`**

```json
{
 "username": "fishlover1000",
 "password": "password",
 "email": "fishman@gmail.com"
}
```

#### Auth Response Body

- Your user Token will appear in the response body

```json
{
 "apiKey": "0000-abcd-000",
 "token": "usertoken"
}
```
