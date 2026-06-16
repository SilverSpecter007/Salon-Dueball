export type BikeType = 'road' | 'gravel' | 'mtb' | 'urban' | 'ebike'

export type ComponentCategory =
  | 'drivetrain'
  | 'brakes'
  | 'wheels'
  | 'tires'
  | 'suspension'
  | 'cockpit'
  | 'frame'
  | 'other'

export type ServiceType = 'maintenance' | 'repair' | 'upgrade' | 'inspection'

export type WearStatus = 'good' | 'warning' | 'critical' | 'overdue'

export type Component = {
  id: string
  bikeId: string
  name: string
  category: ComponentCategory
  brand?: string
  model?: string
  installedAt: string
  installedAtKm: number
  maxLifespanKm: number
  maxLifespanMonths: number
  notes?: string
}

export type Setup = {
  id: string
  bikeId: string
  name: string
  saddleHeight: number
  saddleSetback: number
  handlebarDrop: number
  reach: number
  stemLength: number
  stemAngle: number
  tirePressureFront: number
  tirePressureRear: number
  notes?: string
  createdAt: string
}

export type ServiceEntry = {
  id: string
  bikeId: string
  date: string
  type: ServiceType
  title: string
  description?: string
  componentIds: string[]
  kmAtService: number
  cost?: number
  shop?: string
}

export type Bike = {
  id: string
  name: string
  type: BikeType
  brand?: string
  model?: string
  year?: number
  totalKm: number
  components: Component[]
  setups: Setup[]
  createdAt: string
}

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export type KomootSettings = {
  username: string
  connected: boolean
  lastSyncAt?: string
  autoSync: boolean
}

export type KomootActivity = {
  id: string
  name: string
  date: string
  distanceKm: number
  bikeId?: string
}
