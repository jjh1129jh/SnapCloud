import { openDB } from "idb";

export async function initDB() {
  return openDB("my-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files");
      }
    },
  });
}

// 파일 저장 (key를 유니크하게 주면 여러 장 저장 가능)
export async function saveFile(key, file) {
  const db = await initDB();
  await db.put("files", file, key);
}

// 단일 파일 가져오기
export async function getFile(key) {
  const db = await initDB();
  return await db.get("files", key);
}

// 모든 파일 가져오기
export async function getAllFiles() {
  const db = await initDB();
  return await db.getAll("files");
}

// 모든 파일 지우기
export async function clearAllFiles() {
  const db = await initDB();
  await db.clear("files");
}