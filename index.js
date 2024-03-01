const AWS = require("aws-sdk");
AWS.config.update({
  region: "sa-east-1",
});

const dynamodb = new AWS.Dynamodb.DocumentClient();
const dynamodbTableName = "product-inventory";
const healthPath = "/health";
const productPath = "/product";
const productsPath = "/products";

exports.handler = async function (event) {
  console.log("req event", event);
  let response;

  switch (true) {
    case event.httpMethod === "GET" && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === "GET" && event.PATH === productPath:
      response = await getProduct(event.queryStringParameters.productId);
      break;
    case event.httpMethod === "GET" && event.PATH === productsPath:
      response = await getProducts();
      break;
    case event.httpMethod === "POST" && event.path === productPath:
      response = await saveProduct(JSON.parse(event.body));
    case event.httpMethod === "PATCH" && event.path === productPath:
      const requestBody = JSON.parse(event.body);
      response = await modifyProduct(
        requestBody.productId,
        requestBody.updateKey,
        requestBody.updateValue
      );
      break;

    case event.httpMethod === "DELETE" && event.path === productPath:
      response = await deleteProduct(JSON.parse(event.body).productId);
  }
};

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

async function getProduct(){}

async function getProducts(){}

async function saveProduct(){}

async function modifyProduct (){}
