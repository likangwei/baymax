__author__ = 'likangwei'
from django.contrib.auth.models import User
from rest_framework import viewsets
from models import IgnoreUrl
from models import MyWord
from models import Word
from serializers import MyWordsSerializer
from serializers import IgnoreSerializer
from serializers import WordSerializer
from serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from permissions import IsOwnerOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from wordRecall.tasks import checkout_new_word_and_add

import json


class UserViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly, )


# ViewSets define the view behavior.
class IgnoreUrlViewSet(viewsets.ModelViewSet):

    queryset = IgnoreUrl.objects.all()
    serializer_class = IgnoreSerializer
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly,)

    def get_queryset(self):
        return IgnoreUrl.objects.filter(user__id=self.request.user.id)

    def perform_create(self, serializer):
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
        print filter
        if filter.get('spelling__in', None) is not None:
            words = filter.get('spelling__in')
            checkout_new_word_and_add(words)
        queryset = queryset.filter(**filter)
        return queryset.exclude(google_meaning=None)


class MyWordViewSet(viewsets.ModelViewSet):
    queryset = MyWord.objects.all()
    serializer_class = MyWordsSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        filter = self.request.GET.get('filter', '{}')
        if filter:
            filter = json.loads(filter)
        queryset = self.queryset.filter(user=self.request.user).filter(**filter)
        return queryset

    def perform_create(self, serializer):
        word, created = Word.objects.get_or_create(spelling=serializer.validated_data.get('spelling'))
        serializer.save(user=self.request.user,
                        word=word)