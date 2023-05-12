# PUT REQUESTS
> **IMPORTANT**:
> **Must include API key and user Token within the HEADER of request. Review documentation of preferred REST client on how to do this.**

## Fish

### Update Fish Entry

> **`PUT` `/fish/freshwater/{id}`**

- Pass in fish `id` as a path variable.

#### JSON Request Body

- Input fields to be mutated.

```json
  {
   "name": "Smallmouth Bass",
   "scientificName": "Micropterus dolomieu"
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
