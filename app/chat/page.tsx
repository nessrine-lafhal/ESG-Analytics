"use client"

import type React from "react"

import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Bot,
  Home,
  BarChart3,
  Building2,
  Database,
  Sparkles,
  History,
  RefreshCw,
  Leaf,
  MessageSquare,
  TrendingUp,
  Award,
  Users,
  Globe,
  Send,
  Copy,
  Heart,
} from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload } = useChat({
    api: "/api/chat",
    maxSteps: 5,
    streamProtocol: "text",
    onError: (err) => console.error("Erreur chat:", err),
  })

  const [chatHistory, setChatHistory] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Navigation items
  const navigationItems = [
    { title: "Accueil", icon: Home, href: "/" },
    { title: "Chatbot IA", icon: MessageSquare, href: "/chat", active: true },
    { title: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { title: "Entreprises", icon: Building2, href: "/companies" },
    { title: "Analytics", icon: Database, href: "/analytics" },
  ]

  // Questions suggérées étendues et organisées
  const suggestedQuestions = {
    "Vue d'ensemble": [
      "Donne-moi un aperçu complet du dataset ESG",
      "Quelles sont les statistiques générales ?",
      "Résumé des performances par secteur",
      "Répartition géographique des entreprises",
      "Évolution des scores ESG",
    ],
    "Top Performers": [
      "Top 5 des entreprises avec les meilleurs scores ESG",
      "Entreprises leaders en énergies renouvelables",
      "PME les plus performantes en développement durable",
      "Entreprises avec les plus faibles émissions",
      "Champions de l'innovation ESG",
    ],
    "Analyses Sectorielles": [
      "Performance du secteur des technologies vertes",
      "Comparaison agriculture durable vs traditionnelle",
      "Innovations dans la mobilité électrique",
      "Secteur de la construction écologique",
      "Économie circulaire et recyclage",
    ],
    Certifications: [
      "Entreprises certifiées B-Corp",
      "Labels Ecolabel dans le dataset",
      "Certifications ISO 14001 par secteur",
      "Entreprises multi-certifiées",
      "Processus de certification ESG",
    ],
    Environnement: [
      "Entreprises avec les plus faibles émissions GES",
      "Analyse des efforts de réduction carbone",
      "Technologies de captage et stockage CO2",
      "Objectifs de neutralité carbone",
      "Innovations en énergies renouvelables",
    ],
    "Social & Gouvernance": [
      "Analyse de la parité hommes-femmes par secteur",
      "Entreprises avec la meilleure égalité professionnelle",
      "Gouvernance et diversité dans les conseils",
      "Politiques d'inclusion et de diversité",
      "Engagement social des entreprises",
    ],
    Innovations: [
      "Technologies émergentes en ESG",
      "Startups innovantes du dataset",
      "Partenariats R&D en développement durable",
      "Intelligence artificielle et ESG",
      "Blockchain et traçabilité",
    ],
    "Recherches Spécifiques": [
      "Entreprises dans ma région",
      "PME vs ETI : comparaison ESG",
      "Secteur textile durable",
      "Agriculture biologique en France",
      "Transport et logistique verte",
    ],
  }

  const handleQuickQuestion = (question: string) => {
    const event = {
      target: { value: question },
    } as React.ChangeEvent<HTMLInputElement>

    handleInputChange(event)
    setChatHistory((prev) => [question, ...prev.slice(0, 9)])

    setTimeout(() => {
      const form = document.querySelector("form") as HTMLFormElement
      if (form) {
        const submitEvent = new Event("submit", { bubbles: true, cancelable: true })
        form.dispatchEvent(submitEvent)
      }
    }, 100)
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const addToFavorites = (question: string) => {
    setFavorites((prev) => [question, ...prev.filter((q) => q !== question).slice(0, 9)])
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Sidebar */}
        <Sidebar className="border-r border-gray-200 bg-white shadow-lg">
          <SidebarHeader className="border-b border-gray-200 p-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900">ESG Analytics</h2>
                <p className="text-sm text-gray-600">Chatbot IA Avancé</p>
              </div>
            </Link>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wide">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.active}
                        className={`w-full p-3 rounded-lg transition-all duration-200 ${
                          item.active
                            ? "bg-blue-50 border border-blue-200 text-blue-700 shadow-sm"
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                      >
                        <Link href={item.href}>
                          <div className="flex items-center gap-3 w-full">
                            <item.icon className={`w-5 h-5 ${item.active ? "text-blue-600" : "text-gray-500"}`} />
                            <span className="font-medium text-sm">{item.title}</span>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Questions suggérées étendues */}
            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-600" />
                Questions Suggérées
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <Tabs defaultValue="Vue d'ensemble" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 p-1 mb-4">
                    <TabsTrigger value="Vue d'ensemble" className="text-xs">
                      Vue
                    </TabsTrigger>
                    <TabsTrigger value="Top Performers" className="text-xs">
                      Top
                    </TabsTrigger>
                  </TabsList>

                  {/* Onglets supplémentaires */}
                  <div className="grid grid-cols-2 gap-1 mb-4">
                    <TabsList className="grid w-full grid-cols-1 p-1">
                      <TabsTrigger value="Environnement" className="text-xs">
                        <Globe className="w-3 h-3 mr-1" />
                        Env
                      </TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-1 p-1">
                      <TabsTrigger value="Social & Gouvernance" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        Social
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {Object.entries(suggestedQuestions).map(([category, questions]) => (
                    <TabsContent key={category} value={category} className="mt-2">
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {questions.map((question, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="w-full text-left justify-start h-auto p-3 text-wrap text-xs rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors border border-transparent hover:border-blue-200"
                            onClick={() => handleQuickQuestion(question)}
                            disabled={isLoading}
                          >
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                              <span className="leading-relaxed">{question}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Historique */}
            {chatHistory.length > 0 && (
              <SidebarGroup className="mt-6">
                <SidebarGroupLabel className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                  <History className="w-4 h-4 text-gray-600" />
                  Historique
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {chatHistory.map((question, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full text-left justify-start h-auto p-2 text-wrap text-xs rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => handleQuickQuestion(question)}
                        disabled={isLoading}
                      >
                        <div className="flex items-start gap-2">
                          <History className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
                          <span className="leading-relaxed truncate">{question}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            {/* Favoris */}
            {favorites.length > 0 && (
              <SidebarGroup className="mt-6">
                <SidebarGroupLabel className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  Favoris
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {favorites.map((question, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full text-left justify-start h-auto p-2 text-wrap text-xs rounded-lg hover:bg-purple-50 transition-colors"
                        onClick={() => handleQuickQuestion(question)}
                        disabled={isLoading}
                      >
                        <div className="flex items-start gap-2">
                          <Award className="w-3 h-3 text-purple-400 mt-1 flex-shrink-0" />
                          <span className="leading-relaxed truncate">{question}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">8</div>
                  <div className="text-xs text-gray-600">Entreprises</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">8</div>
                  <div className="text-xs text-gray-600">Secteurs</div>
                </div>
              </div>
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">IA Avancée</Badge>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 px-6 bg-white shadow-sm">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h1 className="font-bold text-lg text-gray-900">Chatbot IA ESG</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                ✓ En ligne
              </Badge>
              <Button onClick={reload} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </header>

          <main className="flex-1 flex flex-col p-6">
            <Card className="flex-1 flex flex-col shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Assistant ESG IA Avancé</CardTitle>
                    <p className="text-blue-100 text-sm">
                      Analyses ESG intelligentes • Réponses formatées • 8+ questions par catégorie
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-[500px] bg-gradient-to-b from-white to-gray-50">
                  {messages.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-xl">
                        <Bot className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Bonjour ! Comment puis-je vous aider ?</h3>
                      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Je suis votre assistant IA spécialisé en analyse ESG avec des réponses formatées et claires.
                        Explorez plus de 40 questions suggérées organisées par catégories !
                      </p>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {[
                          {
                            icon: <Database className="w-6 h-6" />,
                            title: "8 Entreprises",
                            desc: "Dataset complet",
                            color: "from-blue-500 to-blue-600",
                          },
                          {
                            icon: <TrendingUp className="w-6 h-6" />,
                            title: "Analyses IA",
                            desc: "Réponses formatées",
                            color: "from-green-500 to-green-600",
                          },
                          {
                            icon: <Award className="w-6 h-6" />,
                            title: "40+ Questions",
                            desc: "8 catégories",
                            color: "from-purple-500 to-purple-600",
                          },
                          {
                            icon: <BarChart3 className="w-6 h-6" />,
                            title: "Visualisations",
                            desc: "Données claires",
                            color: "from-orange-500 to-orange-600",
                          },
                        ].map((feature, index) => (
                          <div
                            key={index}
                            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className={`text-white mb-2 p-2 rounded-lg bg-gradient-to-r ${feature.color} w-fit`}>
                              {feature.icon}
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.desc}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">💡 Nouvelles fonctionnalités</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Réponses formatées en Markdown avec émojis</li>
                          <li>• 8 catégories de questions (40+ questions au total)</li>
                          <li>• Analyses sectorielles approfondies</li>
                          <li>• Historique et favoris des questions</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Messages du chat */}
                  {messages.map((message) => (
                    <div key={message.id} className="space-y-4">
                      <div className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] ${message.role === "user" ? "order-2" : "order-1"}`}>
                          <div
                            className={`p-4 rounded-lg ${
                              message.role === "user"
                                ? "bg-blue-600 text-white ml-auto"
                                : "bg-white border border-gray-200 shadow-sm"
                            }`}
                          >
                            {message.role === "assistant" && (
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                  <Bot className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Assistant ESG IA</span>
                              </div>
                            )}
                            <div
                              className={`prose prose-sm max-w-none ${message.role === "user" ? "prose-invert" : ""}`}
                            >
                              {message.content}
                            </div>
                            {message.role === "assistant" && (
                              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyMessage(message.content)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => addToFavorites(message.content)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  <Heart className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-4 justify-start">
                      <div className="max-w-[80%]">
                        <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Assistant ESG IA</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <span className="text-sm text-gray-500 ml-2">Analyse en cours...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Zone de saisie */}
                <div className="border-t border-gray-200 p-6 bg-white">
                  <form onSubmit={handleSubmit} className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Posez votre question sur les données ESG..."
                        className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>

                  {error && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700">Erreur: {error.message}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
