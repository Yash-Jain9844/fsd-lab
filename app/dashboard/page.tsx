"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, History, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [recentPlans, setRecentPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }

    // Load recent plans from localStorage
    const loadRecentPlans = () => {
      try {
        const storedPlan = localStorage.getItem("fitnessPlan")
        const storedData = localStorage.getItem("fitnessData")

        if (storedPlan && storedData) {
          const plan = JSON.parse(storedPlan)
          const data = JSON.parse(storedData)
          setRecentPlans([
            {
              id: "1",
              title: `${data.numberOfWeeks} week ${data.workoutType} plan`,
              date: new Date().toLocaleDateString(),
              data: data,
              plan: plan,
            },
          ])
        }
      } catch (error) {
        console.error("Error loading plans:", error)
      } finally {
        setLoading(false)
      }
    }

    if (status === "authenticated") {
      loadRecentPlans()
    }
  }, [status, router])

  if (status === "loading" || loading) {
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
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {session?.user?.name || "Fitness Enthusiast"}!</h1>
          <p className="text-muted-foreground mt-2">
            Manage your fitness plans and track your progress all in one place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Create New Plan</CardTitle>
              <CardDescription>Generate a personalized fitness and diet plan</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Answer a few questions about your goals and preferences to get a customized plan.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/dashboard/new-plan">
                  <Plus className="mr-2 h-4 w-4" />
                  New Plan
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>View History</CardTitle>
              <CardDescription>Access your previously generated plans</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Review and compare your fitness journey with past plans and results.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard/history">
                  <History className="mr-2 h-4 w-4" />
                  View History
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Chat Assistant</CardTitle>
              <CardDescription>Get answers to your fitness questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ask questions about your plan, nutrition advice, or workout techniques.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard/chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat Now
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-4">Recent Plans</h2>
        {recentPlans.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPlans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>Created on {plan.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Workout Type:</strong> {plan.data.workoutType}
                    </p>
                    <p>
                      <strong>Diet Type:</strong> {plan.data.dietType}
                    </p>
                    <p>
                      <strong>Duration:</strong> {plan.data.numberOfWeeks} weeks
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/view-plan">View Plan</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/chat">Ask Questions</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground mb-4">You haven't created any fitness plans yet.</p>
              <Button asChild>
                <Link href="/dashboard/new-plan">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Plan
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  )
}
