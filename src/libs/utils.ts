import { createTRPCReact } from "@trpc/react-query";
import { Ollama } from "ollama/browser";
import { AppRouter } from "../../electron/trpc";
import { toast } from "sonner";
export const trpcReact = createTRPCReact<AppRouter>();


let llm: Ollama | null | undefined = null;

export const initializeOllama = (url: string) => {
  try {
    llm = new Ollama({
      host: url ?? "http://localhost:11434",
    });
  } catch (error) {
    toast.error("Failed to initialize Ollama: " + (error as Error).message);
    console.error("Failed to initialize Ollama:", error);
  }
};

export async function extract(text: string) {
  if (!llm) {
    toast.error("Ollama not initialized");
    throw new Error("Ollama not initialized");
  }
  try {
    return await llm.chat({
      model: "llama3.2",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are an expert at extracting key points from text. Given any text, extract key points and return them as plain text in the format {title}:{description}<end>. Respond only with the formatted strings and no other text, you must print the '<end>' token.",
        },
        {
          role: "user",
          content: `The Aelthorne Dukedom has guarded the southern borders of the Imperial Kingdom for centuries, standing as the first line of defense against the Abyss—a dark, foggy void that stretches endlessly and houses the denizens of the demonic empire. While the impenetrable mountains shield the north, east, and west, the south relies solely on the Aelthorne family.
        
                  Our family estate, a towering mansion built from nearly indestructible mountain stone, stands as a testament to this legacy. Chiseled by the Kingdom's finest artisans, its grandeur looms over the surrounding land. As I push open the gilded doors, their sword-shaped engravings glint in the light, reminding me of the strength and honor my family represents.
        
                  The air is still, almost unnaturally so. Peace has reigned for over a century, with no demonic beasts emerging from the Abyss. It is an age of complacency—a time when swordsmanship has fallen into decline. Few achieve the rank of *sword expert*, fewer still *sword masters*, and the legendary *sword saints* are but a handful. `,
        },
        {
          role: "assistant",
          content:
            "Aelthorne Dukedom: Guards the southern borders of the Imperial Kingdom against the Abyss.<end>\n" +
            "Family Estate: A towering mansion built from nearly indestructible mountain stone, symbolizing the family's legacy.<end>\n" +
            "Gilded Doors: Sword-shaped engravings on the doors symbolize strength and honor.<end>\n" +
            "Peace Era: Over a century of peace with no demonic beasts emerging from the Abyss.<end>\n" +
            "Decline in Swordsmanship: Few achieve high ranks like sword expert, sword master, and sword saint.<end>",
        },
        {
          role: "user",
          content: text,
        },
      ],
      keep_alive: 60,
    });
  } catch (error) {
    toast.error("Failed to extract key points: " + (error as Error).message);
    console.error("Failed to extract key points:", error);
    throw error;
  }
}
