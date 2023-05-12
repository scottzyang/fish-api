# GET REQUESTS

## Fish
> **IMPORTANT**:
> **Must include API key and user Token within the HEADER of request. Review documentation of preferred REST client on how to do this.**

### All Fish Species

> **`GET` `/fish/freshwater`**

<!-- #### Query Parameters

- **`family`**
  - **Type: String**
  - Fish family (e.g. sunfish)
    - `/fish/freshwater?family=sunfish`
- **`environments`**
  - **Type: String**
  - Environments/Locations of fish (e.g. stream)
  - Comma-delimited string for multiple inputs
    - `/fish/freshwater?environments=stream,lake` -->

### Single Fish Specie

> **`GET` `/fish/freshwater/{id}`**

- Pass in fish `id` as a path variable.

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

## Environments

### All Environments

> **`GET` `/fish/freshwater/environments`**

- Returns a list of fish environments

#### Environment Response Schema

```json
  {
   "id": int,
   "name": string,
  }
```

## Families

### All Families

> **`GET` `/fish/freshwater/families`**

- Returns a list of fish families

#### Family Response Schema

```json
  {
   "id": int,
   "name": string,
   "scientificName": string,
  }
```
