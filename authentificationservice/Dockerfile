FROM mhart/alpine-node:14

RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN node install

EXPOSE 3000

CMD ["node", "/code/app.js"]

