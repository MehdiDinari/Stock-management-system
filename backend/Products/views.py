from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse, Http404
from .models import Product
from .serializers import ProductSerializer

class ProductView(APIView):

    def get_product(self, pk):
        try:
            return Product.objects.get(product_id=pk)
        except Product.DoesNotExist:
            raise Http404("Product Does Not Exist")

    def get(self, request, pk=None):
        if pk:
            product = self.get_product(pk)
            serializer = ProductSerializer(product)
        else:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Product Created Successfully", "product": serializer.data}, status=201)
        return Response({"error": serializer.errors}, status=400)

    def put(self, request, pk=None):
        try:
            product_to_update = self.get_product(pk)
        except Http404:
            return Response({"error": "Product Not Found"}, status=404)

        serializer = ProductSerializer(instance=product_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Product Updated Successfully", "product": serializer.data}, status=200)

        return Response({"error": serializer.errors}, status=400)

    def delete(self, request, pk=None):
        try:
            product_to_delete = self.get_product(pk)
            product_to_delete.delete()
            return Response({"message": "Product Deleted Successfully"}, status=200)
        except Http404:
            return Response({"error": "Product Does Not Exist"}, status=404)
