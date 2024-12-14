import pymongo
import bcrypt
from random import choice

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://shagunroperia:2owYGSLABmSO3oAb@mongodemocluster.gztl3.mongodb.net/TransactionsDb?retryWrites=true&w=majority")  # Update with your MongoDB URI if needed
db = client['TransactionsDb']  # Use your database name
transactions_collection = db['transaction']
users_collection = db['users']

# 1. Creating Users and Inserting into the 'users' Collection

# Create user documents
users = [
    {
        "userid": "12022024",
        "username": "Shagun Roperia",
        "useremail": "shagun.roperia@sjsu.edu",
        "userpassword": "password123",  # plain password
        "userpreferences": {
            "theme": "light",
            "notifications": True,
            "monthlyLimit": 1000,
            "yearlyLimit": 12000
        }
    },
    {
        "userid": "12032024",
        "username": "Varun Patil",
        "useremail": "varun.patil@sjsu.edu",
        "userpassword": "password456",  # plain password
        "userpreferences": {
            "theme": "dark",
            "notifications": False,
            "monthlyLimit": 1500,
            "yearlyLimit": 18000
        }
    }
]

# Hash the passwords before inserting
for user in users:
    user['userpassword'] = bcrypt.hashpw(user['userpassword'].encode('utf-8'), bcrypt.gensalt())

# Insert the users into the users collection
users_collection.insert_many(users)

# 2. Link Existing Transactions to Users

# Fetch all existing transactions (you may need to adjust the query to fetch all transactions)
transactions = transactions_collection.find({})

# Loop through transactions and update them with userId (randomly assigning users)
for transaction in transactions:
    # Randomly assign user1 or user2
    user_id = choice(['12022024', '12032024'])
    
    # Update transaction with the userId
    transactions_collection.update_one(
        {"_id": transaction["_id"]},  # Filter for the transaction
        {"$set": {"userId": user_id}}  # Set the userId field
    )

print("Users and transactions updated successfully.")
