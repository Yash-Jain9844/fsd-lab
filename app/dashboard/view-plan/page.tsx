"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Loader2, Copy, Download, Calendar, Dumbbell, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Navbar } from "@/components/navbar"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Markdown from "react-markdown"

interface Plan {
  dietPlan: string
  workoutPlan: string
}

export default function ViewPlanPage() {
  const [plan, setPlan] = useState<Plan | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
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
    const storedData = localStorage.getItem("fitnessData")

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan))
    }

    if (storedData) {
      setUserData(JSON.parse(storedData))
    }

    setLoading(false)
  }, [status, router])

  const handleCopyPlan = (type: "diet" | "workout") => {
    if (!plan) return

    const content = type === "diet" ? plan.dietPlan : plan.workoutPlan
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: `Your ${type} plan has been copied to the clipboard.`,
    })
  }

  if (loading || status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!plan) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>No Plan Found</AlertTitle>
            <AlertDescription>
              Please go to the New Plan page to generate a fitness plan first.
              <div className="mt-4">
                <Button asChild>
                  <a href="/dashboard/new-plan">Create New Plan</a>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Your Fitness Plan</h1>
          <p className="text-muted-foreground mt-2">
            Here's your personalized workout and diet plan based on your goals and preferences.
          </p>
        </div>

        {userData && (
          <Card className="mb-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <CardHeader>
              <CardTitle>Plan Overview</CardTitle>
              <CardDescription>
                {userData.numberOfWeeks} week {userData.workoutType} workout with {userData.dietType} diet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">{userData.numberOfWeeks} weeks</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Dumbbell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Workout Focus</p>
                    <p className="text-sm text-muted-foreground">{userData.workoutType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Utensils className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Diet Type</p>
                    <p className="text-sm text-muted-foreground">{userData.dietType}</p>
                  </div>
                </div>
              </div>

              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="details">
                  <AccordionTrigger>View Detailed Information</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p>
                          <strong>Current Weight:</strong> {userData.currentWeight} kg
                        </p>
                        <p>
                          <strong>Target Weight:</strong> {userData.targetWeight} kg
                        </p>
                        <p>
                          <strong>Age:</strong> {userData.age}
                        </p>
                        <p>
                          <strong>Gender:</strong> {userData.gender}
                        </p>
                      </div>
                      <div>
                        {userData.dietaryRestrictions && (
                          <p>
                            <strong>Dietary Restrictions:</strong> {userData.dietaryRestrictions}
                          </p>
                        )}
                        {userData.healthConditions && (
                          <p>
                            <strong>Health Conditions:</strong> {userData.healthConditions}
                          </p>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="diet" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="diet" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Diet Plan
            </TabsTrigger>
            <TabsTrigger value="workout" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              Workout Plan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diet">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Personalized Diet Plan</CardTitle>
                  <CardDescription>Follow this diet plan to achieve your fitness goals</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleCopyPlan("diet")}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy diet plan</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download diet plan</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <Markdown>{plan.dietPlan}</Markdown>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workout">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Personalized Workout Plan</CardTitle>
                  <CardDescription>Follow this workout plan to achieve your fitness goals</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleCopyPlan("workout")}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy workout plan</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download workout plan</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <Markdown>{plan.workoutPlan}</Markdown>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center">
          <Button asChild>
            <a href="/dashboard/chat">Chat with AI Assistant</a>
          </Button>
        </div>
      </main>
    </>
  )
}
