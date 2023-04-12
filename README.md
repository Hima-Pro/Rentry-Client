# Rentry-Client

A javascript library for creating and managing entries in rentry.co

## Installation

```
npm install rentry-client
```

## Usage

Import the library

```javascript
const RentryClient = require("rentry-client");
```

### Create a new paste

- return the response in a callback function:
  ```javascript
  RentryClient.new({
    id: "<ID>", // optional, skip for random id
    data: "Hello World",
  }, callback);

  function callback(res) {
    console.log(res);
  }
  ```
- return the response as an object :
  ```javascript
  async function test() {
    var res = await RentryClient.new({
      id: "<ID>", // optional, skip for random id
      data: "Hello World",
    });
    console.log(res);
  }
  ```
- Output
  ```json
  {
    "status": "200",
    "content": "OK",
    "url": "https://rentry.co/abc123",
    "edit_code": "abxx12xx", // <TOKEN> for editing the paste
    "id": "abc123" // <ID>
  }
  ```

### Edit an exist paste

- return the response in a callback function :
  ```javascript
  RentryClient.edit({
    id: "<ID>",
    token: "<TOKEN>",
    data: "## Hi\nHello World",
  }, callback);

  function callback(res) {
    console.log(res);
  }
  ```
- return the response as an object :
  ```javascript
  async function test() {
    var res = await RentryClient.edit({
      id: "<ID>",
      token: "<TOKEN>",
      data: "## Hi\nHello World",
    });
    console.log(res);
  }
  ```
- Output
  ```json
  {
    "status": "200",
    "content": "OK"
  }
  ```

### Raw a paste

- return the response in a callback function :
  ```javascript
  RentryClient.raw("<ID>", callback);

  function callback(res) {
    console.log(res);
  }
  ```
- return the response as an object :
  ```javascript
  async function test() {
    var res = await RentryClient.raw("<ID>");
    console.log(res);
  }
  ```
- Output

  ```json
  {
    "status": "200",
    "content": "## Hi\nHello World"
  }
  ```
  
## License
[MIT License](./LICENSE)