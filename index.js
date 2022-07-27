const contactsMethods = require("./contacts");

const { listContacts, getContactById, removeContact, addContact } =
  contactsMethods;

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    // node index -a list
    case "list":
      const list = await listContacts();
      console.log(list);
      break;

    // node index -a get -i 10
    case "get":
      const contactToFindById = await getContactById(id);
      console.log(contactToFindById);
      break;

    // node index -a add -n Dana -e dana@email.com -p "(123) 123-1212"
    case "add":
      const contactToAdd = await addContact(name, email, phone);
      console.log(contactToAdd);
      break;

    // node index -a remove -i 11
    case "remove":
      const contactToRemove = await removeContact(id);
      console.log(contactToRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
