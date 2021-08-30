from django.contrib.auth.models import User
from django.db import models

class Message(models.Model):
  sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='sender')
  receiver = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='receiver')
  content = models.TextField()
  timestamp = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ('timestamp',)