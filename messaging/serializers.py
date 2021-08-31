from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Message

class MessageSerializer(serializers.ModelSerializer):
  message_id = serializers.SlugField(source='id', read_only=True, required=False)
  title = serializers.CharField(required=False)
  content = serializers.CharField()
  sender = serializers.SerializerMethodField('_user')
  recipient = serializers.SlugField()
  timestamp = serializers.DateTimeField(read_only=True)

  def _user(self, obj):
    request = self.context.get('request', None)
    if request:
      return request.user

  def create(self, validated_data):
    title = validated_data['title']
    content = validated_data['content']
    recipient = validated_data['recipient']

    response_data = {
      'title': title,
      'content': content,
      'sender': sender,
      'recipient': recipient,
    }

    return Message.objects.create(**response_data)

  class Meta:
    model = Message
    fields = [ 'message_id', 'title', 'content', 'sender', 'recipient', 'timestamp' ]
