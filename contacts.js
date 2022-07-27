const { v4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
// console.log(contactsPath) // D:\Education\nodejs-homework\db\contacts.json

async function listContacts() {
  const result = await fs.readFile(contactsPath);

  return JSON.parse(result);
}

async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list.find(({ id }) => id === contactId);
  
  return contact;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const contactToRemove = list.find(({ id }) => id === contactId);
  const newList = list.filter(({ id }) => id !== contactId);
  await updateContactsList(newList);

  return contactToRemove;
}

async function addContact(name, email, phone) {
  const list = await listContacts();
  const newContact = {id:v4(), name, email, phone};

  list.push(newContact);

  await updateContactsList(list);

  // return list;
  return newContact;
}

async function updateContactsList(list) {
  const updatedContactsList = await fs.writeFile(
    contactsPath,
    JSON.stringify(list)
  );

  return updatedContactsList;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
