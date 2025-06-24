import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from "zod"

export const maxDuration = 30

// Dataset ESG complet et professionnel
const esgDataset = {
  companies: [
    {
      siren: "015851793",
      siret: "01585179300016",
      raison_social: "DORAS CHENOVE",
      activite_entreprise: "Commerce de gros de matériaux de construction",
      denomination_unite_legale: "DORAS CHENOVE",
      categorie_entreprise: "PME",
      adresse: "6 Rue Antoine Becquerel, 21300 Chenôve",
      region: "Bourgogne-Franche-Comté",
      departement: "Côte-d'Or",
      commune: "Chenôve",
      chiffre_affaires: 2500000,
      effectif: 25,
      score_engagement_environnemental: 3,
      pourcentage_cadre_hommes: 65.0,
      pourcentage_cadre_femmes: 35.0,
      total_emissions_ges: 245.7,
      isEcolabelCertified: false,
      isAdherantEcoOrganisme: true,
      isActeurEconomieCirculaire: true,
      isRGE: false,
      isBCorpCertified: false,
      isISO14001: true,
      secteur: "Construction",
      date_creation: "2010-03-15",
      innovations: ["Matériaux biosourcés", "Logistique verte"],
      objectifs_2030: "Réduction 30% émissions GES",
    },
    {
      siren: "017150103",
      siret: "01715010300046",
      raison_social: "HYGIENE & NATURE",
      activite_entreprise: "Fabrication de savons et détergents écologiques",
      denomination_unite_legale: "HYGIENE & NATURE",
      categorie_entreprise: "PME",
      adresse: "12 Boulevard Eiffel, 21600 Longvic",
      region: "Bourgogne-Franche-Comté",
      departement: "Côte-d'Or",
      commune: "Longvic",
      chiffre_affaires: 3200000,
      effectif: 32,
      score_engagement_environnemental: 4,
      pourcentage_cadre_hommes: 45.0,
      pourcentage_cadre_femmes: 55.0,
      total_emissions_ges: 156.3,
      isEcolabelCertified: true,
      isAdherantEcoOrganisme: true,
      isActeurEconomieCirculaire: false,
      isRGE: false,
      isBCorpCertified: true,
      isISO14001: true,
      secteur: "Cosmétiques & Hygiène",
      date_creation: "2008-05-20",
      innovations: ["Formules 100% naturelles", "Emballages compostables"],
      objectifs_2030: "Zéro déchet, 100% renouvelable",
    },
    {
      siren: "018234567",
      siret: "01823456700025",
      raison_social: "ECOTECH SOLUTIONS",
      activite_entreprise: "Conseil en technologies environnementales",
      denomination_unite_legale: "ECOTECH SOLUTIONS",
      categorie_entreprise: "PME",
      adresse: "45 Avenue de la République, 69001 Lyon",
      region: "Auvergne-Rhône-Alpes",
      departement: "Rhône",
      commune: "Lyon",
      chiffre_affaires: 5600000,
      effectif: 42,
      score_engagement_environnemental: 4,
      pourcentage_cadre_hommes: 52.0,
      pourcentage_cadre_femmes: 48.0,
      total_emissions_ges: 89.2,
      isEcolabelCertified: true,
      isAdherantEcoOrganisme: true,
      isActeurEconomieCirculaire: true,
      isRGE: false,
      isBCorpCertified: true,
      isISO14001: true,
      secteur: "Technologies Vertes",
      date_creation: "2015-01-12",
      innovations: ["IA pour optimisation énergétique", "Blockchain carbone"],
      objectifs_2030: "Neutralité carbone, 1000 clients accompagnés",
    },
    {
      siren: "019876543",
      siret: "01987654300018",
      raison_social: "GREEN ENERGY FRANCE",
      activite_entreprise: "Production d'énergie renouvelable",
      denomination_unite_legale: "GREEN ENERGY FRANCE",
      categorie_entreprise: "ETI",
      adresse: "123 Rue de la Paix, 13001 Marseille",
      region: "Provence-Alpes-Côte d'Azur",
      departement: "Bouches-du-Rhône",
      commune: "Marseille",
      chiffre_affaires: 25000000,
      effectif: 180,
      score_engagement_environnemental: 5,
      pourcentage_cadre_hommes: 58.0,
      pourcentage_cadre_femmes: 42.0,
      total_emissions_ges: 45.8,
      isEcolabelCertified: true,
      isAdherantEcoOrganisme: true,
      isActeurEconomieCirculaire: true,
      isRGE: true,
      isBCorpCertified: true,
      isISO14001: true,
      secteur: "Énergies Renouvelables",
      date_creation: "2011-06-08",
      innovations: ["Éolien offshore flottant", "Stockage hydrogène"],
      objectifs_2030: "2 GW installés, expansion européenne",
    },
    {
      siren: "020456789",
      siret: "02045678900031",
      raison_social: "SUSTAINABLE FASHION",
      activite_entreprise: "Fabrication de vêtements éco-responsables",
      denomination_unite_legale: "SUSTAINABLE FASHION",
      categorie_entreprise: "PME",
      adresse: "78 Boulevard Saint-Germain, 75006 Paris",
      region: "Île-de-France",
      departement: "Paris",
      commune: "Paris",
      chiffre_affaires: 4200000,
      effectif: 35,
      score_engagement_environnemental: 4,
      pourcentage_cadre_hommes: 35.0,
      pourcentage_cadre_femmes: 65.0,
      total_emissions_ges: 123.4,
      isEcolabelCertified: true,
      isAdherantEcoOrganisme: false,
      isActeurEconomieCirculaire: true,
      isRGE: false,
      isBCorpCertified: true,
      isISO14001: true,
      secteur: "Textile Durable",
      date_creation: "2016-11-25",
      innovations: ["Fibres recyclées", "Teintures végétales"],
      objectifs_2030: "Mode circulaire, traçabilité blockchain",
    },
    {
      siren: "021654321",
      siret: "02165432100044",
      raison_social: "BIO AGRICULTURE OUEST",
      activite_entreprise: "Agriculture biologique et distribution",
      denomination_unite_legale: "BIO AGRICULTURE OUEST",
      categorie_entreprise: "PME",
      adresse: "156 Route de Nantes, 35000 Rennes",
      region: "Bretagne",
      departement: "Ille-et-Vilaine",
      commune: "Rennes",
      chiffre_affaires: 3800000,
      effectif: 28,
      score_engagement_environnemental: 4,
      pourcentage_cadre_hommes: 60.0,
      pourcentage_cadre_femmes: 40.0,
      total_emissions_ges: 78.5,
      isEcolabelCertified: true,
      isAdherantEcoOrganisme: true,
      isActeurEconomieCirculaire: true,
      isRGE: false,
      isBCorpCertified: false,
      isISO14001: true,
      secteur: "Agriculture Durable",
      date_creation: "2013-04-18",
      innovations: ["Agriculture de précision", "Circuits courts"],
      objectifs_2030: "1000 ha bio, zéro pesticide",
    },
    {
      siren: "022987654",
      siret: "02298765400037",
      raison_social: "RECYCL'INNOV",
      activite_entreprise: "Recyclage et valorisation des déchets",
      denomination_unite_legale: "RECYCL'INNOV",
      categorie_entreprise: "PME",
      adresse: "89 Rue du Commerce, 31000 Toulouse",
      region: "Occitanie",
      departement: "Haute-Garonne",
      commune: "Toulouse",
      chiffre_affaires: 4700000,
      effectif: 38,
      score_engagement_environnemental: 4,
      pourcentage_cadre_hommes: 55.0,
      pourcentage_cadre_femmes: 45.0,
      total_emissions_ges: 134.2,
      isEcolabelCertified: false,
      isAdherantEcoOrganisme: true,
      isActeurEconomieCirculaire: true,
      isRGE: false,
      isBCorpCertified: true,
      isISO14001: true,
      secteur: "Économie Circulaire",
      date_creation: "2014-08-22",
      innovations: ["Tri robotisé", "Plastique chimique recyclé"],
      objectifs_2030: "95% valorisation, expansion nationale",
    },
    {
      siren: "023456789",
      siret: "02345678900062",
      raison_social: "TRANSPORT VERT",
      activite_entreprise: "Transport et logistique verte",
      denomination_unite_legale: "TRANSPORT VERT",
      categorie_entreprise: "ETI",
      adresse: "234 Avenue des Champs, 67000 Strasbourg",
      region: "Grand Est",
      departement: "Bas-Rhin",
      commune: "Strasbourg",
      chiffre_affaires: 12000000,
      effectif: 95,
      score_engagement_environnemental: 3,
      pourcentage_cadre_hommes: 70.0,
      pourcentage_cadre_femmes: 30.0,
      total_emissions_ges: 234.6,
      isEcolabelCertified: false,
      isAdherantEcoOrganisme: true,
      isActeurEconomieCirculaire: true,
      isRGE: false,
      isBCorpCertified: false,
      isISO14001: true,
      secteur: "Transport & Logistique",
      date_creation: "2009-12-03",
      innovations: ["Flotte électrique", "Optimisation IA des tournées"],
      objectifs_2030: "100% véhicules propres, -50% émissions",
    },
  ],

  // Méthodes d'analyse
  getStatistics() {
    const companies = this.companies
    const totalCompanies = companies.length
    const avgScore = companies.reduce((sum, c) => sum + c.score_engagement_environnemental, 0) / totalCompanies
    const avgEmissions = companies.reduce((sum, c) => sum + c.total_emissions_ges, 0) / totalCompanies

    return {
      totalCompanies,
      avgScore: Math.round(avgScore * 100) / 100,
      avgEmissions: Math.round(avgEmissions * 10) / 10,
      sectors: [...new Set(companies.map((c) => c.secteur))],
      regions: [...new Set(companies.map((c) => c.region))],
      certifications: {
        ecolabel: companies.filter((c) => c.isEcolabelCertified).length,
        bcorp: companies.filter((c) => c.isBCorpCertified).length,
        iso14001: companies.filter((c) => c.isISO14001).length,
        rge: companies.filter((c) => c.isRGE).length,
      },
    }
  },

  searchCompanies(query: string) {
    const searchTerm = query.toLowerCase()
    return this.companies.filter(
      (company) =>
        company.raison_social.toLowerCase().includes(searchTerm) ||
        company.secteur.toLowerCase().includes(searchTerm) ||
        company.region.toLowerCase().includes(searchTerm) ||
        company.activite_entreprise.toLowerCase().includes(searchTerm),
    )
  },

  getTopPerformers(limit = 10) {
    return this.companies
      .sort((a, b) => b.score_engagement_environnemental - a.score_engagement_environnemental)
      .slice(0, limit)
  },

  getCompaniesBySector(sector: string) {
    return this.companies.filter((c) => c.secteur.toLowerCase().includes(sector.toLowerCase()))
  },

  getCompaniesByRegion(region: string) {
    return this.companies.filter((c) => c.region.toLowerCase().includes(region.toLowerCase()))
  },

  getCompaniesByCertification(certification: string) {
    return this.companies.filter((company) => {
      switch (certification.toLowerCase()) {
        case "ecolabel":
          return company.isEcolabelCertified
        case "b-corp":
        case "bcorp":
          return company.isBCorpCertified
        case "iso14001":
        case "iso 14001":
          return company.isISO14001
        case "rge":
          return company.isRGE
        default:
          return false
      }
    })
  },

  analyzeSectorPerformance() {
    const sectorStats = this.companies.reduce(
      (acc, company) => {
        const secteur = company.secteur
        if (!acc[secteur]) {
          acc[secteur] = { count: 0, totalScore: 0, totalEmissions: 0, companies: [] }
        }
        acc[secteur].count++
        acc[secteur].totalScore += company.score_engagement_environnemental
        acc[secteur].totalEmissions += company.total_emissions_ges
        acc[secteur].companies.push(company.raison_social)
        return acc
      },
      {} as Record<string, any>,
    )

    Object.keys(sectorStats).forEach((secteur) => {
      sectorStats[secteur].avgScore =
        Math.round((sectorStats[secteur].totalScore / sectorStats[secteur].count) * 100) / 100
      sectorStats[secteur].avgEmissions =
        Math.round((sectorStats[secteur].totalEmissions / sectorStats[secteur].count) * 10) / 10
    })

    return sectorStats
  },

  analyzeParityBySector() {
    const sectorParity = this.companies.reduce(
      (acc, company) => {
        const secteur = company.secteur
        if (!acc[secteur]) {
          acc[secteur] = {
            companies: [],
            totalCadreHommes: 0,
            totalCadreFemmes: 0,
            count: 0,
          }
        }
        acc[secteur].companies.push(company.raison_social)
        acc[secteur].totalCadreHommes += company.pourcentage_cadre_hommes
        acc[secteur].totalCadreFemmes += company.pourcentage_cadre_femmes
        acc[secteur].count++
        return acc
      },
      {} as Record<string, any>,
    )

    Object.keys(sectorParity).forEach((secteur) => {
      const data = sectorParity[secteur]
      data.avgCadreHommes = Math.round((data.totalCadreHommes / data.count) * 10) / 10
      data.avgCadreFemmes = Math.round((data.totalCadreFemmes / data.count) * 10) / 10
      data.parityScore = Math.round(
        (Math.min(data.avgCadreHommes, data.avgCadreFemmes) / Math.max(data.avgCadreHommes, data.avgCadreFemmes)) * 100,
      )
    })

    return sectorParity
  },
}

