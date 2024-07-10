import Messages from '@/components/messages';
import { unstable_noStore } from 'next/cache';

/*
    Nous allons essayer de creer une configuration de cache pour toutes les requetes effectuees dans notre page MessagesPage.

    pour cela, nous aurons besoin de 02 constantes particulieres: revalidate et dynamic.

    on peut aussi utiliser unstable_noStore de 'next/cache' pour desactiver le cache pour une page/composant specifique en l'appelant dans le composant en question.
*/

// export const revalidate = 5; // 5 secondes
// export const dynamic = 'force-dynamic'; // il est pareil a cahe: 'no-store'

export default async function MessagesPage() {
  // desactiver le cache pour cette page
  // unstable_noStore();

  try {
    // request to the backend to get the messages
    const response = await fetch('http://localhost:8082/messages', {
      // gestion du cache
      //cache: 'no-store',  /* ne pas sotocker de copie de la reponse dans le cache du navigateur. Cela signifie que chaque fois que la requête est effectuée, elle sera envoyée au serveur sans essayer de récupérer la réponse du cache local. C'est utile pour s'assurer que les données récupérées sont toujours les plus récentes, en évitant d'utiliser une version potentiellement obsolète stockée dans le cache.*/

      // gestion de la revalidation: utilisera la copie en cache de la réponse pendant 5 secondes, mais enverra une nouvelle requête au serveur pour obtenir une nouvelle version des données après ce délai.
      // next: {
      //   revalidate: 5, // 5 second  
      // }

    // mettre une entete personnalisee a une requete
    //   headers: {
    //     'X-ID': 'page',
    //   },

    });

    // capter les erreurs
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const messages = await response.json();

    if (!messages || messages.length === 0) {
      return <p>No messages found</p>;
    }

    // return the messages component with the messages
    // messages : represente le props du composant Messages de components/messages.js
    return <Messages messages={messages} />;
  } catch (error) {
    // afficher les erreurs captees dans la console
    console.error(error);
    return <p>Something went wrong</p>;
  }
}