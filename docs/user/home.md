# User

## Sign Up

> **`POST` `/users/signup`**

### JSON Request Body

- Input fields to create a new user.

```json
{
  "username": "avatarAang",
  "password": "theGoat",
  "email": "aang@lastairbender.com"
}
```

### User Response Schema

```json
{
  "id": int,
  "username": string,
  "password": string,
  "email": string
}
```
