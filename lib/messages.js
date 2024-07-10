import sql from "better-sqlite3";
import { cache } from "react";
import { unstable_cache as nextCache } from "next/cache";

const db = new sql("messages.db");

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare("INSERT INTO messages (text) VALUES (?)").run(message);
}

/*
  on peut constater qu'avec le getMessages(), on n'a pas de cache. pour configurer le cache en utilisant cette fonction, on peut utiliser la fonction cache() de 'react' pour mettre en cache les messages recuperes de la base de donnees et ainsi optenir le cache pour la non duplication de requete.

  cache doit wrapper la fonction getMessages() pour que les messages soient mis en cache.

  pour le data cache, nous utiliserons 'unsatble_cache' (nextCache) de 'next/cache' pour mettre en cache les messages recuperes de la base de donnees. il doit egalement wrapper la fonction getMessages() pour que les messages soient mis en cache.
  Ne pas oubleir que nextCache retourne une promesse, donc il faut l'utiliser avec await ou l'on appelle cette fonction dans une fonction asynchrone.

  nextCache a un autre argument qui est un tableau de tags. les tags sont des identifiants qui peuvent etre utilises pour revalider les donnees en cache.
*/

export const getMessages = nextCache(
  cache(function getMessages() {
    console.log("Fetching messages from db");
    return db.prepare("SELECT * FROM messages").all();
  }), ['messages']
);
