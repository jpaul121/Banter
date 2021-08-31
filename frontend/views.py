from django.conf import settings
from django.shortcuts import render

def index(request, *args, **kwargs):
  return render(request, 'index.html', context={
    'COMPILE_TIME_SETTING': settings.COMPILE_TIME_SETTING,
    'PORT': settings.PORT,
  })