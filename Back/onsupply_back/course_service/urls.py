from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet, EnrollmentViewSet, CartItemViewSet, FavouriteCourseViewSet
)

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'cart', CartItemViewSet)
router.register(r'favourites', FavouriteCourseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]