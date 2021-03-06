from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import pre_save

from .helpers import generate_slug

class Message(models.Model):
  id = models.SlugField(max_length=settings.MAX_SLUG_LENGTH, primary_key=True)
  title = models.TextField(null=True)
  sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='sender')
  recipient = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='receiver')
  content = models.TextField()
  timestamp = models.DateTimeField(auto_now_add=True)

  def save(self, *args, **kwargs):
    self.id = generate_slug(self, settings.MAX_SLUG_LENGTH)
    super(Message, self).save(*args, **kwargs)
  
  @classmethod
  def send_message(cls, sender, instance, *args, **kwargs):
    if not instance.recipient:
      recipient = kwargs['update_fields'].recipient

      instance.recipient = recipient
      instance.save()
  
  def __str__(self):
    return self.id

  class Meta:
    ordering = ('timestamp',)

pre_save.connect(Message.send_message, sender=Message)