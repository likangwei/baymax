from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django import forms

class RegForm(forms.Form):
    name = forms.CharField(max_length=100)


def reg(request):
    if request.method == 'POST': # If the form has been submitted...
        form = RegForm(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            # Process the data in form.cleaned_data
            # ...
            print form.cleaned_data['name']
            return HttpResponseRedirect('/thanks/') # Redirect after POST
    else:
        form = RegForm() # An unbound form
    return render(request, 'baymax/reg.html', {
        'form': form,
    })

def login(request):
    return HttpResponse("hehe")