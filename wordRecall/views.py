# -*- coding: utf-8 -*-
from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from models import Word, User, WordRememberInfos
from django.forms import ModelForm
from django import forms

class RecallWordForm(ModelForm):

    class Meta:
        model = WordRememberInfos
        fields = ['word', 'weight']
        fields = '__all__'

def call(request):
    if request.method:
        callMethod = request.GET['call']

        if callMethod == 'init':
            init()
        if callMethod == 'init2':
            init2()
        return HttpResponse(callMethod)

def get_recall_word(request):

    if request.method == 'POST':
        recall_id = request.POST['xid']
        recall_word = WordRememberInfos.objects.get(pk=recall_id)
        form = RecallWordForm(request.POST, instance=recall_word)
        if form.is_valid():
            recall_word.recall_counts = recall_word.recall_counts + 1
            form.save()

    recall_word = WordRememberInfos.objects.filter(remember=4).order_by('-word__repeated')[0]
    form = RecallWordForm(instance=recall_word)

    return render(request, 'recall/recall.html', {"form": form, "id":recall_word.pk} )


def init():

    Word.objects.all().delete()
    resultFile = r'/Users/lxzMac/pycharmProjects/mycode/python/wordRemember/result.txt'

    lines = open(resultFile).readlines()
    need2create = []
    for line in lines:
        line = line.strip()
        strs = line.split(' ')
        w = Word()
        w.spelling = strs[0]
        w.repeated = strs[1]
        need2create.append(w)
        # w.save()
    Word.objects.bulk_create(need2create)


def init2():
    need2create = []
    WordRememberInfos.objects.all().delete()
    user = User.objects.all()[0]

    for word in Word.objects.all():
        info = WordRememberInfos()
        info.user = user
        info.word = word
        need2create.append(info)
        # info.save()
        # print info.pk
    WordRememberInfos.objects.bulk_create(need2create)


