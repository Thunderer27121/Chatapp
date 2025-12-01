
import { init, id, tx } from "@instantdb/react";

const APP_ID = import.meta.env.VITE_Appid; 

export const db = init({ appId: APP_ID });

export async function sendMessage({ text, senderName, receiverName }) {
  const messageId = id(); 

  await db.transact([
    tx.messages[messageId].update({
      id: messageId,           
      text,
      senderName,
      receiverName,
      createdAt: Date.now(),      
    }),
  ]);
}
