from django.db import models

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)  # Renamed for better readability
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Ensures precision for money values
    quantity = models.IntegerField()  # Ensures only integers are stored
    date_of_buying = models.DateField()  # Stores as a proper date format
    buyer_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.price} ({self.quantity} pcs)"
