# How to run?

```
docker compose up --build
```

then navigate to port 3000 and use my project

development tools:

languages:

```
python, typescript, javascript
```

libs:

```
flask, react, nest, prizma
```

tests:

| Test Case Name                                   | Test Case Id | Test Step | Test Data                                                                         | Expected Result   | Actual Result     | Remarks |
| ------------------------------------------------ | ------------ | --------- | --------------------------------------------------------------------------------- | ----------------- | ----------------- | ------- |
| Try to login with wrong data                     | LOG_1        | 1         | email: test@fitfuel.com<br>password: test                                         | Show Error        | Show Error        | Pass    |
| Try to login with correct data                   | LOG_2        | 2         | email: admin@fitfuel.com<br>password: admin                                       | Successful login  | Successful login  | Pass    |
| Try to modify product price with string          | MOD_1        | 3         | price: testprice                                                                  | Show Error        | Show Error        | Pass    |
| Try to modify product price with float           | MOD_2        | 4         | price: 45.99                                                                      | Successful update | Successful update | Pass    |
| Try to checkout                                  | CHECK_1      | 5         |                                                                                   | Show Error        | Show Error        | Pass    |
