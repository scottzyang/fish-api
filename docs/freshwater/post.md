# POST REQUESTS

## Fish

### New Fish Entry

> **`POST` `/fish/freshwater`**

### Fish Response Schema

```json
  {
   "id": int,
   "name": string,
   "scientific_name": string,
   "family": int, // family id
   "environment": int[], // list of environment id's
   "diet": string[]
  }
