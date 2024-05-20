from django.core.validators import RegexValidator, FileExtensionValidator
from rest_framework import serializers
from services.services import validate_file_size, generate_filename_upload_photo, ValidPassword, ValidateEmail

from .models import User



class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[
        ValidateEmail], write_only=True)  # Минимальное кол-во символов 3(до "@")
    password = serializers.CharField(min_length=8, validators=[ValidPassword], write_only=True)
    about_me = serializers.CharField(read_only=True)
    photo = serializers.ImageField(validators=[FileExtensionValidator(['png', 'jpg', 'jpeg']),
                                               validate_file_size], read_only=True)
    # Поле для пути к фото для аватар "Пользователя"
    # Согласовать папку для загрузки изображений для фото пользователей
    nickname = serializers.CharField(min_length=1, read_only=True)

    class Meta:
        model = User
        exclude = ['is_active', 'is_admin', 'is_superuser', 'groups', 'user_permissions', ]




    def create(self, validated_data):
        """Создаем хешируемый пароль пользователя"""
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    """Позволяет частично редактировать данные в личном кабинете пользователя"""

    class Meta:
        model = User
        fields = ('about_me',
                  'nickname',
                  'photo')

    # def update(self, instance, validated_data):
    #     instance.email = validated_data.get('about_me', instance.about_me)
    #     instance.content = validated_data.get('nickname', instance.nickname)
    #     instance.created = validated_data.get('photo', instance.photo)
    #     return instance


class UserSerializer(serializers.ModelSerializer):
    """Получаем данные о пользователе"""

    class Meta:
        model = User
        exclude = ['is_active', 'is_admin', 'is_superuser', 'groups', 'user_permissions', 'password']
