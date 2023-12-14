const fs = require("fs");
const categories = require("../constants/productCategory");

const categoryValues = Object.values(categories);

function getRandomCategory() {
  return categoryValues[Math.floor(Math.random() * categoryValues.length)];
}

function getRandomDate(startDate, endDate) {
  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
}

function generateRandomProduct() {
  const name = `Product ${Math.floor(Math.random() * 1000)}`;
  const description = `Description for ${name}`;
  const category = getRandomCategory();
  const price = +(Math.random() * 4000).toFixed(2);
  const stock = Math.floor(Math.random() * 100);
  const createdAt = getRandomDate(new Date(2020, 0, 1), new Date());

  return {
    name,
    description,
    category,
    price,
    createdAt,
    removed: false,
    stock,
    image:
      "https://www.mooreseal.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
  };
}

const products = [];
for (let i = 0; i < 100; i++) {
  const product = generateRandomProduct();
  products.push(product);
}

const jsonData = JSON.stringify(products, null, 2);

const filePath = "product_data.json";
fs.writeFile(filePath, jsonData, (err) => {
  if(err) {
    console.log(err);
  }
})
