import sql from 'better-sqlite3';
import { cache } from 'react';

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

/*
  on peut constater qu'avec le getMessages(), on n'a pas de cache. pour configurer le cache en utilisant cette fonction, on peut utiliser la fonction cache() de 'react' pour mettre en cache les messages recuperes de la base de donnees.

  cache doit wrapper la fonction getMessages() pour que les messages soient mis en cache.
*/

export const getMessages = cache(function getMessages() {
  console.log('Fetching messages from db');
  return db.prepare('SELECT * FROM messages').all();
});
