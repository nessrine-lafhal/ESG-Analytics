"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Building2,
  Leaf,
  MessageSquare,
  TrendingUp,
  Award,
  Globe,
  ArrowRight,
  Sparkles,
  Database,
  PieChart,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [stats] = useState({
    totalCompanies: 50,
    avgScore: 3.4,
    certifications: 38,
    sectors: 15,
    regions: 13,
    activeUsers: 2341,
  })

  const features = [
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      title: "Chatbot IA Intelligent",
      description: "Posez vos questions sur les données ESG et obtenez des réponses précises en temps réel",
      color: "from-blue-50 to-blue-100 border-blue-200",
      href: "/chat",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-green-600" />,
      title: "Dashboards Interactifs",
      description: "Visualisez les performances ESG avec des graphiques et métriques avancés",
      color: "from-green-50 to-green-100 border-green-200",
      href: "/dashboard",
    },
    {
      icon: <Database className="w-8 h-8 text-purple-600" />,
      title: "Base de Données Complète",
      description: "Accédez à 50+ entreprises avec leurs données ESG détaillées",
      color: "from-purple-50 to-purple-100 border-purple-200",
      href: "/companies",
    },
    {
      icon: <PieChart className="w-8 h-8 text-orange-600" />,
      title: "Analyses Sectorielles",
      description: "Comparez les performances par secteur d'activité et région",
      color: "from-orange-50 to-orange-100 border-orange-200",
      href: "/analytics",
    },
  ]

  const quickStats = [
    {
      label: "Entreprises",
      value: stats.totalCompanies + "+",
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Score Moyen ESG",
      value: stats.avgScore + "/5",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Certifications",
      value: stats.certifications,
      icon: <Award className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Secteurs",
      value: stats.sectors + "+",
      icon: <Globe className="w-6 h-6 text-orange-600" />,
      color: "bg-orange-50 text-orange-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ESG Analytics Pro</h1>
                <p className="text-sm text-gray-600">Plateforme d'analyse ESG intelligente</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                <Activity className="w-4 h-4 mr-1" />
                En ligne
              </Badge>
              <Link href="/chat">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Commencer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Nouvelle version avec IA avancée
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Analysez les performances
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> ESG </span>
            avec l'intelligence artificielle
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Découvrez notre plateforme complète d'analyse ESG avec chatbot intelligent, dashboards interactifs et base
            de données de 50+ entreprises françaises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Essayer le Chatbot IA
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
                <BarChart3 className="w-5 h-5 mr-2" />
                Voir les Dashboards
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-3 rounded-xl ${stat.color} mb-3`}>{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href}>
              <Card
                className={`border-2 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gradient-to-br ${feature.color} hover:scale-105`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">{feature.icon}</div>
                    <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                  <div className="flex items-center gap-2 mt-4 text-blue-600 font-medium">
                    Découvrir
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Demo Section */}
        <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à explorer vos données ESG ?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Commencez dès maintenant avec notre chatbot IA ou explorez nos dashboards interactifs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chatbot IA
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Dashboards
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">ESG Analytics Pro</span>
              </div>
              <p className="text-gray-400">
                Plateforme d'analyse ESG avec intelligence artificielle pour les entreprises françaises.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Fonctionnalités</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Chatbot IA</li>
                <li>Dashboards</li>
                <li>Base de données</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Données</h3>
              <ul className="space-y-2 text-gray-400">
                <li>50+ Entreprises</li>
                <li>15+ Secteurs</li>
                <li>Certifications ESG</li>
                <li>Analyses temps réel</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API</li>
                <li>Contact</li>
                <li>Aide</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ESG Analytics Pro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
