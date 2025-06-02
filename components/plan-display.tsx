"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Markdown from "react-markdown"

interface Plan {
  dietPlan: string
  workoutPlan: string
}

export default function PlanDisplay() {
  const [plan, setPlan] = useState<Plan | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading your plan...</div>
  }

  if (!plan) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Plan Found</AlertTitle>
        <AlertDescription>Please go to the Input Details tab and generate a plan first.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {userData && (
        <Card>
          <CardHeader>
            <CardTitle>Your Plan Details</CardTitle>
            <CardDescription>
              {userData.numberOfWeeks} week {userData.workoutType} workout with {userData.dietType} diet
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="diet" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="diet">Diet Plan</TabsTrigger>
          <TabsTrigger value="workout">Workout Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="diet">
          <Card>
            <CardHeader>
              <CardTitle>Your Personalized Diet Plan</CardTitle>
              <CardDescription>Follow this diet plan to achieve your fitness goals</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <Markdown>{plan.dietPlan}</Markdown>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workout">
          <Card>
            <CardHeader>
              <CardTitle>Your Personalized Workout Plan</CardTitle>
              <CardDescription>Follow this workout plan to achieve your fitness goals</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <Markdown>{plan.workoutPlan}</Markdown>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
