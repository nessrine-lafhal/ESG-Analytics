"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Search,
  Filter,
  MapPin,
  Users,
  TrendingUp,
  Award,
  Factory,
  Zap,
  TreePine,
} from "lucide-react"
import Link from "next/link"

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")

  // Navigation items
  const navigationItems = [
    { title: "Accueil", icon: Home, href: "/" },
    { title: "Chatbot IA", icon: MessageSquare, href: "/chat" },
    { title: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { title: "Entreprises", icon: Building2, href: "/companies", active: true },
    { title: "Analytics", icon: Database, href: "/analytics" },
  ]

  // Dataset d'entreprises
  const companies = [
    {
      id: 1,
      name: "GREEN ENERGY FRANCE",
      sector: "Énergies Renouvelables",
      region: "Provence-Alpes-Côte d'Azur",
      city: "Marseille",
      employees: 180,
      revenue: 25000000,
      esgScore: 5.0,
      emissions: 45.8,
      certifications: ["Ecolabel", "B-Corp", "ISO 14001", "RGE"],
      category: "ETI",
      description: "Production d'énergie renouvelable - Éolien offshore",
    },
    {
      id: 2,
      name: "ECOTECH SOLUTIONS",
      sector: "Technologies Vertes",
      region: "Auvergne-Rhône-Alpes",
      city: "Lyon",
      employees: 42,
      revenue: 5600000,
      esgScore: 4.0,
      emissions: 89.2,
      certifications: ["B-Corp", "ISO 14001"],
      category: "PME",
      description: "Conseil en technologies environnementales",
    },
    {
      id: 3,
      name: "HYGIENE & NATURE",
      sector: "Cosmétiques & Hygiène",
      region: "Bourgogne-Franche-Comté",
      city: "Longvic",
      employees: 32,
      revenue: 3200000,
      esgScore: 4.0,
      emissions: 156.3,
      certifications: ["Ecolabel", "B-Corp", "ISO 14001"],
      category: "PME",
      description: "Fabrication de savons et détergents écologiques",
    },
    {
      id: 4,
      name: "SUSTAINABLE FASHION",
      sector: "Textile Durable",
      region: "Île-de-France",
      city: "Paris",
      employees: 35,
      revenue: 4200000,
      esgScore: 4.0,
      emissions: 123.4,
      certifications: ["Ecolabel", "B-Corp", "ISO 14001"],
      category: "PME",
      description: "Fabrication de vêtements éco-responsables",
    },
    {
      id: 5,
      name: "BIO AGRICULTURE OUEST",
      sector: "Agriculture Durable",
      region: "Bretagne",
      city: "Rennes",
      employees: 28,
      revenue: 3800000,
      esgScore: 4.0,
      emissions: 78.5,
      certifications: ["Ecolabel", "ISO 14001"],
      category: "PME",
      description: "Agriculture biologique et distribution",
    },
    {
      id: 6,
      name: "TRANSPORT VERT",
      sector: "Transport & Logistique",
      region: "Grand Est",
      city: "Strasbourg",
      employees: 95,
      revenue: 12000000,
      esgScore: 3.0,
      emissions: 234.6,
      certifications: ["ISO 14001"],
      category: "ETI",
      description: "Transport et logistique verte",
    },
    {
      id: 7,
      name: "CONSTRUCTION DURABLE",
      sector: "Construction Écologique",
      region: "Hauts-de-France",
      city: "Lille",
      employees: 52,
      revenue: 6300000,
      esgScore: 4.0,
      emissions: 189.3,
      certifications: ["Ecolabel", "B-Corp", "ISO 14001", "RGE"],
      category: "PME",
      description: "Construction écologique et rénovation",
    },
    {
      id: 8,
      name: "TECH FOR PLANET",
      sector: "Tech Environnementale",
      region: "Île-de-France",
      city: "Paris",
      employees: 65,
      revenue: 7800000,
      esgScore: 4.0,
      emissions: 67.8,
      certifications: ["B-Corp", "ISO 14001"],
      category: "PME",
      description: "Solutions numériques pour l'environnement",
    },
  ]

  // Filtres
  const sectors = ["all", ...new Set(companies.map((c) => c.sector))]
  const regions = ["all", ...new Set(companies.map((c) => c.region))]

  // Filtrage des entreprises
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSector = selectedSector === "all" || company.sector === selectedSector
    const matchesRegion = selectedRegion === "all" || company.region === selectedRegion

    return matchesSearch && matchesSector && matchesRegion
  })

  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000000) {
      return `${(revenue / 1000000).toFixed(1)}M€`
    }
    return `${(revenue / 1000).toFixed(0)}k€`
  }

  const getScoreColor = (score: number) => {
    if (score >= 4.0) return "bg-green-100 text-green-800"
    if (score >= 3.0) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "GE":
        return "bg-purple-100 text-purple-800"
      case "ETI":
        return "bg-blue-100 text-blue-800"
      case "PME":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
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
                <p className="text-sm text-gray-600">Base de données</p>
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

            {/* Filtres */}
            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-gray-900 font-bold mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtres
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Secteur</label>
                    <select
                      value={selectedSector}
                      onChange={(e) => setSelectedSector(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {sectors.map((sector) => (
                        <option key={sector} value={sector}>
                          {sector === "all" ? "Tous les secteurs" : sector}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Région</label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region === "all" ? "Toutes les régions" : region}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{filteredCompanies.length}</div>
                  <div className="text-xs text-gray-600">Entreprises</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{sectors.length - 1}</div>
                  <div className="text-xs text-gray-600">Secteurs</div>
                </div>
              </div>
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">
                  Base de données
                </Badge>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 px-6 bg-white shadow-sm">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-3 flex-1">
              <h1 className="font-bold text-lg text-gray-900">Base de Données Entreprises</h1>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                {filteredCompanies.length} résultats
              </Badge>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            {/* Barre de recherche */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Rechercher une entreprise..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-300 rounded-xl focus:border-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Liste des entreprises */}
            <div className="grid gap-6">
              {filteredCompanies.map((company) => (
                <Card key={company.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                          <Badge className={getCategoryColor(company.category)}>{company.category}</Badge>
                          <Badge className={getScoreColor(company.esgScore)}>{company.esgScore}/5 ESG</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{company.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Factory className="w-4 h-4" />
                            {company.sector}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {company.city}, {company.region}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {company.employees} employés
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Métriques financières */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          Financier
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Chiffre d'affaires:</span>
                            <span className="text-sm font-medium">{formatRevenue(company.revenue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Effectif:</span>
                            <span className="text-sm font-medium">{company.employees}</span>
                          </div>
                        </div>
                      </div>

                      {/* Métriques ESG */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <TreePine className="w-4 h-4 text-green-600" />
                          Environnement
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Score ESG:</span>
                            <span className="text-sm font-medium">{company.esgScore}/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Émissions:</span>
                            <span className="text-sm font-medium">{company.emissions} tCO2</span>
                          </div>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-600" />
                          Certifications
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {company.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Performance ESG:{" "}
                            {company.esgScore >= 4 ? "Excellente" : company.esgScore >= 3 ? "Bonne" : "À améliorer"}
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <Card className="shadow-lg border-0">
                <CardContent className="p-12 text-center">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune entreprise trouvée</h3>
                  <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche ou vos filtres.</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedSector("all")
                      setSelectedRegion("all")
                    }}
                    variant="outline"
                  >
                    Réinitialiser les filtres
                  </Button>
                </CardContent>
              </Card>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
