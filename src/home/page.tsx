import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Divider,
  ScrollShadow,
  useDisclosure,
  ButtonGroup,
} from "@nextui-org/react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@nextui-org/drawer";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import {
  Settings,
  Save,
  FileOutput,
  ChevronDown,
  Trash2,
  Eraser,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { extract, initializeOllama, trpcReact } from "../libs/utils";
import { toast } from "sonner";

export default function Page() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onOpenChange: onDrawerOpenChange,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [title, setTitle] = useState<string>("");
  const { data: _url } = trpcReact.getOllamaUrl.useQuery();
  const { mutate: _setOllamaUrl } = trpcReact.setOllamaUrl.useMutation();
  const [ollamaUrl, setOllamaUrl] = useState(
    _url ?? "http://192.168.0.103:11434"
  );
  const [isListOpen, setIsListOpen] = useState(false);
  const { mutate: _setKeyPoints } = trpcReact.setKeyPoints.useMutation();
  const { mutate: _deleteKeyPoints } = trpcReact.deleteKeyPoints.useMutation();
  const { data: _keyPoints } = trpcReact.getKeyPoints.useQuery();
  console.log(_keyPoints);
  const [text, setText] = useState<string>("");
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const utils = trpcReact.useUtils();

  useEffect(() => {
    initializeOllama(ollamaUrl);
  }, [ollamaUrl]);

  const handleExtract = async () => {
    if (!text) {
      toast.error("Text is empty");
      return;
    }
    if (text.length < 100) {
      toast.error("Text is too short");
      return;
    }
    if (isGenerating) {
      toast.error("Already generating key points");
      return;
    }
    setIsGenerating(true);
    initializeOllama(ollamaUrl);
    const res = await extract(text.trim());
    let c: string = "";
    for await (const part of res) {
      c += part.message.content;
      setKeyPoints(c.split("<end>"));
    }
    setIsGenerating(false);
  };
  const handleSetKeyPoints = () => {
    _setKeyPoints({ points: keyPoints, title });
  };

  const splitKeyPoint = (point: string) => {
    const [title, desc] = point.split(":");
    return { title, desc };
  };

  return (
    <div className="h-screen w-screen relative">
      {/* Main content area */}
      <div className="h-full w-full flex gap-4 container mx-auto p-12">
        <div className="h-full w-full flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 flex-grow">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Title"
              />
              <Textarea
                spellCheck={false}
                variant="flat"
                value={text}
                className=""
                onChange={(v) => setText(v.currentTarget.value)}
                label="Enter text to extract key points"
              />
            </div>
          </div>
          <Divider />
          <ScrollShadow className="flex flex-col gap-3 max-h-[50svh]">
            {keyPoints.map((v, idx) => {
              const { title, desc } = splitKeyPoint(v);
              return title ? (
                <div
                  key={idx}
                  className="flex items-center p-3 px-5 gap-2 bg-default-50 rounded-2xl"
                >
                  <h2 className="text-xl font-semibold text-nowrap">
                    {title}:
                  </h2>
                  <p className="font-mono text-wrap text-left flex-grow">
                    {desc}
                  </p>
                  <ButtonGroup variant="flat" size="sm" isIconOnly>
                    <Button
                      isDisabled={isGenerating}
                      isLoading={keyPoints.length <= idx + 1}
                      onPress={() => {
                        const points = keyPoints;
                        points.splice(idx, 1);
                        setKeyPoints([...points]);
                      }}
                      color="danger"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </ButtonGroup>
                </div>
              ) : (
                <React.Fragment key={idx}></React.Fragment>
              );
            })}
          </ScrollShadow>
        </div>
      </div>

      {/* Floating dock */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 bg-content1 px-6 py-4 rounded-full shadow-lg">
          <Button
            startContent={<FileOutput size={18} />}
            isLoading={isGenerating}
            isDisabled={isGenerating}
            onPress={async () => {
              await handleExtract();
            }}
            variant="flat"
            color="primary"
          >
            Extract
          </Button>
          <Button
            onPress={async () => {
              if (!title) {
                toast.error("Title is empty");
                return;
              }
              if (keyPoints.length === 0) {
                toast.error("Key points are empty");
                return;
              }
              handleSetKeyPoints();
              toast("Key points saved");
              utils.getKeyPoints.invalidate();
            }}
            startContent={<Save size={18} />}
            isDisabled={isGenerating || keyPoints.length === 0}
            isLoading={isGenerating}
            variant="flat"
            color="secondary"
          >
            Save
          </Button>
          <Button
            variant="flat"
            color="warning"
            onPress={() => {
              setKeyPoints([]);
            }}
            isDisabled={keyPoints.length === 0}
            isLoading={isGenerating}
            startContent={<Eraser size={18} />}
          >
            Clear
          </Button>
          <Divider orientation="vertical" className="min-h-8" />
          <Button
            isIconOnly
            variant="flat"
            aria-label="Settings"
            className="text-foreground"
            onPress={() => setIsSettingsOpen(true)}
          >
            <Settings size={20} />
          </Button>
          <Popover
            isOpen={isListOpen}
            onOpenChange={(open) => {
              setIsListOpen(open);
            }}
            onSelect={() => {
              onDrawerOpen();
            }}
          >
            <PopoverTrigger>
              <Button
                isDisabled={_keyPoints?.length === 0}
                isIconOnly
                variant="flat"
                aria-label="Settings"
                className="text-foreground"
              >
                <ChevronDown
                  className={`${isListOpen ? "rotate-180" : ""} transition-all`}
                  size={20}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <div className="flex flex-col">
                {(_keyPoints ?? []).sort().map((v) => {
                  return (
                    <Button
                      radius="none"
                      variant="light"
                      onPress={() => {
                        setSelectedPoint(v.title);
                        onDrawerOpen();
                        isListOpen && setIsListOpen(false);
                      }}
                      key={v.title}
                      value={v.title}
                      className="first:rounded-t-2xl last:rounded-b-2xl"
                    >
                      {v.title}
                    </Button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Settings
              </ModalHeader>
              <ModalBody>
                <form>
                  <Input
                    value={ollamaUrl}
                    onChange={(e) => setOllamaUrl(e.target.value)}
                    variant="underlined"
                    label="ollama URL"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onPress={() => {
                    _setOllamaUrl(ollamaUrl);
                    toast("Settings saved");
                    onClose();
                  }}
                >
                  Save
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Drawer isOpen={isDrawerOpen} onOpenChange={onDrawerOpenChange}>
        <DrawerContent>
          <DrawerHeader>{selectedPoint}</DrawerHeader>
          <DrawerBody>
            {selectedPoint ? (
              <div>
                <ScrollShadow className="">
                  {(_keyPoints ?? [])
                    .find((v) => v.title === selectedPoint)
                    ?.points.map((v, idx) => {
                      return (
                        <div
                          key={idx}
                          className="flex items-center p-3 px-5 gap-2 bg-default-50 rounded-2xl"
                        >
                          <p className="font-mono text-wrap text-left">{v}</p>
                        </div>
                      );
                    })}
                </ScrollShadow>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <p className="text-lg text-center text-foreground">
                  Select a key point to view details
                </p>
              </div>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => {
                if (!selectedPoint) return;
                _deleteKeyPoints(selectedPoint);
                toast("Key point deleted");
                utils.getKeyPoints.invalidate();
                onDrawerClose();
              }}
            >
              Delete
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
