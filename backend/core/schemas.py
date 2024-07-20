from ninja import ModelSchema
from ninja import Schema

from core.models import TimeLog
from core.models import User


class UserDTO(ModelSchema):
    class Meta:
        model = User
        exclude = ["password"]


class TimeLogDTO(ModelSchema):
    class Meta:
        model = TimeLog
        fields = "__all__"


class GenericDTO(Schema):
    detail: str


class StartTimeLog(Schema):
    project__id: int
    activity__id: int


class CreateUser(Schema):
    username: str
    password: str


class Login(Schema):
    username: str
    password: str
