from django.contrib import admin
from django.utils.html import format_html
from .models import Vacancy, Interview, Application


@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "min_salary", "max_salary", "posted_date", "is_active")
    list_filter = ("is_active", "location")
    search_fields = ("title", "description")
    fields = ("title", "description", "location", "min_salary", "max_salary", "is_active")

    class Media:
        css = {"all": ("jobs/admin.css",)}


@admin.register(Interview)
class InterviewAdmin(admin.ModelAdmin):
    list_display = ("candidate_name", "vacancy", "scheduled_at", "location")
    list_filter = ("scheduled_at",)
    search_fields = ("candidate_name", "notes")


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    change_form_template = "admin/jobs/application/change_form.html"
    list_display = ("name", "email", "vacancy", "created_at", "cv_link")
    list_filter = ("created_at", "vacancy")
    search_fields = ("name", "email", "vacancy__title")
    readonly_fields = ("cv_download", "submitted_at", "created_at")
    fields = (
        ("name", "email", "phone"),
        "vacancy",
        "message",
        "cv_download",
        ("submitted_at", "created_at"),
    )

    def cv_link(self, obj):
        if obj.cv:
            return format_html('<a href="{}" download>Download CV</a>', obj.cv.url)
        return "—"

    cv_link.short_description = "CV"

    def cv_download(self, obj):
        if obj and obj.cv:
            return format_html(
                '<a class="button" href="{}" download>Download CV</a>', obj.cv.url
            )
        return "No file uploaded"

    cv_download.short_description = "Curriculum Vitae"

    class Media:
        css = {"all": ("jobs/admin.css",)}
