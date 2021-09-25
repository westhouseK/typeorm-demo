import { createConnection, getRepository } from "typeorm";
import dbConfig from "./db-config";
import Customer from "./entities/customer";

createConnection(dbConfig)
  .then(async (connection) => {
    console.log("Postgres Connected");
    try {
      const customerRepository = getRepository(Customer);

      const newCustomer = new Customer('Neo');
      newCustomer.age = 30;
      const savedCustomer = await customerRepository.save(newCustomer);
      console.log('Saved: ', savedCustomer)

      const allCustomers = await customerRepository.find();
      console.log("Select: ", allCustomers);
    } catch (error) {
      console.log("Fail: ", error);
    } finally {
      await connection.close();
      console.log("Connection Closed");
    }
  })
  .catch((error) => {
    console.error("Postgres Connection Failed", error);
  });
