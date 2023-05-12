# POST REQUESTS
> **IMPORTANT**:
> **Must include API key and user Token within the HEADER of request. Review documentation of preferred REST client on how to do this.**
>
## Fish

### New Fish Entry

> **`POST` `/fish/freshwater`**

#### JSON Request Body

- Input fields to create entry.

```json
  {
   "name": "Walleye",
   "scientificName": "Sander vitreus",
   "image": "fishyfish.jpg",
   "family": {
    "id": 3,
    "name": "Perch",
    "scientificName": "Percidae"
   },
   "environment": [
    {
      "id": 2,
      "name": "lakes",
    }
   ],
   "diet": ["insects", "fish", "shellfish"]
  }
```

### Fish Response Schema

```json
  {
   "id": int,
   "name": string,
   "scientificName": string,
   "image": string,
   "family": FamilySchema,
   "environment": EnvironmentSchema[],
   "diet": string[]
  }
```
