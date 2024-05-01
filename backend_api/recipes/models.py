
from datetime import timedelta

from django.db import models
from django.core.validators import (RegexValidator, MinLengthValidator, MaxLengthValidator, FileExtensionValidator,
                                    MinValueValidator, MaxValueValidator)


from services.services import generate_filename, validate_file_size
from users.models import User


class Recipe(models.Model):
    name = models.CharField(max_length=150)
    owner = models.ForeignKey(User,
                              on_delete=models.CASCADE,
                              related_name='user_recipe')  # при удалении данного юзера, удалятся все, связанные с ним рецепты.
    description = models.TextField(max_length=1500)
    main_image = models.ImageField(upload_to=generate_filename,
                                   validators=[
                                       FileExtensionValidator(['png', 'jpg', 'jpeg']),
                                       validate_file_size])
    cooking_instructions = models.TextField(max_length=1500)
    cooking_time = models.DurationField(default=timedelta(minutes=0))
    published_at = models.DateTimeField(auto_now_add=True)


class Step(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='steps')
    step_number = models.PositiveIntegerField(validators=[MinValueValidator(limit_value=1),
                                                          MaxValueValidator(limit_value=20)])
    step_image = models.ImageField(upload_to=generate_filename,
                                   validators=[
                                       FileExtensionValidator(['png', 'jpg', 'jpeg']),
                                       validate_file_size])
    step_discription = models.TextField(max_length=150)

    class Meta:
        unique_together = ['recipe', 'step_number']
        ordering = ['step_number']


class Ingredient(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class Measure(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self):
        return self.name


class IngredientMeasure(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="ingredients")

    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name='ingredient_measure')
    measure = models.ForeignKey(Measure, on_delete=models.CASCADE, related_name='ingredient_measure')
    quantity = models.CharField(max_length=5, validators=[RegexValidator(r'(?=^\d{,5}[,./]?\d?$).{,5}'),
                                                          MinLengthValidator(limit_value=1),
                                                          MaxLengthValidator(limit_value=5)])

    class Meta:
        unique_together = ['recipe', 'ingredient']

# class Step(models.Model):
#     order = models.IntegerField()
#     text = models.CharField(max_length=150)
#     image = models.ImageField(null=True, upload_to=generate_filename)
#     recipe = models.ForeignKey(Recipe, related_name='steps', on_delete=models.CASCADE)
#     class Meta:
#         unique_together = ['recipe', 'order']
#         ordering = ['order']
#
# class Ingredient(models.Model):
#     name = models.CharField(max_length=150)
#
# class Measure(models.Model):
#     name = models.CharField(max_length=150)
#
# class RecipeIngredient(models.Model):
#     ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name='ingredients')
#     amount = models.CharField(max_length=150)
#     recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipe')
#     measure = models.ForeignKey(Measure, on_delete=models.CASCADE, related_name='measure')
#     class Meta:
#         unique_together = ['recipe', 'ingredient']
