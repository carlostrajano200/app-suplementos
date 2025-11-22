"use client"

import { useState } from "react"
import { Camera, Home, List, Calendar, BarChart3, Sparkles, ChevronRight, Check, X, Plus, Clock, TrendingUp, Award, AlertTriangle, Star, Pill, Dumbbell, Brain, Shield, Zap, Apple } from "lucide-react"

// Tipos
type Screen = "questionnaire" | "dashboard" | "camera" | "list" | "detail" | "schedule" | "history"

type Supplement = {
  id: string
  name: string
  category: string
  image: string
  benefits: string[]
  risks: string[]
  dosage: string
  timing: string
  trustScore: number
  composition: string[]
}

// Dados mockados
const supplements: Supplement[] = [
  {
    id: "1",
    name: "Whey Protein Isolado",
    category: "performance",
    image: "💪",
    benefits: ["Ganho de massa muscular", "Recuperação pós-treino", "Saciedade prolongada"],
    risks: ["Pode causar desconforto em intolerantes à lactose", "Excesso pode sobrecarregar rins"],
    dosage: "25-30g por dose",
    timing: "Pós-treino ou café da manhã",
    trustScore: 95,
    composition: ["Proteína isolada do soro do leite", "BCAAs", "Glutamina"]
  },
  {
    id: "2",
    name: "Creatina Monohidratada",
    category: "performance",
    image: "⚡",
    benefits: ["Aumento de força", "Ganho de massa magra", "Melhora performance anaeróbica"],
    risks: ["Retenção hídrica leve", "Evitar em casos de problemas renais"],
    dosage: "3-5g por dia",
    timing: "Qualquer horário (consistência é chave)",
    trustScore: 98,
    composition: ["Creatina monohidratada pura"]
  },
  {
    id: "3",
    name: "Vitamina D3",
    category: "imunidade",
    image: "☀️",
    benefits: ["Fortalece sistema imunológico", "Saúde óssea", "Melhora humor"],
    risks: ["Excesso pode causar hipercalcemia", "Consultar médico para dosagem"],
    dosage: "2000-5000 UI por dia",
    timing: "Manhã com refeição gordurosa",
    trustScore: 92,
    composition: ["Colecalciferol", "Óleo vegetal"]
  },
  {
    id: "4",
    name: "Ômega 3 (EPA/DHA)",
    category: "imunidade",
    image: "🐟",
    benefits: ["Saúde cardiovascular", "Anti-inflamatório", "Função cerebral"],
    risks: ["Pode aumentar sangramento em altas doses", "Verificar origem (metais pesados)"],
    dosage: "1-3g por dia",
    timing: "Com refeições",
    trustScore: 90,
    composition: ["EPA", "DHA", "Óleo de peixe"]
  },
  {
    id: "5",
    name: "Cafeína + L-Teanina",
    category: "foco",
    image: "🧠",
    benefits: ["Foco mental", "Energia sem nervosismo", "Melhora cognitiva"],
    risks: ["Insônia se tomado tarde", "Dependência com uso excessivo"],
    dosage: "100mg cafeína + 200mg L-teanina",
    timing: "Manhã ou pré-treino",
    trustScore: 88,
    composition: ["Cafeína anidra", "L-teanina"]
  },
  {
    id: "6",
    name: "Magnésio Dimalato",
    category: "minerais",
    image: "💎",
    benefits: ["Relaxamento muscular", "Melhora sono", "Energia celular"],
    risks: ["Excesso pode causar diarreia", "Interação com alguns medicamentos"],
    dosage: "300-400mg por dia",
    timing: "Noite antes de dormir",
    trustScore: 91,
    composition: ["Magnésio dimalato", "Ácido málico"]
  }
]

const categories = [
  { id: "performance", name: "Performance", icon: Dumbbell, color: "from-purple-500 to-pink-500" },
  { id: "foco", name: "Foco", icon: Brain, color: "from-blue-500 to-cyan-500" },
  { id: "imunidade", name: "Imunidade", icon: Shield, color: "from-green-500 to-emerald-500" },
  { id: "minerais", name: "Minerais", icon: Zap, color: "from-yellow-500 to-orange-500" },
  { id: "vitaminas", name: "Vitaminas", icon: Apple, color: "from-red-500 to-pink-500" }
]

