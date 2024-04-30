from rest_framework import status, generics
from rest_framework.exceptions import ValidationError

from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework import viewsets, parsers, status
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

# from .filters import IngredientFilter
from .models import Recipe, Ingredient, Measure
from .serializers import IngredientSerializer, MeasureSerializer, RecipeListSerializer, \
    RecipeSerializer, RecipeDetailSerializer, IngredientMeasureRelatedSerializer, IngredientMeasureSerializer


@extend_schema_view(
    get=extend_schema(summary='Получение ингредиента по "id"', tags=['Игредиенты']), )
class IngredientModelView(generics.ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    filter_backends = [DjangoFilterBackend]
    # filterset_class = IngredientFilter


@extend_schema_view(
    get=extend_schema(summary='Получение всех единиц измерения', tags=['Единицы измерения']), )
class MeasureModelView(generics.ListAPIView):
    queryset = Measure.objects.all()
    serializer_class = MeasureSerializer


@extend_schema_view(
    create=extend_schema(summary='Создание рецепта', tags=['Рецепты']),
    list=extend_schema(summary='Получение всех рецептов', tags=['Рецепты']),
    retrieve=extend_schema(summary='Получение одного рецептов', tags=['Рецепты']),
    update=extend_schema(summary='Полное редактирование рецепта', tags=['Рецепты']),
    partial_update=extend_schema(summary='Частичное редактирование рецепта', tags=['Рецепты']),
    destroy=extend_schema(summary='Удаление рецепта', tags=['Рецепты']),
)
class RecipeCreateViewSet(generics.CreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """Метод возвращает статус POST запроса"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(status=status.HTTP_201_CREATED)



class RecipeModelViewSet(generics.ListAPIView):
    """Возвращает список рецептов"""
    queryset = Recipe.objects.all()
    serializer_class = RecipeListSerializer



class RecipeDetailVeiwSet(generics.RetrieveUpdateDestroyAPIView):
    """Возвращает/удалять/изменять все данные  рецепта"""
    queryset = Recipe.objects.all()
    serializer_class =  RecipeDetailSerializer


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)

        instance = self.get_object()

        serializer = self.get_serializer(instance, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    # def get_permissions(self):
    #     """Установка разных уровней доступа для методов"""
    #     if self.request.method == 'GET':
    #         permission_classes = [AllowAny]  # Метод GET доступен всем
    #     else:
    #         permission_classes = [IsAuthenticated]  # Остальные методы требуют авторизации
    #     return [permission() for permission in permission_classes]

