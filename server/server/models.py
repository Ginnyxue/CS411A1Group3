from __future__ import unicode_literals

from django.db import models


class SearchResult(models.Model):
    job = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    result = models.CharField(max_length=2000000)

    def __str__(self):
        return self.job + self.location + self.result


class User(models.Model):
    g_id = models.BigIntegerField()


class SavedJob(models.Model):
    user_id = models.ForeignKey(User)
    job_id = models.CharField(max_length=200)


class Job(models.Model):
    job_id = models.CharField(max_length=200)
    data = models.CharField(max_length=2000)
