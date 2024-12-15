const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

const apiUrl = "http://localhost:5001/api/v1";
const csvFilePath = "./transactions.csv";

const users = [
  {
    name: "Varun Patil",
    email: "varun.patil@sjsu.edu",
    password: "123456",
  },
  {
    name: "Shagun Roperia",
    email: "shagun.roperia@sjsu.edu",
    password: "123456",
  },
];

const getToken = async (email, password) => {
  const response = await axios.post(`${apiUrl}/auth/login`, {
    email,
    password,
  });
  return response.data.token;
};

const importTransactions = async (user) => {
  const token = await getToken(user.email, user.password);
  const transactions = [];

  // Read the CSV file
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      transactions.push({
        date: row.date,
        mode: row.mode,
        category: row.category,
        subCategory: row.subCategory,
        note: row.note,
        amount: parseFloat(row.amount), // Ensure Amount is a number
        type: row.type,
        currency: row.currency,
      });
    })
    .on("end", async () => {
      // Send each transaction to the API
      for (const transaction of transactions) {
        try {
          const response = await axios.post(
            `${apiUrl}/transactions`,
            transaction,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
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
      console.error("Error importing user:", error.response?.data);
    }
  }
  return usersData;
};

const main = async () => {
  await importUsers();
  await importTransactions(users[0]);
};

main();