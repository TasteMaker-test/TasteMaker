
### Рецепты
+ [Создать рецепт](#create_recipe)
+ [Отредактировать рецепт](#edit_recipe)
+ [Частично отредактировать рецепт](#partial_edit_recipe)
+ [Получить информацию об одном рецепте](#view_recipe)
+ [Просмотр информацию о всех рецептах](#view_all_recipes)
+ [Удалить рецепт](#delete_recipe)

### Ингредиенты
+ [Получить список всех ингредиентов](#get_all_ingredients)
+ [Получить список отфильтрованных ингредиентов](#get_filtered_ingredients)

### Меры веса и объема
+ [Получить список всех единиц измерения](#get_all_measures)

---

<a name="create_recipe"></a>
### Создание рецепта
> требуется наличие [access-токена](./tokens.md#use-access_token) в заголовке авторизации  

**Запрос**

Формат запроса: multipart/form-data

**`POST http://127.0.0.1:8000/api/new_recipes`**

>Все прикрепленные файлы должны быть в формате `jpg`, `jpeg` или `png`. Максимальный размер - 2 мб.  

Формат json строки:

```json
{
  "name": "Название",
  "owner": "user1@mail.ru",
  "description": "Описание",
  "cooking_instructions": "Инструкция по приготовлению",
  "cooking_time": "PT1H30M",
  "main_image": "avatar.jpg",
  "steps": [
    {
      "step_number": 1,
      "step_discription": "почистить",
      "step_image": "photo12.jpg"
    },
    {
      "step_number": 2,
      "step_discription": "кипятить"
    },
    {
      "step_number": 3,
      "step_discription": "есть"
    }
  ],
  "ingredients": [
    {
      "ingredient": "Лягушачьи лапки",
      "quantity": "300",
      "measure": "мл."
    },
    {
      "ingredient": "Телятина",
      "quantity": "500",
      "measure": "гр."
    }
  ]
}
``` 

>**steps**  
> В списке должен быть указан как минимум один шаг, но не более 20.  
> В ключе `step_image` указывается имя файла.  
 

>**ingredients**  
> В списке должен быть указан как минимум один ингредиент, но не более 20.  
> В поле `name` и `measure` т.е. имя ингредиента и единица измерения, нужно указывать, только существующие в базе данных.  
>Получить [список ингредиентов](#get_all_ingredients) и [список единиц измерения](#get_all_measures).

>**cooking_time**  
>Используются стандартные обозначения интервалов времени по ISO 8601.  
>"PT" означает "Period of Time" и указывает, что следующие символы представляют собой период времени.  
>Число перед "H" представляет собой количество часов, в данном случае - 1 час.  
>Число перед "M" представляет собой количество минут, в данном случае - 30 минут.  
>Таким образом, "PT1H30M" означает, что время приготовления блюда составляет 1 час и 30 минут.  

**Ответ**

```json
{
  "id": 14,
  "name": "Название",
  "description": "Описание",
  "cooking_instructions": "Инструкция по приготовлению",
  "cooking_time": "01:30:00",
  "main_image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png",
  "steps": [
    {
      "step_number": 1,
      "step_discription": "почистить",
      "step_image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png"
    },
    {
      "step_number": 2,
      "step_discription": "кипятить"
    },
    {
      "step_number": 3,
      "step_discription": "есть"
    }
  ],
  "ingredients": [
    {
      "ingredient": "Лягушачьи лапки",
      "quantity": "300",
      "measure": "мл."
    },
    {
      "ingredient": "Телятина",
      "quantity": "500",
      "measure": "гр."
    }
  ]
}
```
**Ошибки**

* `400 Bad Request` – ошибка в параметрах запроса.
* `401 Unauthorized` - недействительный токен.

---

<a name="edit_recipe"></a>
### Редактирование рецепта 
> требуется наличие [access-токена](./tokens.md#use-access_token) в заголовке авторизации  

Запрос к серверу и ответ идентичен [созданию рецепта.](#create_recipe)  
Разница в том, что нужно указать `id` рецепта в адресе:

`PUT http://127.0.0.1:8000/api/recipe-detail/{ID Рецепта}/`
Например:  
`PUT http://127.0.0.1:8000/api/recipe-detail/1/`

В запросе необходимо указать ВСЕ поля, так же как при создании рецепта.

**Ошибки**

* `400 Bad Request` – ошибка в параметрах запроса.
* `401 Unauthorized` - недействительный токен.
* `404 Not found` - рецепт с таким `id` на найден.

---

<a name="partial_edit_recipe"></a>
### Частичное редактирование рецепта
> требуется наличие [access-токена](./tokens.md#use-access_token) в заголовке авторизации  

Запрос к серверу и ответ идентичен [созданию рецепта.](#create_recipe)  
Разница в том, что нужно указать `id` рецепта в адресе:

`PATCH http://127.0.0.1:8000/api/recipe-detail/{ID Рецепта}/`  
Например:  
`PATCH http://127.0.0.1:8000/api/recipe-detail/1/`

В запросе можно указать только те поля, которые необходимо изменить.
Например, `json` строка может выглядеть так:

```json
{
    "description": "Измененное описание",
    "steps": [
        {
            "step_number": 2,
            "step_discription": "Измененный текст для шага 2"
        }]
}
```

**Ошибки**

* `400 Bad Request` – ошибка в параметрах запроса.
* `401 Unauthorized` - недействительный токен.
* `404 Not found` - рецепт с таким `id` на найден.

---

<a name="view_recipe"></a>
### Просмотр одного рецепта 

**Запрос**  
`GET http://127.0.0.1:8000/api/recipe-detail/{ID Рецепта}/`  
Например:  
`GET http://127.0.0.1:8000/api/recipe-detail/1/`

**Ответ**

```json
{
  "id": 14,
  "name": "Название",
  "description": "Описание",
  "cooking_instructions": "Инструкция по приготовлению",
  "cooking_time": "01:30:00",
  "main_image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png",
  "steps": [
    {
      "step_number": 1,
      "step_discription": "почистить",
      "step_image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png"
    },
    {
      "step_number": 2,
      "step_discription": "кипятить"
    },
    {
      "step_number": 3,
      "step_discription": "есть"
    }
  ],
  "ingredients": [
    {
      "ingredient": "Лягушачьи лапки",
      "quantity": "300",
      "measure": "мл."
    },
    {
      "ingredient": "Телятина",
      "quantity": "500",
      "measure": "гр."
    }
  ]
}
```

**Ошибки**
* `404 Not found` - рецепт с таким `id` на найден.

---

<a name="view_all_recipes"></a>
### Просмотр всех рецептов

**Запрос**   
`GET http://127.0.0.1:8000/api/recipes-list/`

**Ответ**

```json
[{
  "id": 14,
  "name": "Название",
  "description": "Описание",
  "cooking_instructions": "Инструкция по приготовлению",
  "cooking_time": "01:30:00",
  "main_image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png",
  "steps": [
    {
      "step_number": 1,
      "step_discription": "почистить",
      "step_image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png"
    },
    {
      "step_number": 2,
      "step_discription": "кипятить"
    },
    {
      "step_number": 3,
      "step_discription": "есть"
    }
  ],
  "ingredients": [
    {
      "ingredient": "Лягушачьи лапки",
      "quantity": "300",
      "measure": "мл."
    },
    {
      "ingredient": "Телятина",
      "quantity": "500",
      "measure": "гр."
    }
  ]
},{
  "id": 15,
  "name": "Название",
  "description": "Описание",
  "cooking_instructions": "Инструкция по приготовлению",
  "cooking_time": "01:30:00",
  "main_image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png",
  "steps": [
    {
      "step_number": 1,
      "step_discription": "почистить",
      "step_image": "http://127.0.0.1:8000/media/images/b576fc4f102d4e31b75d91a6633f3f87.png"
    },
    {
      "step_number": 2,
      "step_discription": "кипятить"
    },
    {
      "step_number": 3,
      "step_discription": "есть"
    }
  ],
  "ingredients": [
    {
      "ingredient": "Лягушачьи лапки",
      "quantity": "300",
      "measure": "мл."
    },
    {
      "ingredient": "Телятина",
      "quantity": "500",
      "measure": "гр."
    }
  ]
}]
```

**Ошибки**
* ...

---

<a name="delete_recipe"></a>
### Удаление рецепта

**Запрос**
> требуется наличие [access-токена](./tokens.md#use-access_token) в заголовке авторизации.

`DELETE http://127.0.0.1:8000/api/recipe-detail/{ID Рецепта}/`  
Например:  
`DELETE http://127.0.0.1:8000/api/recipe-detail/1/`  

**Ответ**

При успешном удалении придет пустое тело ответа и статус:
`204 No Content`.

**Ошибки**
* `401 Unauthorized` - недействительный токен.
* `404 Not found` - рецепт с таким `id` на найден.

---

## Ингредиенты

<a name="get_all_ingredients"></a>
### Получить список всех ингредиентов

**Запрос**

`GET http://127.0.0.1:8000/api/ingredients/`   

**Ответ**

```json
[
  "Лягушачьи лапки",
  "Корейка свиная",
  "Филе свиное"
]
```

**Ошибки**
* ...

---

<a name="get_filtered_ingredients"></a>
### Получить список отфильтрованных ингредиентов

>Поиск осуществляется по началу имени ингредиента и не зависит от регистра.

**Запрос**

`GET http://127.0.0.1:8000/api/ingredients/{СИМВОЛЫ_ДЛЯ_ПОИСКА}`  
Например `GET http://127.0.0.1:8000/api/ingredients/ля`  

**Ответ**

```json
[
  "Лягушачьи лапки"
]
```

**Ошибки**
* ...

---

## Меры веса и объема

<a name="get_all_measures"></a>
### Получить список всех единиц измерения

**Запрос**

`GET http://127.0.0.1:8000/api/api/ingredients/measures/`   

**Ответ**

```json
[
  "мл.",
  "л.",
  "гр."
]
```

**Ошибки**
* ...
