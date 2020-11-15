
import os
import time
import grpc
import radiology_pb2
import radiology_pb2_grpc
import numpy as np

def close(channel):
    "Close the channel"
    channel.close()

class RadiologyClient(object):
    def request(self, id: int=0) -> str:
        "creates a channel to radiology and retrieves an image"
        pid = os.getpid()
        try:
            with grpc.insecure_channel("localhost:9999") as channel:
                stub = radiology_pb2_grpc.RadiologyServiceStub(channel)
                start = time.time()
                image = stub.slice(radiology_pb2.Patient(id=0, name='foo'))
                data = np.array(image.data).reshape((image.xdim,image.ydim))
                print("reading time %.4f : procid=%i" % (time.time() - start, pid))
                time.sleep(0.001)
                channel.unsubscribe(close)
                return 'success'
        except Exception as e:
            return str(e)

class ItemsProvider(object):
    def __init__(self, items: list=[]):
        print('ItemsProvider Created: ', items)
        self._items =items

    def get_image(self, id, number_of_items: int=5) -> dict:
        print('creating client...')
        client = RadiologyClient()
        print('request data for id:', id)
        response = client.request(id=0)
        return {'data': response}

    def get_patients(self) -> list:
        print('Make request to radiology ...')
        # publish message to brocker
        # wait response or repeat
        print('Make request to Laboratory ...')
        # publish message
        # wait response or repeat
        # TODO: return like this..{
        #           id: 1,
        #           name: 'juan',
        #           available: false
        #         }
        return [{'id':0, 'name': 'A'},{'id':1, 'name': 'B'},{'id':2, 'name': 'C'}]
