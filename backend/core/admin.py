from core.models import User
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        *BaseUserAdmin.fieldsets,
        (
            "Expected working hours",
            {
                "fields": (
                    "expected_hours_sun",
                    "expected_hours_mon",
                    "expected_hours_tue",
                    "expected_hours_wed",
                    "expected_hours_thu",
                    "expected_hours_fri",
                    "expected_hours_sat",
                )
            },
        ),
    )
