from passlib.context import CryptContext

# setup hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# function to verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

if __name__ == "__main__":
    # hashed password from your database
    hashed = "$2b$12$gOT.rorxIErZxge4UIjMyu7ydCYY45vEOC8yLdh5j5jJuY0NWELu6"
    
    # try the plain password you used at registration
    plain_password = "Osan123"  
    
    print("Check password:", verify_password(plain_password, hashed))
