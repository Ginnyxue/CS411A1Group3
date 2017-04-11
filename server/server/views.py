from django.http import JsonResponse


def test(request):
    data = request.GET.get('data', '')
    return JsonResponse({
        'data': data,
        'ping': 'pong'}
    )

