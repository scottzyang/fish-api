# GET REQUESTS

## All Fish Species

> **`GET` `/fish/freshwater`**

### Query Parameters

- **`family`**
  - **Type: String**
  - Fish family (e.g. sunfish)
    - `/fish/freshwater?family=sunfish`
- **`environments`**
  - **Type: String**
  - Environments/Locations of fish (e.g. stream)
  - Comma-delimited string for multiple inputs
    - `/fish/freshwater?environments=stream,lake`

## Single Fish Specie

> **`GET` `/fish/freshwater/{id}`**

- Pass in fish `id` as a path variable


## Response Schema

```json
  {
   "id": int,
   "name": string,
   "scientific_name": string,
   "family": int, // family id
   "environment": int[], // list of environment id's
   "diet": string[]
  }
```
