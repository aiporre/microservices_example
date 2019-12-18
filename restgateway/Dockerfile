FROM python:3.7

RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN pip install -r requirements.txt

EXPOSE 9090
EXPOSE 9999
CMD ["python", "/code/app.py"]
