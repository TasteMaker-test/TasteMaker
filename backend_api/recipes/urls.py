from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import IngredientModelView, MeasureModelView, RecipeCreateViewSet, RecipeModelViewSet, RecipeDetailVeiwSet

# router = DefaultRouter()
# router.register(prefix='recipes', viewset=RecipeModelViewSet, basename='recipe-model')

urlpatterns = [
    path('api/new_recipes', RecipeCreateViewSet.as_view(), name='new-recipe'),
    path('api/ingredients', IngredientModelView.as_view(), name='ingredients'),
    path('api/ingredients/measures', MeasureModelView.as_view(), name='measures'),
    path('api/recipes-list', RecipeModelViewSet.as_view(), name='recipes-list'),
    path('api/recipes-detail/<int:pk>/', RecipeDetailVeiwSet.as_view(), name='recipes-detail'),
]
