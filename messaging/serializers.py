from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Message

class MessageSerializer(serializers.ModelSerializer):
  message_id = serializers.SlugField(source='id', read_only=True, required=False)
  title = serializers.CharField(required=False)
  content = serializers.CharField()
  sender = serializers.SlugField()
  recipient = serializers.SlugField()
  timestamp = serializers.DateTimeField(read_only=True)

  def create(self, validated_data):
    title = validated_data['title']
    content = validated_data['content']
    sender = User.objects.get(id=int(validated_data['sender']))
    recipient = User.objects.get(username=validated_data['recipient'])

    response_data = {
      'title': title,
      'content': content,
      'recipient': recipient,
      'sender': sender,
    }

    return Message.objects.create(**response_data)

  class Meta:
    model = Message
    fields = [ 'message_id', 'title', 'content', 'sender', 'recipient', 'timestamp' ]
