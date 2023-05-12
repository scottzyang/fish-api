# Freshwater Fish

<img src="https://s3.amazonaws.com/images.gearjunkie.com/uploads/2016/08/freshwater-fish-of-North-America.jpg" alt="freshwater fish"/>

## Features
- Retrieve details about certain types of freshwater fish.
- Perform CRUD operations on freshwater fish.
- Explore different types of environments where freshwater fish exist.
- Explore various different scientific fish families.

## Fish Response Body
```json
  {
   "id": 34,
   "name": "Rainbow Trout",
   "scientificName": "Oncorhynchus mykiss",
   "image": "fishyfish.jpg",
   "family": FamilySchema,
   "environment": EnvironmentSchema[],
   "diet": ["insects", "fish"]
  }
```
