from rest_framework import renderers

from .views import MessageViewSet

message_list = MessageViewSet.as_view({
  'get': 'list',
  'post': 'create',
})

message_detail = MessageViewSet.as_view({
  'get': 'retrieve',
  'delete': 'destroy',
  'post': 'create',
})