from __future__ import unicode_literals

from django.db import models


class SearchResult(models.Model):
    job = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    result = models.CharField(max_length=2000000)

    def __str__(self):
        return self.job + self.location + self.result