// Fonction pour créer une réponse formatée en streaming
function createFormattedResponse(content: string) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      // Simuler un streaming progressif
      const chunks = content.split("\n")
      let index = 0

      const sendChunk = () => {
        if (index < chunks.length) {
          controller.enqueue(encoder.encode(chunks[index] + "\n"))
          index++
          setTimeout(sendChunk, 50) // Délai pour simuler le streaming
        } else {
          controller.close()
        }
      }

      sendChunk()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ""

    // Fallback si pas de clé OpenAI - Réponses intelligentes basées sur les questions
    if (!process.env.OPENAI_API_KEY) {
      const stats = esgDataset.getStatistics()
      let response = ""

      // Analyse intelligente de la question pour donner une réponse appropriée
      if (lastMessage.includes("aperçu") || lastMessage.includes("overview") || lastMessage.includes("général")) {
        response = `# 📊 Aperçu Complet du Dataset ESG

## Statistiques Générales
• **${stats.totalCompanies} entreprises** analysées dans notre base de données
• **Score ESG moyen** : ${stats.avgScore}/5 ⭐
• **Émissions moyennes** : ${stats.avgEmissions} tonnes CO2/an 🌱
• **${stats.regions.length} régions** françaises couvertes 🗺️

## 🏢 Répartition par Secteur
${stats.sectors.map((sector, index) => `${index + 1}. **${sector}**`).join("\n")}

## 🏆 Certifications ESG
• **${stats.certifications.ecolabel}** entreprises certifiées Ecolabel
• **${stats.certifications.bcorp}** entreprises B-Corp
• **${stats.certifications.iso14001}** certifications ISO 14001
• **${stats.certifications.rge}** labels RGE

## 💡 Questions que vous pouvez poser :
• "Quelles sont les meilleures entreprises ESG ?"
• "Analyse le secteur des énergies renouvelables"
• "Entreprises avec les plus faibles émissions"
• "Parité hommes-femmes par secteur"
• "Innovations dans les technologies vertes"`
      } else if (
        lastMessage.includes("top") ||
        lastMessage.includes("meilleur") ||
        lastMessage.includes("classement")
      ) {
        const topCompanies = esgDataset.getTopPerformers(5)
        response = `# 🏆 Top 5 des Entreprises ESG

${topCompanies
  .map(
    (company, index) => `## ${index + 1}. ${company.raison_social}
• **Secteur** : ${company.secteur}
• **Score ESG** : ${company.score_engagement_environnemental}/5 ⭐
• **Région** : ${company.region}
• **Émissions** : ${company.total_emissions_ges} tonnes CO2/an
• **Innovations** : ${company.innovations.join(", ")}
• **Objectifs 2030** : ${company.objectifs_2030}
`,
  )
  .join("\n")}

## 💡 Autres analyses disponibles :
• "Analyse sectorielle détaillée"
• "Entreprises par région"
• "Certifications par secteur"
• "Innovations par domaine"`
      } else if (lastMessage.includes("secteur") || lastMessage.includes("domaine")) {
        const sectorStats = esgDataset.analyzeSectorPerformance()
        response = `# 📈 Analyse Sectorielle ESG

${Object.entries(sectorStats)
  .sort(([, a]: any, [, b]: any) => b.avgScore - a.avgScore)
  .map(
    ([sector, data]: any) => `## ${sector}
• **${data.count} entreprises** dans ce secteur
• **Score moyen** : ${data.avgScore}/5 ⭐
• **Émissions moyennes** : ${data.avgEmissions} tonnes CO2/an
• **Entreprises** : ${data.companies.slice(0, 3).join(", ")}${data.companies.length > 3 ? "..." : ""}
`,
  )
  .join("\n")}

## 💡 Analyses spécifiques disponibles :
• "Détails sur le secteur [nom du secteur]"
• "Comparaison entre secteurs"
• "Innovations par secteur"
• "Objectifs 2030 par domaine"`
      } else if (lastMessage.includes("émission") || lastMessage.includes("carbone") || lastMessage.includes("co2")) {
        const lowEmissionCompanies = esgDataset.companies
          .sort((a, b) => a.total_emissions_ges - b.total_emissions_ges)
          .slice(0, 5)

        response = `# 🌱 Analyse des Émissions GES

## Top 5 - Entreprises les Plus Vertueuses
${lowEmissionCompanies
  .map(
    (company, index) => `### ${index + 1}. ${company.raison_social}
• **Émissions** : ${company.total_emissions_ges} tonnes CO2/an 🌿
• **Secteur** : ${company.secteur}
• **Score ESG** : ${company.score_engagement_environnemental}/5
• **Innovations** : ${company.innovations.join(", ")}
`,
  )
  .join("\n")}

## 📊 Statistiques Globales
• **Émissions totales** : ${Math.round(esgDataset.companies.reduce((sum, c) => sum + c.total_emissions_ges, 0))} tonnes CO2/an
• **Moyenne** : ${stats.avgEmissions} tonnes CO2/an par entreprise
• **Meilleure performance** : ${Math.min(...esgDataset.companies.map((c) => c.total_emissions_ges))} tonnes CO2/an

## 💡 Analyses complémentaires :
• "Émissions par secteur d'activité"
• "Objectifs de réduction carbone"
• "Technologies de décarbonation"
• "Stratégies net zéro"`
      } else if (lastMessage.includes("parité") || lastMessage.includes("femme") || lastMessage.includes("égalité")) {
        const parityAnalysis = esgDataset.analyzeParityBySector()
        response = `# ⚖️ Analyse de la Parité Hommes-Femmes

## Parité par Secteur (Score de parité)
${Object.entries(parityAnalysis)
  .sort(([, a]: any, [, b]: any) => b.parityScore - a.parityScore)
  .map(
    ([sector, data]: any) => `### ${sector}
• **Score de parité** : ${data.parityScore}% 📊
• **Cadres hommes** : ${data.avgCadreHommes}%
• **Cadres femmes** : ${data.avgCadreFemmes}%
• **${data.count} entreprises** analysées
`,
  )
  .join("\n")}

## 🎯 Entreprises Modèles
${esgDataset.companies
  .sort(
    (a, b) =>
      Math.abs(a.pourcentage_cadre_hommes - a.pourcentage_cadre_femmes) -
      Math.abs(b.pourcentage_cadre_hommes - b.pourcentage_cadre_femmes),
  )
  .slice(0, 3)
  .map(
    (company) =>
      `• **${company.raison_social}** : ${company.pourcentage_cadre_hommes}% H / ${company.pourcentage_cadre_femmes}% F`,
  )
  .join("\n")}

## 💡 Analyses disponibles :
• "Gouvernance et diversité"
• "Évolution de la parité"
• "Bonnes pratiques RH"
• "Politiques d'inclusion"`
      } else if (lastMessage.includes("innovation") || lastMessage.includes("technologie")) {
        const innovativeCompanies = esgDataset.companies.filter((c) => c.innovations && c.innovations.length > 0)
        response = `# 💡 Innovations ESG

## Entreprises Innovantes
${innovativeCompanies
  .map(
    (company) => `### ${company.raison_social}
• **Secteur** : ${company.secteur}
• **Innovations** : ${company.innovations.join(", ")} 🚀
• **Objectifs 2030** : ${company.objectifs_2030}
• **Score ESG** : ${company.score_engagement_environnemental}/5
`,
  )
  .join("\n")}

## 🔬 Technologies Émergentes
• **IA & Optimisation** : ECOTECH SOLUTIONS, TRANSPORT VERT
• **Économie Circulaire** : RECYCL'INNOV
• **Énergies Renouvelables** : GREEN ENERGY FRANCE
• **Agriculture de Précision** : BIO AGRICULTURE OUEST
• **Matériaux Biosourcés** : DORAS CHENOVE

## 💡 Explorez plus :
• "Détails sur une innovation spécifique"
• "Tendances technologiques ESG"
• "Partenariats R&D"
• "Investissements verts"`
      } else if (lastMessage.includes("certification") || lastMessage.includes("label")) {
        response = `# 🏅 Certifications et Labels ESG

## Répartition des Certifications
• **Ecolabel** : ${stats.certifications.ecolabel} entreprises 🌿
• **B-Corp** : ${stats.certifications.bcorp} entreprises 🤝
• **ISO 14001** : ${stats.certifications.iso14001} entreprises 📋
• **RGE** : ${stats.certifications.rge} entreprises ⚡

## Entreprises Multi-Certifiées
${esgDataset.companies
  .map((c) => ({
    ...c,
    certCount: [c.isEcolabelCertified, c.isBCorpCertified, c.isISO14001, c.isRGE].filter(Boolean).length,
  }))
  .filter((c) => c.certCount > 2)
  .sort((a, b) => b.certCount - a.certCount)
  .map(
    (company) => `### ${company.raison_social}
• **${company.certCount} certifications** 🏆
• **Secteur** : ${company.secteur}
• **Labels** : ${[
      company.isEcolabelCertified && "Ecolabel",
      company.isBCorpCertified && "B-Corp",
      company.isISO14001 && "ISO 14001",
      company.isRGE && "RGE",
    ]
      .filter(Boolean)
      .join(", ")}
`,
  )
  .join("\n")}

## 💡 Analyses détaillées :
• "Processus de certification"
• "Avantages par label"
• "Coûts et bénéfices"
• "Tendances de certification"`
      } else {
        // Réponse par défaut avec suggestions
        response = `# 🤖 Assistant ESG IA

Bonjour ! Je suis votre assistant spécialisé en analyse ESG. 

## 📊 Dataset Disponible
• **${stats.totalCompanies} entreprises** françaises analysées
• **${stats.sectors.length} secteurs** d'activité couverts
• **Données complètes** : scores ESG, émissions, certifications, innovations

## 💬 Questions que vous pouvez me poser :

### 📈 **Analyses Générales**
• "Donne-moi un aperçu complet du dataset"
• "Quelles sont les statistiques générales ?"
• "Résumé des performances par secteur"

### 🏆 **Top Performers**
• "Quelles sont les 5 meilleures entreprises ESG ?"
• "Entreprises leaders en énergies renouvelables"
• "PME les plus performantes en développement durable"

### 🔍 **Recherches Spécifiques**
• "Entreprises dans le secteur [nom du secteur]"
• "Analyse de la région [nom de la région]"
• "Entreprises certifiées B-Corp"

### 🌱 **Environnement**
• "Entreprises avec les plus faibles émissions GES"
• "Innovations en technologies vertes"
• "Objectifs de réduction carbone"

### ⚖️ **Social & Gouvernance**
• "Analyse de la parité hommes-femmes"
• "Gouvernance et diversité par secteur"
• "Politiques d'inclusion"

### 🏅 **Certifications**
• "Entreprises certifiées Ecolabel"
• "Labels et certifications par secteur"
• "Processus de certification ESG"

## 🚀 **Pour des analyses IA avancées**
Ajoutez votre clé OPENAI_API_KEY pour bénéficier d'analyses plus poussées et personnalisées !

Posez-moi votre question et je vous fournirai une analyse détaillée ! 😊`
      }

      return createFormattedResponse(response)
    }

    // Configuration IA avec outils améliorés
    const result = streamText({
      model: openai("gpt-4o"),
      messages,
      tools: {
        getOverview: tool({
          description: "Obtenir un aperçu complet du dataset ESG",
          parameters: z.object({}),
          execute: async () => {
            const stats = esgDataset.getStatistics()
            return {
              success: true,
              data: stats,
              message: `Dataset professionnel avec ${stats.totalCompanies} entreprises analysées`,
            }
          },
        }),

        searchCompanies: tool({
          description: "Rechercher des entreprises par nom, secteur ou région",
          parameters: z.object({
            query: z.string().describe("Terme de recherche"),
          }),
          execute: async ({ query }) => {
            const results = esgDataset.searchCompanies(query)
            return {
              success: true,
              results: results.map((c) => ({
                nom: c.raison_social,
                secteur: c.secteur,
                region: c.region,
                score: c.score_engagement_environnemental,
                emissions: c.total_emissions_ges,
                certifications: {
                  ecolabel: c.isEcolabelCertified,
                  bcorp: c.isBCorpCertified,
                  iso14001: c.isISO14001,
                  rge: c.isRGE,
                },
                innovations: c.innovations,
              })),
              count: results.length,
              message: `${results.length} entreprise(s) trouvée(s) pour "${query}"`,
            }
          },
        }),

        getTopPerformers: tool({
          description: "Obtenir les meilleures entreprises ESG",
          parameters: z.object({
            limit: z.number().optional().describe("Nombre d'entreprises à retourner"),
            criteria: z
              .enum(["esg_score", "low_emissions", "certifications"])
              .optional()
              .describe("Critère de classement"),
          }),
          execute: async ({ limit = 5, criteria = "esg_score" }) => {
            let companies = []

            switch (criteria) {
              case "low_emissions":
                companies = esgDataset.companies.sort((a, b) => a.total_emissions_ges - b.total_emissions_ges)
                break
              case "certifications":
                companies = esgDataset.companies
                  .map((c) => ({
                    ...c,
                    certCount: [c.isEcolabelCertified, c.isBCorpCertified, c.isISO14001, c.isRGE].filter(Boolean)
                      .length,
                  }))
                  .sort((a, b) => b.certCount - a.certCount)
                break
              default:
                companies = esgDataset.getTopPerformers(limit)
            }

            return {
              success: true,
              topPerformers: companies.slice(0, limit).map((c) => ({
                nom: c.raison_social,
                secteur: c.secteur,
                region: c.region,
                score: c.score_engagement_environnemental,
                emissions: c.total_emissions_ges,
                innovations: c.innovations,
                objectifs_2030: c.objectifs_2030,
                certifications: {
                  ecolabel: c.isEcolabelCertified,
                  bcorp: c.isBCorpCertified,
                  iso14001: c.isISO14001,
                  rge: c.isRGE,
                },
              })),
              criteria,
              message: `Top ${limit} des entreprises selon le critère: ${criteria}`,
            }
          },
        }),

        analyzeSector: tool({
          description: "Analyser un secteur d'activité spécifique",
          parameters: z.object({
            sector: z.string().describe("Nom du secteur à analyser"),
          }),
          execute: async ({ sector }) => {
            const companies = esgDataset.getCompaniesBySector(sector)
            const sectorStats = esgDataset.analyzeSectorPerformance()
            const matchingSector = Object.keys(sectorStats).find((s) => s.toLowerCase().includes(sector.toLowerCase()))

            return {
              success: true,
              sector: matchingSector || sector,
              analysis: {
                companies: companies.length,
                stats: sectorStats[matchingSector] || null,
                companiesList: companies.map((c) => ({
                  nom: c.raison_social,
                  score: c.score_engagement_environnemental,
                  emissions: c.total_emissions_ges,
                  innovations: c.innovations,
                  objectifs_2030: c.objectifs_2030,
                })),
              },
              message: `Analyse complète du secteur ${matchingSector || sector}`,
            }
          },
        }),

        analyzeEmissions: tool({
          description: "Analyser les émissions GES des entreprises",
          parameters: z.object({
            type: z.enum(["lowest", "highest", "by_sector"]).optional().describe("Type d'analyse des émissions"),
          }),
          execute: async ({ type = "lowest" }) => {
            let analysis = {}

            if (type === "by_sector") {
              const sectorStats = esgDataset.analyzeSectorPerformance()
              analysis = {
                bySector: Object.entries(sectorStats)
                  .map(([sector, data]: any) => ({
                    secteur: sector,
                    avgEmissions: data.avgEmissions,
                    companies: data.count,
                    avgScore: data.avgScore,
                  }))
                  .sort((a, b) => a.avgEmissions - b.avgEmissions),
              }
            } else {
              const sortedCompanies = esgDataset.companies.sort((a, b) =>
                type === "lowest"
                  ? a.total_emissions_ges - b.total_emissions_ges
                  : b.total_emissions_ges - a.total_emissions_ges,
              )

              analysis = {
                companies: sortedCompanies.slice(0, 5).map((c) => ({
                  nom: c.raison_social,
                  secteur: c.secteur,
                  emissions: c.total_emissions_ges,
                  score: c.score_engagement_environnemental,
                  innovations: c.innovations,
                })),
              }
            }

            return {
              success: true,
              type,
              analysis,
              message: `Analyse des émissions GES - ${type}`,
            }
          },
        }),

        analyzeParity: tool({
          description: "Analyser la parité hommes-femmes",
          parameters: z.object({
            bySector: z.boolean().optional().describe("Analyser par secteur"),
          }),
          execute: async ({ bySector = true }) => {
            if (bySector) {
              const parityAnalysis = esgDataset.analyzeParityBySector()
              return {
                success: true,
                analysis: {
                  bySector: Object.entries(parityAnalysis)
                    .map(([sector, data]: any) => ({
                      secteur: sector,
                      companies: data.count,
                      avgCadreHommes: data.avgCadreHommes,
                      avgCadreFemmes: data.avgCadreFemmes,
                      parityScore: data.parityScore,
                    }))
                    .sort((a, b) => b.parityScore - a.parityScore),
                },
                message: "Analyse de la parité par secteur d'activité",
              }
            } else {
              const bestParityCompanies = esgDataset.companies
                .sort((a, b) => {
                  const diffA = Math.abs(a.pourcentage_cadre_hommes - a.pourcentage_cadre_femmes)
                  const diffB = Math.abs(b.pourcentage_cadre_hommes - b.pourcentage_cadre_femmes)
                  return diffA - diffB
                })
                .slice(0, 5)

              return {
                success: true,
                analysis: {
                  bestParityCompanies: bestParityCompanies.map((c) => ({
                    nom: c.raison_social,
                    secteur: c.secteur,
                    cadreHommes: c.pourcentage_cadre_hommes,
                    cadreFemmes: c.pourcentage_cadre_femmes,
                    difference: Math.abs(c.pourcentage_cadre_hommes - c.pourcentage_cadre_femmes),
                  })),
                },
                message: "Entreprises avec la meilleure parité hommes-femmes",
              }
            }
          },
        }),
      },

      system: `Tu es un assistant IA expert en analyse ESG (Environnementale, Sociale et de Gouvernance) pour entreprises françaises.

🎯 **MISSION**
Fournir des analyses ESG claires, précises et actionables basées sur un dataset de ${esgDataset.companies.length} entreprises françaises.

📊 **STYLE DE RÉPONSE**
- **Format Markdown** avec titres, listes et émojis
- **Données chiffrées** précises et contextualisées
- **Analyses comparatives** entre entreprises/secteurs
- **Recommandations actionables**
- **Ton professionnel** mais accessible

🔍 **CAPACITÉS**
✅ Recherche d'entreprises multi-critères
✅ Classements et top performers
✅ Analyses sectorielles approfondies
✅ Évaluation des émissions GES
✅ Analyse de la parité H/F
✅ Suivi des certifications ESG
✅ Identification des innovations

💡 **INSTRUCTIONS**
- Utilise TOUJOURS les outils pour accéder aux données réelles
- Structure tes réponses avec des titres clairs
- Inclus des suggestions de questions complémentaires
- Mets en avant les insights clés avec des émojis
- Propose des analyses croisées pertinentes

Réponds de manière professionnelle et engageante !`,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Erreur API:", error)
    return new Response(JSON.stringify({ error: "Erreur du serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
