from django.urls import path

from .views import UserCreate, ObtainRefreshToken

urlpatterns = [
  path('user/create/', UserCreate.as_view(), name='create_user'),
  path('token/obtain/', ObtainRefreshToken.as_view(), name='token_create'),
]

from rest_framework_simplejwt import views as jwt_views

urlpatterns += [ path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh') ]