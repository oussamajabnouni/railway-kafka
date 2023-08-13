require("dotenv").config();
const { Kafka } = require("kafkajs");
const config = require("./config");

const kafka = new Kafka({
  clientId: "consumer-teste",
  brokers: [process.env.BROKERS],
});

const consumer = kafka.consumer({ groupId: `${config.kafkaTopic}-group` });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: config.kafkaTopic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
