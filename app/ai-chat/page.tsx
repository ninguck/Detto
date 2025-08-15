"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Response } from "@/components/ai-elements/response";
import { GlobeIcon } from "lucide-react";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/source";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Loader } from "@/components/ai-elements/loader";

const models = [
  {
    name: "GPT 4o",
    value: "openai/gpt-4o",
  },
  {
    name: "Deepseek R1",
    value: "deepseek/deepseek-r1",
  },
];

const ChatBotDemo = () => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const { messages, sendMessage, status, setMessages } = useChat();
  const [hasInitialized, setHasInitialized] = useState(false);

  // Add initial welcome message when component mounts
  useEffect(() => {
    if (!hasInitialized && messages.length === 0) {
      setMessages([
        {
          id: "welcome-message-1",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: `Hey Nick! 👋`,
            },
          ],
        },
        {
          id: "welcome-message-2",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: `I'm Detto, your financial assistant. I can help with budgeting, debt strategies, expense tracking, and a lot more.`,
            },
          ],
        },
        {
          id: "welcome-message-3",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: `Any questions about your finances?`,
            },
          ],
        },
      ]);
      setHasInitialized(true);
    }
  }, [messages.length, hasInitialized, setMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(
        { text: input },
        {
          body: {
            model: model,
            webSearch: webSearch,
          },
        }
      );
      setInput("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === "assistant" &&
                  (() => {
                    const sourceUrls = message.parts.filter(
                      (part) => part.type === "source-url"
                    );

                    return sourceUrls.length > 0 ? (
                      <Sources>
                        <SourcesTrigger count={sourceUrls.length} />
                        <SourcesContent>
                          {sourceUrls.map((part, i) => (
                            <Source
                              key={`${message.id}-source-${i}`}
                              href={part.url}
                              title={part.url}
                            />
                          ))}
                        </SourcesContent>
                      </Sources>
                    ) : null;
                  })()}
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <Response key={`${message.id}-${i}`}>
                              {part.text}
                            </Response>
                          );
                        case "reasoning":
                          return (
                            <Reasoning
                              key={`${message.id}-${i}`}
                              className="w-full"
                              isStreaming={status === "streaming"}
                            >
                              <ReasoningTrigger />
                              <ReasoningContent>{part.text}</ReasoningContent>
                            </Reasoning>
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>
                </Message>
              </div>
            ))}
            {status === "submitted" && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Example prompt buttons - only show when no user messages yet */}
        {!messages.some((msg) => msg.role === "user") && (
          <div className="flex gap-3 overflow-x-auto py-3 scrollbar-hide">
            <button
              className="flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
              onClick={() => {
                const exampleText =
                  "How should I prioritize paying off my debts?";
                sendMessage(
                  { text: exampleText },
                  {
                    body: {
                      model: model,
                      webSearch: webSearch,
                    },
                  }
                );
              }}
            >
              How should I prioritize paying off my debts?
            </button>
            <button
              className="flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
              onClick={() => {
                const exampleText = "What's my highest payment?";
                sendMessage(
                  { text: exampleText },
                  {
                    body: {
                      model: model,
                      webSearch: webSearch,
                    },
                  }
                );
              }}
            >
              What's my highest payment?
            </button>
            <button
              className="flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
              onClick={() => {
                const exampleText =
                  "How can I better contribute to my debt repayment?";
                sendMessage(
                  { text: exampleText },
                  {
                    body: {
                      model: model,
                      webSearch: webSearch,
                    },
                  }
                );
              }}
            >
              How can I better contribute to my debt repayment?
            </button>
          </div>
        )}

        <PromptInput onSubmit={handleSubmit} className="mt-4">
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputButton
                variant={webSearch ? "default" : "ghost"}
                onClick={() => setWebSearch(!webSearch)}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton>
              <PromptInputModelSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem
                      key={model.value}
                      value={model.value}
                    >
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatBotDemo;
