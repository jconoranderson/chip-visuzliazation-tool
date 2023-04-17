import configparser
import mysql.connector

config = configparser.ConfigParser()
config.read('config.ini')

# Access the values using the section and option names
db_hostname = config.get('db', 'host')
db_username = config.get('db', 'user')
db_password = config.get('db', 'password')
db_database = config.get('db', 'database')

# Print the values
print(f"Database Hostname: {db_hostname}")
print(f"Database Username: {db_username}")
print(f"Database Password: {db_password}")
print(f"Database Name: {db_database}")

# Connect to the database
cnx = mysql.connector.connect(
    host=db_hostname,
    database=db_database,
    user=db_username,
    password=db_password
)

c = cnx.cursor()

def create_user(first_name, last_name, contact_number ):
    """Create a new user."""
    c.execute("INSERT INTO users (first_name, last_name, contact_number ) VALUES ( ?, ?, ?)", ( first_name, last_name, contact_number, ))
    cnx.commit()
    print("User created successfully.")

def read_user(id):
    """Read user details by ID."""

    # Define a query with placeholders
   # query = "SELECT * FROM users WHERE id = %s"

    # Provide values for the placeholders
    #params = (tuple(id))

    #c.execute(query, params)

    c.execute("SELECT * FROM users WHERE id=?", (id))
    user = c.fetchone()
    if user:
        print(f"ID: {user[0]}, first_name: {user[1]}, last_name: {user[2]}, contact_number: {user[5]}")
    else:
        print("User not found.")


# CRUD operations
while True:
    print("1. Create User")
    print("2. Read User")
    print("6. Exit")
    choice = input("Enter your choice: ")

    if choice == '1':
        first_name = input("Enter first_name: ")
        last_name = input("Enter last_name: ")
        contact_number = input("Enter phone: ")
        create_user(first_name, last_name, contact_number)

    elif choice == '2':
        user_id = input("Enter user ID: ")
        read_user(user_id)

    elif choice == '6':
        print("Exiting...")
        break

    else:
        print("Invalid choice. Please try again.")

