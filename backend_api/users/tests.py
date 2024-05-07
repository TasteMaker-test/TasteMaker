import io
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from users.models import User


class UserTests(APITestCase):

    def setUp(self):
        #Создание пользователя
        self.test_user = User.objects.create(email="user1@mail.ru", password="123456aA!",
                                             about_me="", nickname="Пользователь")
        self.test_user.save()
        #Создание токена для пользователя
        self.token = Token.objects.create(user=self.test_user)

        #Создание картнки для фото пользователя
        image = io.BytesIO()
        Image.new('RGB', (1024,1024)).save(image, 'JPEG')
        image.seek(0)

        self.photo_user = SimpleUploadedFile('image.jpg', image.getvalue())




    def tearDown(self) -> None:
        pass

    def test_positive_get_user(self):
        """Проверка на status_code_200 и существование пользователя по email"""

        response = self.client.get(f'/api/user-detail/{self.test_user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'user1@mail.ru')

    def test_negative_get_user(self):
        """Проверка на status_code_404 и несуществование пользователя"""

        response = self.client.get(f'/api/user-detail/50/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_positive_put_user(self):
        """Проверка на status_code_201_CREATED и существование пользователя по email"""
        self.client.force_authenticate(user=self.test_user, token=self.token)# пренудительная аутентификация пользователя
        data = {'about_me': 'Я повар', 'nickname': 'Юрец', 'photo':self.photo_user}
        response = self.client.put(f'/api/user-detail/{self.test_user.id}/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.get().about_me, 'Я повар')
        self.assertEqual(User.objects.get().nickname, 'Юрец')
    #
    def test_positive_create_user(self):
        """
        Проверка на status_201_created при создании пользователя
        """
        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': '123456aA!'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_negative_create_user(self):
        """
        Проверка на status_201_created при создании пользователя
        """
        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': '12345678'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_negative_email(self):
        """
        Проверка email на количество символов до @ при создании пользователя
        """
        url = reverse('register')
        data = {'email': 'us@mail.ru',
                'password': '12345678Aa!'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_positive_email(self):
        """
        Проверка пароля на минимальное количество(8) знаков при создании пользователя
        """
        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': '12345678aA!'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_positive_min_len_password(self):
        """
        Проверка пароля на минимальное количество(8) знаков при создании пользователя
        """

        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': '12345aA!'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_negative_min_len_password(self):
        """
        Проверка пароля на минимальное количество(8) знаков при создании пользователя
        """
        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': '123aA!'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_positive_max_len_password(self):
        """
        Проверка пароля на минимальное количество(8) знаков при создании пользователя
        """
        import string
        import random

        psw = ''
        gen = string.ascii_letters + string.digits + string.punctuation
        for char in range(64):
            psw += random.choice(gen)
        url = reverse('register')
        data = {'email': 'user2@mail.ru',
                'password': psw}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
