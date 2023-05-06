# PUT REQUESTS

## Fish

### Update Fish Entry

> **`PUT` `/fish/freshwater/{id}`**

- Pass in fish `id` as a path variable.

#### JSON Request Body

- Input fields to be mutated.

```json
  {
   "name": "Smallmouth Bass",
   "scientific_name": "Micropterus dolomieu"
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
