const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

const apiUrl = "http://localhost:5001/api/v1";
const csvFilePath = "./transactions.csv";

const users = [
  {
    name: "Shagun Bhadu",
    email: "shagun.bhadu@sjsu.edu",
    password: "123456",
  },
  {
    name: "Varun Patil",
    email: "varun.patil@sjsu.edu",
    password: "123456",
  },
];

const importTransactions = async (usersData) => {
  const transactions = [];

  // Read the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      // Map CSV data to the expected format
      // randomly select a user from usersData
      const selectedUser =
        usersData[Math.floor(Math.random() * usersData.length)];
      console.log(selectedUser);
      transactions.push({
        date: row.date,
        mode: row.mode,
        category: row.category,
        subCategory: row.subCategory,
        note: row.note,
        amount: parseFloat(row.amount), // Ensure Amount is a number
        type: row.type,
        currency: row.currency
        // userId: "675d5327bb393373e628eae3",
      });
    })
    .on("end", async () => {
      // Send each transaction to the API
      for (const transaction of transactions) {
        try {
          const response = await axios.post(
            `${apiUrl}/transactions`,
            transaction
          );
          console.log("Transaction imported:", response?.data);
        } catch (error) {
          console.error("Error importing transaction:", error.response.data);
        }
      }
    });
};

const importUsers = async () => {
  const usersData = [];
  for (const user of users) {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, user);
      usersData.push(response?.data);
      console.log("User imported:", response?.data);
    } catch (error) {
      console.error("Error importing user:", error.response.data);
    }
  }
  return usersData;
};

const main = async () => {
  const usersData = await importUsers();
  console.log(usersData);
  await importTransactions(usersData);
};

main();