"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestChatPage() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: message || "Bonjour, peux-tu me donner les meilleures entreprises ESG ?",
            },
          ],
        }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const reader = res.body?.getReader()
      let result = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          result += new TextDecoder().decode(value)
        }
      }

      setResponse(result)
    } catch (error) {
      console.error("Erreur:", error)
      setResponse(`Erreur: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Test API Chat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tapez votre message de test..."
            />
          </div>
          <Button onClick={testAPI} disabled={loading} className="w-full">
            {loading ? "Test en cours..." : "Tester l'API"}
          </Button>
          {response && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="font-semibold mb-2">Réponse:</h3>
              <pre className="whitespace-pre-wrap text-sm">{response}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
