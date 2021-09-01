from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.backends import TokenBackend

from .helpers import generate_slug
from .models import Message
from .serializers import MessageSerializer

class MessageViewSet(viewsets.ModelViewSet):
  serializer_class = MessageSerializer
  
  def create(self, request, *args, **kwargs):
    token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    
    try:
      _validated_data = TokenBackend(algorithm='HS256').decode(token, verify=False)
      data = dict(request.data, sender=_validated_data['user_id'])
    except ValidationError as e:
      print('ValidationError: ', e)

    serializer = MessageSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)
    headers = self.get_success_headers(serializer.data)

    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
  
  def get_queryset(self):
    queryset = Message.objects.all()

    if self.request.get_full_path() == '/api/messages/inbox':
      queryset = queryset.filter(receiver=self.request.user.get_username())
    if self.request.get_full_path() == '/api/messages/outbox':
      queryset = queryset.filter(sender=self.request.user.get_username())
    
    return queryset
  
  @action(detail=False, methods=['GET',], name='View Messages')
  def view_messages(self, request, *args, **kwargs):
    queryset = self.filter_queryset(self.get_queryset())

    page = self.paginate_queryset(queryset)
    if page is not None:
      serializer = self.get_serializer(page, many=True)
      return self.get_paginated_response(serializer.data)

    serializer = self.get_serializer(queryset, many=True)
    return Response(serializer.data)
