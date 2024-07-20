from django.http import HttpRequest
from ninja import NinjaAPI

from core.models import User
from core.schemas import CreateUser
from core.schemas import UserDTO

api = NinjaAPI(docs_url="/docs/")


@api.get("/users/current/", response=UserDTO)
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
