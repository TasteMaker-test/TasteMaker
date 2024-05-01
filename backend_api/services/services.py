import uuid

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


def validate_len_data_list(value: dict, key: str, min_value:int, max_value:int) -> bool:
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
