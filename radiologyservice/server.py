from concurrent import futures
import threading
import time
import grpc
import radiology_pb2
import radiology_pb2_grpc
from database import DataBase as DB
# for reading the image
import matplotlib.image as mpimg
import numpy as np


class Servicer(radiology_pb2_grpc.RadiologyServiceServicer):
    """the servicer radiology provides preprocesed 3d scans resolutions """

    def __init__(self):
        self.db = DB()

    def __str__(self):
        return self.__class__.__name__

    def slice(self, request, context):
        item = self.db.search(request.id)
        img=mpimg.imread(item['file']).astype('int32')
        xdim = img.shape[0]
        ydim = img.shape[1]
        img = img.flatten()
        return radiology_pb2.Image(data=img, xdim=xdim, ydim=ydim)


def run():
    """The main serve function of the server.
    This opens the socket, and listens for incoming grpc conformant packets"""

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=1))
    radiology_pb2_grpc.add_RadiologyServiceServicer_to_server(Servicer(), server)
    server.add_insecure_port("[::]:9999")
    server.start()
    try:
        while True:
            print("Server Running : threadcount %i" % (threading.active_count()))
            time.sleep(10)
    except KeyboardInterrupt:
        print("KeyboardInterrupt")
        server.stop(0)


if __name__ == "__main__":
    run()
