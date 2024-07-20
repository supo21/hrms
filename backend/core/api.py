from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.http import HttpRequest
from ninja import NinjaAPI
from ninja.security import django_auth

from core.models import User
from core.schemas import CreateUser
from core.schemas import GenericDTO
from core.schemas import Login
from core.schemas import UserDTO

api = NinjaAPI(docs_url="/docs/")


@api.get("/users/current/", response=UserDTO, auth=django_auth)
def current_user(request: HttpRequest):
    return request.user


@api.post("/users/", response=UserDTO)
def create_user(request: HttpRequest, user: CreateUser):
    user_obj = User.objects.create_user(
        username=user.username,
        password=user.password,
        is_superuser=False,
    )
    user_obj.save()
    return user_obj


@api.post("/login/", response=GenericDTO)
def login(request: HttpRequest, data: Login):
    user = authenticate(
        request,
        username=data.username,
        password=data.password,
    )
    if user is not None:
        auth_login(request, user)
        return {"detail": "Success."}
    else:
        return {"detail": "Invalid credentials."}


@api.post("/logout/", response=GenericDTO)
def logout(request: HttpRequest):
    auth_logout(request)
    return {"detail": "Success."}
