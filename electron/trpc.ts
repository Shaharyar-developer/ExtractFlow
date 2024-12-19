import z from "zod";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import Store from "electron-store";

const store = new Store({
  // schema: storeSchema,
});

const t = initTRPC.create({ isServer: true, transformer: superjson });
type KeyPoints = { title: string; points: string[] };
type StoredKeyPoints = KeyPoints[];

export const router = t.router({
  setTheme: t.procedure.input(z.string()).mutation((req) => {
    const { input } = req;
    store.set("theme", input);
  }),
  getTheme: t.procedure.query(() => {
    return store.get("theme") || "dark";
  }),
  setOllamaUrl: t.procedure.input(z.string()).mutation((req) => {
    const { input } = req;
    store.set("ollamaUrl", input);
  }),
  getOllamaUrl: t.procedure.query(() => {
    return (store.get("ollamaUrl") || "https://ollama.com") as string;
  }),
  getKeyPoints: t.procedure.query(() => {
    return (store.get("keyPoints") as StoredKeyPoints) || [];
  }),
  setKeyPoints: t.procedure
    .input(
      z.object({
        title: z.string(),
        points: z.array(z.string()),
      })
    )
    .mutation((req) => {
      const { input } = req;
      const keyPoints = (store.get("keyPoints") as StoredKeyPoints) || [];
      keyPoints.push(input);
      store.set("keyPoints", keyPoints);
    }),
  deleteKeyPoints: t.procedure.input(z.string()).mutation((req) => {
    const { input } = req;
    const keyPoints = (store.get("keyPoints") as StoredKeyPoints) || [];
    store.set(
      "keyPoints",
      keyPoints.filter((kp) => kp.title !== input)
    );
  }),
});

export type AppRouter = typeof router;
