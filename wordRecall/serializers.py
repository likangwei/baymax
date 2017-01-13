__author__ = 'likangwei'
from rest_framework import serializers
from django.contrib.auth.models import User

from models import IgnoreUrl
from models import MyWord
from models import Word
from models import UserSetting


class IgnoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = IgnoreUrl
        fields = ('url', 'type', 'id')


class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSetting
        fields = ('auto_change_page',)


class MyWordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyWord
        fields = ('id', 'spelling',)


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('id', 'spelling', 'google_meaning')


class UserSerializer(serializers.ModelSerializer):

    ignore_urls = IgnoreSerializer(many=True, read_only=True)
    settings = SettingSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'ignore_urls', "is_valid", 'settings', "errors")
