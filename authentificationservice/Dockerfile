FROM mhart/alpine-node:14

RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN rm -rf node_modules/
RUN npm install

EXPOSE 3000

CMD ["node", "/code/app.js"]

