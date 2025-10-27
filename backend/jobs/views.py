from rest_framework import generics
from .models import Vacancy, Interview
from .serializers import VacancySerializer, InterviewSerializer


class VacancyList(generics.ListAPIView):
    queryset = Vacancy.objects.filter(is_active=True).order_by("-posted_date")
    serializer_class = VacancySerializer


class InterviewList(generics.ListAPIView):
    queryset = Interview.objects.select_related("vacancy").order_by("scheduled_at")
    serializer_class = InterviewSerializer
