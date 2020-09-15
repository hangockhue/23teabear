from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'frontend/index.html')

def beauti(request):
    return render(request, 'frontend/beautiful.html')

def box(request):
    return render(request, 'frontend/box.html')

def inbox(request):
    return render(request, 'frontend/inbox.html')