# ✅ course_service/views.py
from rest_framework import viewsets, permissions, response, status
from .models import Course, Enrollment, CartItem, FavouriteCourse
from .serializers import (
    CourseSerializer, EnrollmentSerializer, 
    CartItemSerializer, FavouriteCourseSerializer
)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]

class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all() 
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Enrollment.objects.all()
        return Enrollment.objects.filter(user=user)

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return CartItem.objects.all()
        return CartItem.objects.filter(user=user)
    
    def get_serializer_context(self):
        return {'request': self.request}

    # ✅ override destroy method
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return response.Response({"message": "Remove Successfully"}, status=status.HTTP_200_OK)

class FavouriteCourseViewSet(viewsets.ModelViewSet):
    queryset = FavouriteCourse.objects.all()
    serializer_class = FavouriteCourseSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return FavouriteCourse.objects.all()
        return FavouriteCourse.objects.filter(user=user)
    
    def get_serializer_context(self):
        return {'request': self.request}

    # ✅ override destroy method
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return response.Response({"message": "Remove Successfully"}, status=status.HTTP_200_OK)

