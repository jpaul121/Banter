from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save

class Message(models.Model):
  id = models.SlugField(max_length=settings.MAX_SLUG_LENGTH, primary_key=True)
  title = TextField(null=True)
  sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='sender')
  recipient = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='receiver')
  content = models.TextField()
  timestamp = models.DateTimeField(auto_now_add=True)

  @classmethod
  def send_message(cls, sender, instance, created, *args, **kwargs):
    if not created:
      return
    
    instance = kwargs['instance']
    recipient = kwargs['update_fields'].recipient

    instance.recipient = recipient
    instance.save()
  
  def __str__(self):
    return self.id

  class Meta:
    ordering = ('timestamp',)

post_save.connect(Message.post_create, sender=Message)