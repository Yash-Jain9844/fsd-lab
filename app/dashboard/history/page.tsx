"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Loader2, Calendar, Dumbbell, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Navbar } from "@/components/navbar"

interface PlanHistory {
  id: string
  title: string
  date: string
  data: any
  plan: any
}

export default function HistoryPage() {
  const [planHistory, setPlanHistory] = useState<PlanHistory[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    // Load plans from localStorage
    const loadPlans = () => {
      try {
        const storedPlan = localStorage.getItem("fitnessPlan")
        const storedData = localStorage.getItem("fitnessData")

        if (storedPlan && storedData) {
          const plan = JSON.parse(storedPlan)
          const data = JSON.parse(storedData)
          setPlanHistory([
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
      loadPlans()
    }
  }, [status, router])

  const handleViewPlan = () => {
    router.push("/dashboard/view-plan")
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Plan History</h1>
          <p className="text-muted-foreground mt-2">View and manage your previously generated fitness plans.</p>
        </div>

        {planHistory.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {planHistory.map((plan) => (
              <Card key={plan.id} className="overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary to-primary/60" />
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>Created on {plan.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <p className="mt-2 text-xs text-center">{plan.data.numberOfWeeks} weeks</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Dumbbell className="h-5 w-5 text-primary" />
                      </div>
                      <p className="mt-2 text-xs text-center">{plan.data.workoutType}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Utensils className="h-5 w-5 text-primary" />
                      </div>
                      <p className="mt-2 text-xs text-center">{plan.data.dietType}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleViewPlan}>
                    View Plan
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/dashboard/chat">Ask Questions</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Alert className="mb-6">
            <AlertTitle>No Plans Found</AlertTitle>
            <AlertDescription>
              You haven't created any fitness plans yet. Create your first plan to get started.
              <div className="mt-4">
                <Button asChild>
                  <a href="/dashboard/new-plan">Create New Plan</a>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </main>
    </>
  )
}
