import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


  
// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  console.log('POST to database')

  //create a connection to the database and version we want to use
  const grabDB = await openDB ('jate', 1);
  //Create a new transaction and specify the database and data privelages ie. the database is 'jate' like we declared above, 'readwrite' is what we can do with 'jate'.
  const dbTx = grabDB.transaction('jate', 'readwrite');
  //Open the desired object store 
  const store = dbTx.objectStore('jate');
  //update text content in database
  const request = store.put({ id: 1, value: content})

  const result = await request;
  console.log('Data saved', result)
  return result

  

}

// Add logic for a method that gets all the content from the database
export const getDb = async () => {

const grabDB = await openDB('jate', 1);

const dbTx = grabDB.transaction('jate','readonly');

const store = dbTx.objectStore('jate');

const request = store.getAll();

const result = await request;
console.log('result.value', result);
return result.value


}

initdb();
