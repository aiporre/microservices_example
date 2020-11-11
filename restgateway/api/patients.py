from flask_injector import inject
from services.warehouse_service import ItemsProvider

@inject
def search() -> list:
    # creates instance of items provider in warehouse
    data_provider = ItemsProvider()
    # reads list patients
    patients = data_provider.get_patients()
    print('PATIENTS!!!! :) :) :)', patients)
    return patients
