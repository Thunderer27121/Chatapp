// src/db.js
import { init, id, tx } from "@instantdb/react";

const APP_ID = import.meta.env.VITE_Appid; // .env: VITE_APP_ID=...

export const db = init({ appId: APP_ID });

// Always create a NEW message (no overwrite)
export async function sendMessage({ text, senderName, receiverName }) {
  const messageId = id(); // 👈 new random id every time

  await db.transact([
    tx.messages[messageId].update({
      id: messageId,              // explicit id field is nice for keys
      text,
      senderName,
      receiverName,
      createdAt: Date.now(),      // store as number; easy to sort
    }),
  ]);
}
