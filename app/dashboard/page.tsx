"use client"

import { useState } from "react"
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
  BarChart3,
  Building2,
  TrendingUp,
  Award,
  Home,
  MessageSquare,
  Database,
  Leaf,
  Activity,
  Globe,
  TreePine,
  Factory,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024")

  // Navigation items
  const navigationItems = [
    { title: "Accueil", icon: Home, href: "/" },
    { title: "Chatbot IA", icon: MessageSquare, href: "/chat" },
    { title: "Dashboard", icon: BarChart3, href: "/dashboard", active: true },
    { title: "Entreprises", icon: Building2, href: "/companies" },
    { title: "Analytics", icon: Database, href: "/analytics" },
  ]

  // KPIs principaux
  const mainKPIs = [
    {
      title: "Total Entreprises",
      value: "50+",
      change: "+12%",
      trend: "up",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      title: "Score ESG Moyen",
      value: "3.4/5",
      change: "+0.3",
      trend: "up",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      title: "Certifications",
      value: "38",
      change: "+8",
      trend: "up",
      icon: <Award className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      title: "Émissions Moyennes",
      value: "156 tCO2",
      change: "-15%",
      trend: "down",
      icon: <TreePine className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
    },
  ]

  // Performance par secteur
  const sectorPerformance = [
    { sector: "Énergies Renouvelables", score: 4.2, companies: 8, trend: "up", emissions: 45.8 },
    { sector: "Technologies Vertes", score: 4.0, companies: 6, trend: "up", emissions: 67.3 },
    { sector: "Agriculture Durable", score: 3.8, companies: 4, trend: "stable", emissions: 78.5 },
    { sector: "Mobilité Durable", score: 3.7, companies: 5, trend: "up", emissions: 123.4 },
    { sector: "Construction Écologique", score: 3.5, companies: 7, trend: "stable", emissions: 189.3 },
    { sector: "Cosmétiques & Hygiène", score: 3.4, companies: 3, trend: "up", emissions: 156.3 },
  ]

  // Certifications
  const certificationData = [
    { name: "Ecolabel", count: 12, percentage: 24, color: "bg-green-500" },
    { name: "B-Corp", count: 8, percentage: 16, color: "bg-blue-500" },
    { name: "ISO 14001", count: 15, percentage: 30, color: "bg-purple-500" },
    { name: "RGE", count: 6, percentage: 12, color: "bg-orange-500" },
    { name: "Eco-organisme", count: 18, percentage: 36, color: "bg-teal-500" },
    { name: "Économie Circulaire", count: 10, percentage: 20, color: "bg-pink-500" },
  ]

  // Top performers
  const topPerformers = [
    {
      name: "GREEN ENERGY FRANCE",
      sector: "Énergies Renouvelables",
      score: 5.0,
      emissions: 45.8,
      certifications: ["Ecolabel", "B-Corp", "ISO 14001"],
    },
    {
      name: "ECOTECH SOLUTIONS",
      sector: "Technologies Vertes",
      score: 4.0,
      emissions: 89.2,
      certifications: ["B-Corp", "ISO 14001"],
    },
    {
      name: "HYGIENE & NATURE",
      sector: "Cosmétiques Écologiques",
      score: 4.0,
      emissions: 156.3,
      certifications: ["Ecolabel", "B-Corp"],
    },
  ]

  // Répartition géographique
  const regionData = [
    { region: "Île-de-France", companies: 8, avgScore: 3.6 },
    { region: "Auvergne-Rhône-Alpes", companies: 6, avgScore: 3.8 },
    { region: "Provence-Alpes-Côte d'Azur", companies: 5, avgScore: 4.2 },
    { region: "Bourgogne-Franche-Comté", companies: 4, avgScore: 3.2 },
    { region: "Bretagne", companies: 3, avgScore: 3.9 },
    { region: "Autres", companies: 24, avgScore: 3.4 },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-4 h-4 text-green-600" />
      case "down":
        return <ArrowDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
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
                <p className="text-sm text-gray-600">Dashboard</p>
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
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">50+</div>
                  <div className="text-xs text-gray-600">Entreprises</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">15+</div>
                  <div className="text-xs text-gray-600">Secteurs</div>
                </div>
              </div>
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">Dashboard Pro</Badge>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 px-6 bg-white shadow-sm">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-3 flex-1">
              <h1 className="font-bold text-lg text-gray-900">Dashboard ESG</h1>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                ✓ Mis à jour
              </Badge>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-8">
            {/* KPIs principaux */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mainKPIs.map((kpi, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${kpi.bgColor} opacity-50`}></div>
                  <CardContent className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${kpi.color} text-white shadow-lg`}>
                        {kpi.icon}
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(kpi.trend)}`}>
                        {getTrendIcon(kpi.trend)}
                        {kpi.change}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs pour différentes vues */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="sectors">Secteurs</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
                <TabsTrigger value="geography">Géographie</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Performance par secteur */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        Performance par Secteur
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {sectorPerformance.slice(0, 5).map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900">{item.sector}</span>
                                <Badge variant="outline" className="text-xs">
                                  {item.companies} entreprises
                                </Badge>
                                {getTrendIcon(item.trend)}
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                                  style={{ width: `${(item.score / 5) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="ml-4 text-right">
                              <div className="font-bold text-lg">{item.score}</div>
                              <div className="text-xs text-gray-500">/ 5</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Performers */}
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-600" />
                        Top Performers ESG
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topPerformers.map((company, index) => (
                          <div
                            key={index}
                            className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-bold text-gray-900 mb-1">{company.name}</h4>
                                <p className="text-sm text-gray-600">{company.sector}</p>
                              </div>
                              <Badge className="bg-green-100 text-green-800">{company.score}/5</Badge>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm text-gray-600">Émissions:</span>
                              <span className="text-sm font-medium">{company.emissions} tCO2</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {company.certifications.map((cert, certIndex) => (
                                <Badge key={certIndex} variant="outline" className="text-xs">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sectors" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Factory className="w-5 h-5 text-purple-600" />
                      Analyse Détaillée par Secteur
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {sectorPerformance.map((sector, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-gray-900">{sector.sector}</h4>
                            <div className="flex items-center gap-1">
                              {getTrendIcon(sector.trend)}
                              <Badge className="bg-blue-100 text-blue-800">{sector.score}/5</Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Entreprises:</span>
                              <span className="font-medium">{sector.companies}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Émissions moyennes:</span>
                              <span className="font-medium">{sector.emissions} tCO2</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                                style={{ width: `${(sector.score / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-600" />
                      Répartition des Certifications ESG
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {certificationData.map((cert, index) => (
                        <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                          <div
                            className={`w-16 h-16 ${cert.color} rounded-full mx-auto mb-4 flex items-center justify-center`}
                          >
                            <Award className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900 mb-1">{cert.count}</div>
                          <div className="text-sm font-medium text-gray-700 mb-2">{cert.name}</div>
                          <div className="text-xs text-gray-500">{cert.percentage}% des entreprises</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                            <div
                              className={`${cert.color} h-2 rounded-full`}
                              style={{ width: `${cert.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="geography" className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-orange-600" />
                      Répartition Géographique
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {regionData.map((region, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-medium text-gray-900">{region.region}</span>
                              <Badge variant="outline" className="text-xs">
                                {region.companies} entreprises
                              </Badge>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                                style={{ width: `${(region.avgScore / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="ml-4 text-right">
                            <div className="font-bold text-lg">{region.avgScore}</div>
                            <div className="text-xs text-gray-500">Score moyen</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
