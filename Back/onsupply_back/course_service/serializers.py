from rest_framework import serializers
from .models import Course, Enrollment, CartItem, FavouriteCourse

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'enrolled_at']

    def create(self, validated_data):
        user = self.context['request'].user
        return Enrollment.objects.create(user=user, **validated_data)

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'course', 'added_at']
        
    def create(self, validated_data):
        user = self.context['request'].user
        return CartItem.objects.create(user=user, **validated_data)

class FavouriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavouriteCourse
        fields = ['id', 'course', 'marked_at']
        
    def create(self, validated_data):
        user = self.context['request'].user
        return FavouriteCourse.objects.create(user=user, **validated_data)
