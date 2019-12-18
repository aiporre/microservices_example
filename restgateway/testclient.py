from services.warehouse_service import RadiologyClient

client = RadiologyClient()
message = client.request()
print(message)
