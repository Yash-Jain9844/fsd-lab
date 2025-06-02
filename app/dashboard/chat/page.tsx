"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Send, Loader2, Bot, User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useToast } from "@/components/ui/use-toast"
import Markdown from "react-markdown"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your fitness assistant. Ask me anything about your workout or diet plan.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<any>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)
  const [currentTypingMessage, setCurrentTypingMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { status } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    // Retrieve the plan from localStorage
    const storedPlan = localStorage.getItem("fitnessPlan")
    if (storedPlan) {
      setPlan(JSON.parse(storedPlan))
    }
  }, [status, router])

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typingText])

  // Typing effect
  useEffect(() => {
    if (isTyping && currentTypingMessage) {
      if (typingIndex < currentTypingMessage.length) {
        const timeout = setTimeout(() => {
          setTypingText(currentTypingMessage.substring(0, typingIndex + 1))
          setTypingIndex(typingIndex + 1)
        }, 15) // Adjust speed as needed
        return () => clearTimeout(timeout)
      } else {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: currentTypingMessage,
            timestamp: new Date(),
          },
        ])
        setCurrentTypingMessage(null)
        setTypingText("")
        setTypingIndex(0)
      }
    }
  }, [isTyping, typingIndex, currentTypingMessage])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || loading) return

    if (!plan) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          role: "user",
          content: input,
          timestamp: new Date(),
        },
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I don't see any fitness plan generated yet. Please go to the 'New Plan' page to create your personalized plan first.",
          timestamp: new Date(),
        },
      ])
      setInput("")
      return
    }

    // Add user message to chat
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
          plan: plan,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Start typing effect
      setCurrentTypingMessage(data.response)
      setIsTyping(true)
    } catch (error) {
      console.error("Error in chat:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please try again.",
      })
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "I'm sorry, I encountered an error processing your request. Please try again.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Chat with AI Assistant</h1>
          <p className="text-muted-foreground mt-2">
            Ask questions about your fitness plan, nutrition advice, or workout techniques.
          </p>
        </div>

        {!plan ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Plan Found</AlertTitle>
            <AlertDescription>
              Please go to the New Plan page to generate a fitness plan first before using the chat assistant.
              <div className="mt-4">
                <Button asChild>
                  <a href="/dashboard/new-plan">Create New Plan</a>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          <Card className="w-full h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Fitness Assistant</CardTitle>
              <CardDescription>Ask questions about your personalized fitness and diet plan</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                            : "bg-muted rounded-tl-lg rounded-tr-lg rounded-br-lg"
                        } p-3`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`prose ${message.role === "user" ? "text-primary-foreground" : "text-foreground"} max-w-none prose-sm`}
                        >
                          <Markdown>{message.content}</Markdown>
                        </div>
                        {message.role === "user" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%] bg-muted rounded-tl-lg rounded-tr-lg rounded-br-lg p-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="prose text-foreground max-w-none prose-sm">
                          <Markdown>{typingText}</Markdown>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                <Input
                  placeholder="Ask about your fitness plan..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading || isTyping}
                  className="flex-grow"
                />
                <Button type="submit" size="icon" disabled={loading || isTyping}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </CardFooter>
          </Card>
        )}
      </main>
    </>
  )
}
