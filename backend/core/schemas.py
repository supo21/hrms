from ninja import ModelSchema
from ninja import Schema

from core.models import User


class UserDTO(ModelSchema):
    class Meta:
        model = User
        exclude = ["password"]


class CreateUser(Schema):
    username: str
    password: str
