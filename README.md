# library-case

## Deployment

### Steps

```
1. docker build -t library-case-api-image .

2. docker run --name=library-case-api-container -d -p 3000:3000 library-case-api-image
```
