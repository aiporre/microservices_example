from flask_injector import inject
from services.warehouse_service import ItemsProvider

@inject
def search(data_provider=ItemsProvider()) -> list:
    return data_provider.get()
