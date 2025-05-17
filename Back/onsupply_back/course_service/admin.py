# course_service/admin.py
from django.contrib import admin
from .models import Course, Enrollment, FavouriteCourse, CartItem

admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(FavouriteCourse)
admin.site.register(CartItem)