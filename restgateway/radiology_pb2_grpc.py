# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
import grpc

import radiology_pb2 as radiology__pb2


class RadiologyServiceStub(object):
  """The service called radiology implements image processing modules
  """

  def __init__(self, channel):
    """Constructor.

    Args:
      channel: A grpc.Channel.
    """
    self.slice = channel.unary_unary(
        '/RadiologyService/slice',
        request_serializer=radiology__pb2.Patient.SerializeToString,
        response_deserializer=radiology__pb2.Image.FromString,
        )


class RadiologyServiceServicer(object):
  """The service called radiology implements image processing modules
  """

  def slice(self, request, context):
    """an example of getting a feature
    """
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')


def add_RadiologyServiceServicer_to_server(servicer, server):
  rpc_method_handlers = {
      'slice': grpc.unary_unary_rpc_method_handler(
          servicer.slice,
          request_deserializer=radiology__pb2.Patient.FromString,
          response_serializer=radiology__pb2.Image.SerializeToString,
      ),
  }
  generic_handler = grpc.method_handlers_generic_handler(
      'RadiologyService', rpc_method_handlers)
  server.add_generic_rpc_handlers((generic_handler,))
