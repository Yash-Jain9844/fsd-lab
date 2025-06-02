"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { Dumbbell, Utensils, MessageSquare, Calendar } from "lucide-react"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  if (status === "loading") {
    return null
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AI-Powered Fitness & Diet Planning
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Get personalized workout and diet plans tailored to your goals, preferences, and health conditions.
                    Powered by advanced AI.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 p-6">
                      <div className="flex flex-col items-center justify-center p-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm">
                        <Dumbbell className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium">Personalized Workouts</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm">
                        <Utensils className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium">Custom Diet Plans</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm">
                        <MessageSquare className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium">AI Chat Assistant</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm">
                        <Calendar className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium">Weekly Planning</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our AI-powered platform offers everything you need to achieve your fitness goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Personalized Workouts</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Get workout plans tailored to your fitness level, goals, and available equipment.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Custom Diet Plans</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Receive diet recommendations based on your preferences, restrictions, and weight goals.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Chat Assistant</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Ask questions about your plan and get instant, personalized guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Transform?</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Start your fitness journey today with our AI-powered planning tools.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
