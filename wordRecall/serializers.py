__author__ = 'likangwei'
from rest_framework import serializers
from models import IgnoreUrl
from models import Word
from django.contrib.auth.models import User
# Serializers define the API representation.

class IgnoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = IgnoreUrl
        fields = ('url', 'id')


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word


class UserSerializer(serializers.ModelSerializer):

    # ignore_urls = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     read_only=True,
    #     view_name='word:ignoreurl-detail'
    # )
    # ignore_urls = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    ignore_urls = IgnoreSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'ignore_urls')
        # extra_kwargs = {'password': {'write_only': True}}
