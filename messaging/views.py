from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .helpers import generate_slug
from .serializers import MessageSerializer

class MessageViewSet(viewsets.ModelViewSet):
  serializer_class = MessageSerializer
  
  def save(self, *args, **kwargs):
    self.id = generate_slug(self, settings.MAX_SLUG_LENGTH)
    super(Message, self).save(*args, **kwargs)
  
  @action(detail=False, methods=['GET',], name='View Messages')
  def view_messages(self, request, *args, **kwargs):
    if request.get_full_path() == '/api/inbox':
      queryset = self.filter_queryset(
        Message.objects.all(
          sender=request.user.get_username()
        )
      )
    else if request.get_full_path() == '/api/outbox':
      queryset = self.filter_queryset(
        Message.objects.all(
          receiver=request.user.get_username()
        )
      )

    page = self.paginate_queryset(queryset)
    if page is not None:
      serializer = self.get_serializer(page, many=True)
      return self.get_paginated_response(serializer.data)

    serializer = self.get_serializer(queryset, many=True)
    return Response(serializer.data)
