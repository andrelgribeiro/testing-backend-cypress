FROM cypress/included:12.0.0
WORKDIR /
COPY . .
RUN npm install
CMD ["npx", "cypress", "run"]