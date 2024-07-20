from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.db import IntegrityError
from django.http import HttpRequest
from django.utils import timezone
from ninja import NinjaAPI
from ninja.security import django_auth

from core.models import Activity
from core.models import Project
from core.models import TimeLog
from core.models import User
from core.schemas import CreateUser
from core.schemas import GenericDTO
from core.schemas import Login
from core.schemas import StartTimeLog
from core.schemas import TimeLogDTO
from core.schemas import UserDTO

api = NinjaAPI(docs_url="/docs/", csrf=True)


@api.get("/users/current/", response=UserDTO, auth=django_auth)
def current_user(request: HttpRequest):
    return request.user


@api.post("/users/", response={200: UserDTO, 400: GenericDTO})
def create_user(request: HttpRequest, user: CreateUser):
    try:
        user_obj = User.objects.create_user(
            username=user.username,
            password=user.password,
            is_superuser=False,
        )
        user_obj.save()
        return user_obj
    except IntegrityError:
        return 400, {"detail": "Username already exists."}


@api.post(
    "/time-logs/start/",
    auth=django_auth,
    response={200: TimeLogDTO, 400: GenericDTO},
)
def start_time_log(request: HttpRequest, data: StartTimeLog):
    try:
        if TimeLog.objects.filter(end=None).exists():
            return 400, {"detail": "An active session already exists."}
        obj = TimeLog.objects.create(
            user=request.user,
            begin=timezone.now(),
            end=None,
            project=Project.objects.get(id=data.project__id),
            activity=Activity.objects.get(id=data.activity__id),
        )
        obj.save()
        return obj
    except Project.DoesNotExist:
        return 400, {"detail": "Project does not exist."}
    except Activity.DoesNotExist:
        return 400, {"detail": "Activity does not exist."}


@api.post("/time-logs/end/", auth=django_auth, response=GenericDTO)
def end_time_log(request: HttpRequest):
    TimeLog.objects.filter(end=None).update(end=timezone.now())
    return {"detail": "Success."}


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
