# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django import forms
from models import User, Cook, Stool
from django.forms import ModelForm

class RegForm(ModelForm):

    class Meta:
        model = User
        fields = '__all__'

class CookForm(ModelForm):
    class Meta:
        model = Cook
        fields = '__all__'

class StoolForm(ModelForm):
    class Meta:
        model = Stool
        fields = '__all__'

def reg(request):
    if request.method == 'POST': # If the form has been submitted...
        form = RegForm(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            # Process the data in form.cleaned_data
            print form.cleaned_data['name']
            form.save()
            return HttpResponseRedirect('/thanks/') # Redirect after POST
    else:
        form = RegForm() # An unbound form
    return render(request, 'baymax/reg.html', {
        'form': form,
    })

def index(request):
    return render(request, 'baymax/index.html')

def login(request):
    return HttpResponse("hehe")

success_response = "Success"
invalid_form_post = "invalid_form_post"

def eat(request):
    if request.method == 'POST':
        form = CookForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse(success_response)
        else:
            return HttpResponse(invalid_form_post)
    else:
        form = CookForm()

    return render(request, 'baymax/eat.html', { 'form': form, })

def stool(request):
    if request.method == 'POST':
        form = StoolForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse(success_response)
        else:
            return HttpResponse(invalid_form_post)
    else:
        form = StoolForm()

    return render(request, 'baymax/stool.html', { 'form': form, })

