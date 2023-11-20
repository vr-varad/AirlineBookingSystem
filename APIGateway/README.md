FRONTEND --- MIDDLE_END --- BACKEND

- We need an intermediate layer between the client side and microservices
- Using this middle-end, when client send request we will be able to make decision that which microservice should actually respond to this request.
- We can do, message validation, response tranformation. rate limiting.
- We try to prepare an API Gateway that acts like a middle end.