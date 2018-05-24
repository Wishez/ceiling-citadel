from django.test import Client
from django.urls import reverse_lazy
from decouple import config

def make_test_request(urlName, isLogIn=False, **kwargs):
    url = reverse_lazy(urlName)
    client = Client()

    if isLogIn:
        username = config('TEST_USERNAME')
        password = config('TEST_USER_PASSWORD')

        if not username:
            print('Set test username for a test user if you want to login.')
        elif not password:
            print('Set test password for a test user if you want to login.')
        else:
            print(username, password)
            client.login(username=username, password=password)


    response = client.get(url, {
        **kwargs
    })

    print(response.status_code)

    if response.context:
        print(response.json())

    return response

