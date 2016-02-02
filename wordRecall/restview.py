__author__ = 'likangwei'
from django.contrib.auth.models import User
from rest_framework import viewsets
from models import IgnoreUrl
from models import Word
from serializers import IgnoreSerializer
from serializers import IgnoreSerializer
from serializers import WordSerializer
from serializers import UserSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from permissions import IsOwnerOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

class UserViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly, )

# ViewSets define the view behavior.
class IgnoreUrlViewSet(viewsets.ModelViewSet):

    queryset = IgnoreUrl.objects.all()
    serializer_class = IgnoreSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

    def get_queryset(self):
        return IgnoreUrl.objects.filter(user__id=self.request.user.id)

    def perform_create(self, serializer):
        print self.request.user.id
        serializer.save(user=self.request.user)


class WordViewSet(viewsets.ModelViewSet):

    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        queryset = self.queryset
        filter = self.request.GET.get('filter', '{}')
        if filter:
            filter = json.loads(filter)
        queryset = queryset.filter(**filter)
        return queryset

