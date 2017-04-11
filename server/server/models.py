from __future__ import unicode_literals

from django.db import models

# Create your models here.

class SearchResult(models.Model):
    search = models.CharField(max_length=200)
    result = models.CharField(max_length=2000)

    def __str__(self):
    	return self.search + self.result