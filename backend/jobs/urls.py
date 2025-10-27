from django.urls import path
from . import views

urlpatterns = [
    path("vacancies/", views.VacancyList.as_view(), name="vacancy-list"),
    path("interviews/", views.InterviewList.as_view(), name="interview-list"),
]
