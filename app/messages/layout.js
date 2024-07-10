import { getMessages } from "../../lib/messages";

export default async function MessagesLayout({ children }) {
  try {
    // request to the backend to get the messages

    // gestion du cache pour une requete adresse a un API externe (fetch)
    // const response = await fetch("http://localhost:8082/messages", {

    //   // mettre une entete personnalisee a une requete
    //   // headers: {
    //   //   "X-ID": "layout",
    //   // },
    // });

    // // capter les erreurs
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const messages = await response.json();

    // gestion du cache pour une requete adresse a une base de donnees
    const messages = getMessages();
    const totalMessages = messages.length;

    // return the layout with the children (the messages)
    return (
      <>
        <h1>Important Messages</h1>
        <p>{totalMessages} messages found</p>
        <hr />
        {children}
      </>
    );
  } catch (error) {
    // afficher les erreurs captees dans la console
    console.error(error);
    return <p>Something went wrong</p>;
  }
}
