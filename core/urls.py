from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from messaging import views

router = DefaultRouter()
router.register(r'messages', views.MessageViewSet, basename='messages')

urlpatterns = [
    path('admin/', admin.site.urls),
    # frontend
    path('', include('frontend.urls')),
    path('login/', include('frontend.urls')),
    path('signup/', include('frontend.urls')),
    path('menu/', include('frontend.urls')),
    # authentication
    path('auth/', include('authentication.urls')),
    # messaging
    path('api/', include(router.urls)),
]