import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

import os
from fastapi import FastAPI, HTTPException, Path, Query, Body
from pydantic import BaseModel
from supabase import create_client, Client
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)

app = FastAPI()

@app.post("/register")
def register_user(
    password: str = Body(),
    email: str = Body()
):
    print(email,password)
    response = supabase.auth.sign_up(
        {
            "email": email,
            "password": password
        }
    )
    return response

@app.post("/login")
def login_user(
    password: str = Body(),
    email: str = Body()
) :
    response = supabase.auth.sign_in_with_password(
        {"email": email, "password": password}
    )
    return response
@app.post("/logout")
def logout():
    return supabase.auth.sign_out()
@app.get("/current_user")
def get_current_user():
    return supabase.auth.get_user()

#run the server uvicorn server:app --reload