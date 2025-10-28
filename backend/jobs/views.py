from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Vacancy, Interview, Application
from .serializers import VacancySerializer, InterviewSerializer, ApplicationSerializer


class VacancyList(generics.ListAPIView):
    queryset = Vacancy.objects.filter(is_active=True).order_by("-posted_date")
    serializer_class = VacancySerializer


class InterviewList(generics.ListAPIView):
    queryset = Interview.objects.select_related("vacancy").order_by("scheduled_at")
    serializer_class = InterviewSerializer


class ApplicationCreate(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [AllowAny]
    authentication_classes: list = []
