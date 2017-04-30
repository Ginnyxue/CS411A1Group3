"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from revproxy.views import ProxyView
from . import views

urlpatterns = [
    url(r'^_/job/save', views.save_job, name='save_job'),
    url(r'^_/job/get', views.get_job, name='get_job'),
    url(r'^_/job/del', views.delete_saved_job, name='delete_saved'),
    url(r'^_/jobs/saved', views.get_saved_jobs, name='get_saved_jobs'),
    url(r'^_/jobs', views.jobs, name='jobs'),
    url(r'^admin/', admin.site.urls),
    url(r'^_/login', views.get_id, name='get_id'),
    url(r'^(?P<path>.*)$', ProxyView.as_view(upstream='http://localhost:3000/')),
]
