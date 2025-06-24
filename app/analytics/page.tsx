"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  Home,
  MessageSquare,
  Database,
  Leaf,
  TrendingUp,
  TrendingDown,
  Award,
  Users,
  Globe,
  Factory,
  TreePine,
  Target,
  PieChart,
  Activity,
  Download,
} from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState("overview")

  // Navigation items
  const navigationItems = [
    { title: "Accueil", icon: Home, href: "/" },
    { title: "Chatbot IA", icon: MessageSquare, href: "/chat" },
    { title: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { title: "Entreprises", icon: Building2, href: "/companies" },
    { title: "Analytics", icon: Database, href: "/analytics", active: true },
  ]

  // Données d'analyse
  const sectorAnalysis = [
    {
      sector: "Énergies Renouvelables",
      companies: 8,
      avgScore: 4.2,
      avgEmissions: 45.8,
      totalRevenue: 125000000,
      trend: "up",
      growth: "+15%",
    },
    {
      sector: "Technologies Vertes",
      companies: 6,
      avgScore: 4.0,
      avgEmissions: 67.3,
      totalRevenue: 89000000,
      trend: "up",
      growth: "+22%",
    },
    {
      sector: "Agriculture Durable",
      companies: 4,
      avgScore: 3.8,
      avgEmissions: 78.5,
      totalRevenue: 45000000,
      trend: "stable",
      growth: "+5%",
    },
    {
      sector: "Construction Écologique",
      companies: 7,
      avgScore: 3.5,
      avgEmissions: 189.3,
      totalRevenue: 78000000,
      trend: "up",
      growth: "+8%",
    },
    {
      sector: "Transport & Logistique",
      companies: 5,
      avgScore: 3.0,
      avgEmissions: 234.6,
      totalRevenue: 67000000,
      trend: "down",
      growth: "-3%",
    },
  ]

  const regionAnalysis = [
    {
      region: "Île-de-France",
      companies: 8,
      avgScore: 3.6,
      totalEmployees: 245,
      avgRevenue: 6200000,
    },
    {
      region: "Auvergne-Rhône-Alpes",
      companies: 6,
      avgScore: 3.8,
      totalEmployees: 189,
      avgRevenue: 5800000,
    },
    {
      region: "Provence-Alpes-Côte d'Azur",
      companies: 5,
      avgScore: 4.2,
      totalEmployees: 156,
      avgRevenue: 8900000,
    },
    {
      region: "Bourgogne-Franche-Comté",
      companies: 4,
      avgScore: 3.2,
      totalEmployees: 98,
      avgRevenue: 3400000,
    },
  ]

  const certificationAnalysis = [
    { name: "Ecolabel", companies: 12, percentage: 24, impact: "Très élevé" },
    { name: "B-Corp", companies: 8, percentage: 16, impact: "Élevé" },
    { name: "ISO 14001", companies: 15, percentage: 30, impact: "Élevé" },
    { name: "RGE", companies: 6, percentage: 12, impact: "Moyen" },
    { name: "Eco-organisme", companies: 18, percentage: 36, impact: "Moyen" },
    { name: "Économie Circulaire", companies: 10, percentage: 20, impact: "Élevé" },
  ]

  const parityAnalysis = [
    {
      sector: "Technologies Vertes",
      avgHommes: 52.0,
      avgFemmes: 48.0,
      parityScore: 92,
      companies: 6,
    },
    {
      sector: "Cosmétiques & Hygiène",
      avgHommes: 45.0,
      avgFemmes: 55.0,
      parityScore: 82,
      companies: 3,
    },
    {
      sector: "Agriculture Durable",
      avgHommes: 60.0,
      avgFemmes: 40.0,
      parityScore: 67,
      companies: 4,
    },
    {
      sector: "Construction Écologique",
      avgHommes: 78.0,
      avgFemmes: 22.0,
      parityScore: 28,
      companies: 7,
    },
    {
      sector: "Transport & Logistique",
      avgHommes: 70.0,
      avgFemmes: 30.0,
      parityScore: 43,
      companies: 5,
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
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

  const getParityColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000000) {
      return `${(revenue / 1000000).toFixed(1)}M€`
    }
    return `${(revenue / 1000).toFixed(0)}k€`
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
                <p className="text-sm text-gray-600">Analyses avancées</p>
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

            {/* Types d'analyses */}
            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wide">
                Types d'Analyses
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {[
                    { id: "overview", title: "Vue d'ensemble", icon: PieChart },
                    { id: "sectors", title: "Analyse sectorielle", icon: Factory },
                    { id: "regions", title: "Analyse régionale", icon: Globe },
                    { id: "certifications", title: "Certifications", icon: Award },
                    { id: "parity", title: "Parité & Gouvernance", icon: Users },
                  ].map((analysis) => (
                    <SidebarMenuItem key={analysis.id}>
                      <SidebarMenuButton
                        onClick={() => setSelectedAnalysis(analysis.id)}
                        isActive={selectedAnalysis === analysis.id}
                        className={`w-full p-3 rounded-lg transition-all duration-200 ${
                          selectedAnalysis === analysis.id
                            ? "bg-purple-50 border border-purple-200 text-purple-700 shadow-sm"
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <analysis.icon
                            className={`w-4 h-4 ${
                              selectedAnalysis === analysis.id ? "text-purple-600" : "text-gray-500"
                            }`}
                          />
                          <span className="font-medium text-sm">{analysis.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Exporter rapport
              </Button>
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">Analytics Pro</Badge>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 px-6 bg-white shadow-sm">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-3 flex-1">
              <h1 className="font-bold text-lg text-gray-900">Analytics ESG Avancées</h1>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">
                Analyses en temps réel
              </Badge>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-8">
            {selectedAnalysis === "overview" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="p-6 text-center">
                      <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-blue-900 mb-1">50+</div>
                      <div className="text-sm text-blue-700">Entreprises analysées</div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-green-900 mb-1">3.4</div>
                      <div className="text-sm text-green-700">Score ESG moyen</div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardContent className="p-6 text-center">
                      <Award className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-purple-900 mb-1">38</div>
                      <div className="text-sm text-purple-700">Certifications ESG</div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                    <CardContent className="p-6 text-center">
                      <TreePine className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-orange-900 mb-1">156</div>
                      <div className="text-sm text-orange-700">tCO2 émissions moy.</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      Synthèse Exécutive
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Points Forts</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Score ESG moyen en progression (+0.3 points)
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Forte adoption des certifications (76% des entreprises)
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Secteur énergies renouvelables en tête (4.2/5)
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Axes d'Amélioration</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            Parité hommes-femmes dans la construction
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            Émissions élevées dans le transport
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            Adoption limitée des certifications B-Corp
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedAnalysis === "sectors" && (
              <div className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Factory className="w-5 h-5 text-purple-600" />
                      Analyse Sectorielle Détaillée
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {sectorAnalysis.map((sector, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-gray-900">{sector.sector}</h4>
                            <div className="flex items-center gap-2">
                              {getTrendIcon(sector.trend)}
                              <span className={`text-sm font-medium ${getTrendColor(sector.trend)}`}>
                                {sector.growth}
                              </span>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{sector.companies}</div>
                              <div className="text-xs text-gray-600">Entreprises</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{sector.avgScore}</div>
                              <div className="text-xs text-gray-600">Score ESG moyen</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600">{sector.avgEmissions}</div>
                              <div className="text-xs text-gray-600">tCO2 moyen</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">
                                {formatRevenue(sector.totalRevenue)}
                              </div>
                              <div className="text-xs text-gray-600">CA total</div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                                style={{ width: `${(sector.avgScore / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedAnalysis === "regions" && (
              <div className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-orange-600" />
                      Analyse Régionale
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {regionAnalysis.map((region, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <h4 className="font-bold text-gray-900 mb-3">{region.region}</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Entreprises:</span>
                              <span className="text-sm font-medium">{region.companies}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Score ESG moyen:</span>
                              <span className="text-sm font-medium">{region.avgScore}/5</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Total employés:</span>
                              <span className="text-sm font-medium">{region.totalEmployees}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">CA moyen:</span>
                              <span className="text-sm font-medium">{formatRevenue(region.avgRevenue)}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                                style={{ width: `${(region.avgScore / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedAnalysis === "certifications" && (
              <div className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-600" />
                      Analyse des Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {certificationAnalysis.map((cert, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-center">
                          <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                          <h4 className="font-bold text-gray-900 mb-2">{cert.name}</h4>
                          <div className="space-y-2">
                            <div className="text-2xl font-bold text-green-600">{cert.companies}</div>
                            <div className="text-sm text-gray-600">entreprises ({cert.percentage}%)</div>
                            <Badge
                              className={`${
                                cert.impact === "Très élevé"
                                  ? "bg-green-100 text-green-800"
                                  : cert.impact === "Élevé"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              Impact {cert.impact}
                            </Badge>
                          </div>
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${cert.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedAnalysis === "parity" && (
              <div className="space-y-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-pink-600" />
                      Analyse Parité & Gouvernance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {parityAnalysis.map((sector, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-gray-900">{sector.sector}</h4>
                            <Badge className={getParityColor(sector.parityScore)}>
                              Score: {sector.parityScore}/100
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{sector.avgHommes}%</div>
                              <div className="text-xs text-gray-600">Cadres Hommes</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-pink-600">{sector.avgFemmes}%</div>
                              <div className="text-xs text-gray-600">Cadres Femmes</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-600">{sector.companies}</div>
                              <div className="text-xs text-gray-600">Entreprises</div>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${sector.avgHommes}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-pink-500 h-2 rounded-full"
                                  style={{ width: `${sector.avgFemmes}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
