import uuid
import re

from django.core.exceptions import ValidationError


def generate_filename(instance, filename):
    """Функция для генерации имени файла на основе UUID."""
    extension = filename.split('.')[-1]  # получаем расширение файла
    filename = f'images/{uuid.uuid4().hex}.{extension}'  # создаем новое имя файла
    return filename


def validate_file_size(value):
    """Валидатор размера загружаемого изображения"""
    filesize = value.size

    if filesize > 2 * 1024 * 1024:
        raise ValidationError("Максимальный размер файла 2 МБ.")


def generate_filename_upload_photo(instance, filename) -> str:
    """Функция для генерации имени файла на основе UUID."""
    extension = filename.split('.')[-1]  # получаем расширение файла
    filename = f'foto/{uuid.uuid4().hex}.{extension}'  # создаем новое имя файла
    return filename


def validate_len_data_list(value: dict, key: str, min_value: int, max_value: int) -> bool:
    """Функция принимает словарь данных. Возвращает True или False,
    если длина списка данных попадает в диапозон min_value и max_value
    Аргумент key - это ключ словаря.
     Аргумент min_value - это минимальное значение длины списка данных;
     Аргумент max_value - это максимальное значение длины данных."""
    try:
        if len(value.get(key)) > min_value or len(value.get(key)) < max_value:
            return True
    except:
        raise ValidationError(f'Количество шагов не должно быть меньше {min_value} и больше {max_value}')


class ValidPassword:
    regex = [
        '^[\s]',
        '[A-Z]+',
        '[a-z]+',
        '\d+',
        '\W',
        '\s+',
    ]

    def __init__(self, value: str):
        self.value = self.validate_password(value)

    def validate_password(self, value) -> str:

        for pattern in self.regex:
            match = re.search(rf"{pattern}", value)
            if pattern == '^[\s]' and match is not None:
                raise ValidationError('Пароль не должен начинаться с пробела')
            elif pattern == '[A-Z]+' and match is None:
                raise ValidationError('Пароль должен содеражть хотя бы 1 заглавную букву')
            elif pattern == '[a-z]+' and match is None:
                raise ValidationError('Пароль должен содержать хотя бы 1 букву в нижнем регистре')
            elif pattern == '\d+' and match is None:
                raise ValidationError('Пароль должен содержать хотя бы одну цифру')
            elif pattern == '\W' and match is None:
                raise ValidationError(f'Пароль должен содержать специальный символ')
            elif pattern == '\s+' and match is not None:
                raise ValidationError('Пароль не должен содержать пробел')
        return value


class ValidateEmail:

    def __init__(self, email):
        self.email = self.valid_email(email)

    def valid_email(self, email):
        regex = '^([a-zA-Z0-9]{1,})[._-]?([a-zA-Z0-9]+)[._-]?([a-zA-Z0-9]+)[@]([a-z]{2,5}[-]?[a-z]*)[.]([a-z]{2,5})'
        match = re.match(rf'{regex}', email)
        if match:
            return email
        raise ValidationError('Неверный почтовый адрес')
