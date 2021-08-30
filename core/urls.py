from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    # frontend
    path('', include('frontend.urls')),
]
