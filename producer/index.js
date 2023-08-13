require("dotenv").config();
const { Kafka } = require("kafkajs");
const config = require("./config");

const kafka = new Kafka({
  clientId: "producer-teste",
  brokers: [process.env.BROKERS],
});

const producer = kafka.producer();

const run = async () => {
  // Producing
  await producer.connect();

  for (let i = 0; i < 10; i++) {
    await producer.send({
      topic: config.kafkaTopic,
      messages: [{ value: `Kafka message ${i}` }],
    });
  }
};

run().catch(console.error);
