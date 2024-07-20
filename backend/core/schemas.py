from ninja import ModelSchema
from ninja import Schema

from core.models import User


class UserDTO(ModelSchema):
    class Meta:
        model = User
        exclude = ["password"]


class GenericDTO(Schema):
    detail: str


class CreateUser(Schema):
    username: str
    password: str


class Login(Schema):
    username: str
    password: str