export default function SupplementsDay() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("questionnaire")
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null)
  const [userGoals, setUserGoals] = useState<string[]>([])
  const [mySupplements, setMySupplements] = useState<string[]>([])

  // Componente: Questionário Inicial
  const Questionnaire = () => {
    const goals = [
      { id: "muscle", label: "Ganho de massa muscular", icon: Dumbbell },
      { id: "focus", label: "Melhorar foco e concentração", icon: Brain },
      { id: "immunity", label: "Fortalecer imunidade", icon: Shield },
      { id: "energy", label: "Aumentar energia", icon: Zap },
      { id: "recovery", label: "Recuperação pós-treino", icon: TrendingUp }
    ]

    const toggleGoal = (goalId: string) => {
      setUserGoals(prev => 
        prev.includes(goalId) ? prev.filter(g => g !== goalId) : [...prev, goalId]
      )
    }

    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8 animate-fadeIn">
          {/* Logo e Título */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl premium-gradient neon-glow">
              <Pill className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SupplementsDay
            </h1>
            <p className="text-gray-400 text-lg">Seu assistente inteligente de suplementação</p>
          </div>

          {/* Questionário */}
          <div className="glass-effect rounded-3xl p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Quais são seus objetivos?</h2>
              <p className="text-gray-400">Selecione um ou mais objetivos para personalizar sua experiência</p>
            </div>

            <div className="grid gap-4">
              {goals.map((goal) => {
                const Icon = goal.icon
                const isSelected = userGoals.includes(goal.id)
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 smooth-transition ${
                      isSelected 
                        ? "border-purple-500 bg-purple-500/10" 
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${isSelected ? "bg-purple-500" : "bg-gray-700"}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="flex-1 text-left text-white font-medium">{goal.label}</span>
                    {isSelected && <Check className="w-6 h-6 text-purple-400" />}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setCurrentScreen("dashboard")}
              disabled={userGoals.length === 0}
              className="w-full premium-gradient text-white font-bold py-4 rounded-xl hover:opacity-90 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Começar jornada
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Componente: Dashboard
  const Dashboard = () => {
    const todaySupplements = supplements.filter(s => mySupplements.includes(s.id))
    const completedToday = 3
    const totalToday = todaySupplements.length || 5

    return (
      <div className="min-h-screen bg-[#0a0a0a] pb-24">
        {/* Header */}
        <div className="bg-gradient-to-b from-gray-900 to-[#0a0a0a] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">Hoje, {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}</p>
            </div>
            <button className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700 smooth-transition">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </button>
          </div>

          {/* Progresso Diário */}
          <div className="glass-effect rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Progresso de Hoje</h3>
              <span className="text-2xl font-bold text-purple-400">{completedToday}/{totalToday}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="premium-gradient h-3 rounded-full smooth-transition"
                style={{ width: `${(completedToday / totalToday) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">Você está indo muito bem! Continue assim.</p>
          </div>
        </div>

        {/* Próximos Suplementos */}
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">Próximos Suplementos</h2>
          
          {todaySupplements.length > 0 ? (
            <div className="space-y-3">
              {todaySupplements.map((supp) => (
                <div key={supp.id} className="glass-effect rounded-xl p-4 flex items-center gap-4">
                  <div className="text-4xl">{supp.image}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{supp.name}</h4>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {supp.timing}
                    </p>
                  </div>
                  <button className="p-2 rounded-lg bg-purple-500 hover:bg-purple-600 smooth-transition">
                    <Check className="w-5 h-5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-effect rounded-xl p-8 text-center space-y-3">
              <Pill className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-gray-400">Nenhum suplemento adicionado ainda</p>
              <button 
                onClick={() => setCurrentScreen("list")}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Explorar suplementos
              </button>
            </div>
          )}
        </div>

        {/* Recomendações IA */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Recomendações IA</h2>
          </div>
          
          <div className="glass-effect rounded-xl p-6 space-y-3">
            <div className="flex items-start gap-3">
              <Award className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-1">Baseado nos seus objetivos</h4>
                <p className="text-sm text-gray-400">
                  Considerando seu foco em performance, recomendamos adicionar Creatina e Whey Protein à sua rotina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Componente: Câmera Inteligente
  const CameraScreen = () => {
    const [scanned, setScanned] = useState(false)
    const scannedProduct = supplements[0]

    return (
      <div className="min-h-screen bg-[#0a0a0a] pb-24">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Câmera Inteligente</h1>
            <button className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Área da Câmera */}
          <div className="relative aspect-[3/4] bg-gray-900 rounded-3xl overflow-hidden border-2 border-gray-800">
            {!scanned ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                <div className="w-64 h-64 border-4 border-purple-500 rounded-3xl animate-pulse" />
                <div className="text-center space-y-2">
                  <p className="text-white font-semibold">Posicione a embalagem</p>
                  <p className="text-gray-400 text-sm">Centralize o rótulo na área destacada</p>
                </div>
                <button
                  onClick={() => setScanned(true)}
                  className="premium-gradient px-8 py-3 rounded-xl text-white font-semibold hover:opacity-90 smooth-transition"
                >
                  Escanear
                </button>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] flex items-end p-6">
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">Produto reconhecido!</span>
                  </div>
                  
                  <div className="glass-effect rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{scannedProduct.image}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{scannedProduct.name}</h3>
                        <p className="text-sm text-gray-400">{scannedProduct.category}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-semibold">{scannedProduct.trustScore}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-300">{scannedProduct.benefits[0]}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-300">{scannedProduct.risks[0]}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedSupplement(scannedProduct)
                        setCurrentScreen("detail")
                      }}
                      className="w-full premium-gradient text-white font-semibold py-3 rounded-xl hover:opacity-90 smooth-transition"
                    >
                      Ver detalhes completos
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Componente: Lista de Suplementos
  const SupplementList = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    
    const filteredSupplements = selectedCategory
      ? supplements.filter(s => s.category === selectedCategory)
      : supplements

    return (
      <div className="min-h-screen bg-[#0a0a0a] pb-24">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-white">Explorar Suplementos</h1>

          {/* Categorias */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap smooth-transition ${
                selectedCategory === null
                  ? "premium-gradient text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap smooth-transition ${
                    selectedCategory === cat.id
                      ? "premium-gradient text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              )
            })}
          </div>

          {/* Grid de Suplementos */}
          <div className="grid gap-4">
            {filteredSupplements.map((supp) => (
              <button
                key={supp.id}
                onClick={() => {
                  setSelectedSupplement(supp)
                  setCurrentScreen("detail")
                }}
                className="glass-effect rounded-2xl p-4 text-left hover:border-purple-500 border-2 border-transparent smooth-transition"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{supp.image}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-white">{supp.name}</h3>
                      <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-400">{supp.trustScore}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-400">{supp.benefits[0]}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-400">{supp.risks[0]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{supp.timing}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Componente: Detalhes do Suplemento
  const SupplementDetail = () => {
    if (!selectedSupplement) return null

    const isAdded = mySupplements.includes(selectedSupplement.id)

    return (
      <div className="min-h-screen bg-[#0a0a0a] pb-24">
        <div className="relative">
          {/* Header com gradiente */}
          <div className="bg-gradient-to-b from-purple-900/50 to-[#0a0a0a] p-6 space-y-6">
            <button
              onClick={() => setCurrentScreen("list")}
              className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700 smooth-transition"
            >
              <ChevronRight className="w-5 h-5 text-white rotate-180" />
            </button>

            <div className="text-center space-y-4">
              <div className="text-7xl">{selectedSupplement.image}</div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{selectedSupplement.name}</h1>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-yellow-400">{selectedSupplement.trustScore}</span>
                  </div>
                  <span className="text-gray-400">Confiabilidade IA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 space-y-6">
            {/* Composição */}
            <div className="glass-effect rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Pill className="w-5 h-5 text-purple-400" />
                Composição
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedSupplement.composition.map((comp, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-300">
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefícios */}
            <div className="glass-effect rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                Benefícios
              </h3>
              <ul className="space-y-2">
                {selectedSupplement.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Riscos */}
            <div className="glass-effect rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Contraindicações e Riscos
              </h3>
              <ul className="space-y-2">
                {selectedSupplement.risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recomendações */}
            <div className="glass-effect rounded-2xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Recomendações de Uso
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Dosagem</span>
                  <span className="text-white font-semibold">{selectedSupplement.dosage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Melhor horário</span>
                  <span className="text-white font-semibold">{selectedSupplement.timing}</span>
                </div>
              </div>
            </div>

            {/* Botão de Ação */}
            <button
              onClick={() => {
                if (isAdded) {
                  setMySupplements(prev => prev.filter(id => id !== selectedSupplement.id))
                } else {
                  setMySupplements(prev => [...prev, selectedSupplement.id])
                }
              }}
              className={`w-full font-bold py-4 rounded-xl smooth-transition flex items-center justify-center gap-2 ${
                isAdded
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "premium-gradient text-white hover:opacity-90"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  Adicionado ao plano
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Adicionar ao meu plano
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Componente: Agenda
  const ScheduleScreen = () => {
    const schedule = [
      { time: "08:00", supplements: ["Vitamina D3", "Ômega 3"], completed: true },
      { time: "12:00", supplements: ["Whey Protein"], completed: true },
      { time: "16:00", supplements: ["Creatina"], completed: false },
      { time: "22:00", supplements: ["Magnésio"], completed: false }
    ]

    return (
      <div className="min-h-screen bg-[#0a0a0a] pb-24">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Agenda</h1>
            <button className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 smooth-transition">
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {schedule.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                    item.completed ? "bg-purple-500 text-white" : "bg-gray-800 text-gray-400"
                  }`}>
                    {item.time.split(':')[0]}h
                  </div>
                  {idx < schedule.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-800 my-2" />
                  )}
                </div>

                <div className="flex-1 pb-6">
                  <div className={`glass-effect rounded-xl p-4 space-y-2 ${
                    item.completed ? "border-2 border-purple-500/30" : ""
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{item.time}</span>
                      {item.completed && (
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Concluído
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {item.supplements.map((supp, i) => (
                        <p key={i} className="text-white font-medium">{supp}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Componente: Histórico
  const HistoryScreen = () => {
    const stats = [
      { label: "Dias consecutivos", value: "12", icon: TrendingUp, color: "text-green-400" },
      { label: "Taxa de adesão", value: "87%", icon: Award, color: "text-purple-400" },
      { label: "Suplementos ativos", value: mySupplements.length.toString(), icon: Pill, color: "text-blue-400" }
    ]

    return (
      <div className="min-h-screen bg-[#0a0a0a] pb-24">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-white">Histórico & Estatísticas</h1>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="glass-effect rounded-xl p-4 text-center space-y-2">
                  <Icon className={`w-6 h-6 ${stat.color} mx-auto`} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Gráfico Semanal */}
          <div className="glass-effect rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Última Semana</h3>
            <div className="flex items-end justify-between gap-2 h-32">
              {[65, 80, 90, 75, 95, 85, 70].map((height, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-800 rounded-t-lg relative overflow-hidden" style={{ height: `${height}%` }}>
                    <div className="absolute inset-0 premium-gradient opacity-80" />
                  </div>
                  <span className="text-xs text-gray-500">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Histórico Recente */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Atividade Recente</h3>
            {[
              { date: "Hoje", action: "Tomou 3 de 5 suplementos", time: "16:30" },
              { date: "Ontem", action: "Completou todos os suplementos", time: "22:00" },
              { date: "2 dias atrás", action: "Adicionou Creatina ao plano", time: "14:15" }
            ].map((item, idx) => (
              <div key={idx} className="glass-effect rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{item.action}</p>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Navegação Bottom
  const BottomNav = () => {
    const navItems = [
      { id: "dashboard", icon: Home, label: "Início" },
      { id: "list", icon: List, label: "Explorar" },
      { id: "camera", icon: Camera, label: "Scan" },
      { id: "schedule", icon: Calendar, label: "Agenda" },
      { id: "history", icon: BarChart3, label: "Stats" }
    ]

    return (
      <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-gray-800 p-4 safe-area-bottom">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentScreen === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id as Screen)}
                className="flex flex-col items-center gap-1 smooth-transition"
              >
                <div className={`p-2 rounded-xl ${isActive ? "premium-gradient" : "hover:bg-gray-800"}`}>
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                </div>
                <span className={`text-xs ${isActive ? "text-white font-semibold" : "text-gray-500"}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Renderização condicional
  return (
    <div className="font-inter">
      {currentScreen === "questionnaire" && <Questionnaire />}
      {currentScreen === "dashboard" && <Dashboard />}
      {currentScreen === "camera" && <CameraScreen />}
      {currentScreen === "list" && <SupplementList />}
      {currentScreen === "detail" && <SupplementDetail />}
      {currentScreen === "schedule" && <ScheduleScreen />}
      {currentScreen === "history" && <HistoryScreen />}

      {currentScreen !== "questionnaire" && <BottomNav />}
    </div>
  )
}
