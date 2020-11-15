from flask_injector import inject
from services.warehouse_service import ItemsProvider

@inject
def get(id) -> list:
    print('data provider search...')
    data_provider = ItemsProvider()
    image = data_provider.get_image(id)['data']
    print('IMAGE! :)', image)
    # TODO: report = {id: (int), name: (string), image: (bytes string), age: (string), affiliation: (string)}
    return [{'id': id, 'name': "Foo", 'image': 'Faa' }]
