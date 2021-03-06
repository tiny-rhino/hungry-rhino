"""rhinorun URL Configuration

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

from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from order.views import OrderViewSet, OrderView
from product.views import ProductListView
from rest_framework.routers import DefaultRouter

from django.conf import settings
from django.views.static import serve


router = DefaultRouter()

router.register(r'orders', OrderViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^$', ProductListView.as_view(), name='home'),
    url(r'^order-list/$', TemplateView.as_view(template_name="order-list.html")),
    url(r'^order/(?P<id>\d+)/$', OrderView.as_view(), name='order'),
    url(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    }),
]
