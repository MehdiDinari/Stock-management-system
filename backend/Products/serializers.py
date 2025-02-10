from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('product_id',  # Corrected field name
                  'name',
                  'price',
                  'quantity',
                  'date_of_buying',
                  'buyer_name')  # Updated to match the Product model
