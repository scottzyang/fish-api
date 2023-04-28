# POST REQUESTS

## Fish

### New Fish Entry

> **`POST` `/fish/freshwater`**

#### JSON Request Body

- Input fields to create entry.

```json
  {
   "name": "Walleye",
   "scientific_name": "Sander vitreus",
   "image": "fishyfish.jpg",
   "family": {
    "id": 3,
    "name": "Perch",
    "scientific_name": "Percidae"
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
   "scientific_name": string,
   "image": string,
   "family": FamilySchema,
   "environment": EnvironmentSchema[],
   "diet": string[]
  }
```
