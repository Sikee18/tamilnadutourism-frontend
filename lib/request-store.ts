export type RequestStatus = "pending" | "quoted" | "counter-requested" | "accepted" | "declined" | "deposit-paid"

export interface PlaceRequest {
  id: string
  touristName: string
  touristId: string
  placeName: string
  preferredDate: string
  preferredTime: string
  groupSize: number
  touristMessage: string
  status: RequestStatus
  createdAt: string
  // Guide response fields
  guideName?: string
  guideId?: string
  quotedPrice?: number
  guideMessage?: string
  confirmedDate?: string
  confirmedTime?: string
  // Counter-offer fields
  counterPrice?: number
  counterMessage?: string
  counterUsed?: boolean
  // Final booking fields
  finalPrice?: number
  depositAmount?: number
  depositPaid?: boolean
}

// In-memory store (localStorage in browser)
export const RequestStore = {
  // Tourist functions
  createRequest: (request: Omit<PlaceRequest, "id" | "status" | "createdAt">): PlaceRequest => {
    const newRequest: PlaceRequest = {
      ...request,
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      counterUsed: false,
    }

    const requests = RequestStore.getAllRequests()
    requests.push(newRequest)
    localStorage.setItem("placeRequests", JSON.stringify(requests))

    return newRequest
  },

  // Get all requests
  getAllRequests: (): PlaceRequest[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem("placeRequests")
    return data ? JSON.parse(data) : []
  },

  // Get requests for a specific tourist
  getTouristRequests: (touristId: string): PlaceRequest[] => {
    return RequestStore.getAllRequests().filter((req) => req.touristId === touristId)
  },

  // Get pending requests for guide (all pending requests)
  getPendingRequests: (): PlaceRequest[] => {
    return RequestStore.getAllRequests().filter((req) => req.status === "pending" || req.status === "counter-requested")
  },

  // Get guide's accepted requests
  getGuideAcceptedRequests: (guideId: string): PlaceRequest[] => {
    return RequestStore.getAllRequests().filter((req) => req.guideId === guideId && req.status === "accepted")
  },

  // Update request
  updateRequest: (requestId: string, updates: Partial<PlaceRequest>): PlaceRequest | null => {
    const requests = RequestStore.getAllRequests()
    const index = requests.findIndex((req) => req.id === requestId)

    if (index === -1) return null

    requests[index] = { ...requests[index], ...updates }
    localStorage.setItem("placeRequests", JSON.stringify(requests))

    return requests[index]
  },

  // Guide sends quote
  sendQuote: (
    requestId: string,
    guideId: string,
    guideName: string,
    quotedPrice: number,
    confirmedDate: string,
    confirmedTime: string,
    guideMessage?: string,
  ): PlaceRequest | null => {
    return RequestStore.updateRequest(requestId, {
      status: "quoted",
      guideId,
      guideName,
      quotedPrice,
      confirmedDate,
      confirmedTime,
      guideMessage,
    })
  },

  // Guide declines request
  declineRequest: (requestId: string, guideId: string, guideName: string): PlaceRequest | null => {
    return RequestStore.updateRequest(requestId, {
      status: "declined",
      guideId,
      guideName,
    })
  },

  // Tourist sends counter-offer
  sendCounterOffer: (requestId: string, counterPrice: number, counterMessage: string): PlaceRequest | null => {
    return RequestStore.updateRequest(requestId, {
      status: "counter-requested",
      counterPrice,
      counterMessage,
      counterUsed: true,
    })
  },

  // Tourist accepts quote
  acceptQuote: (requestId: string): PlaceRequest | null => {
    const request = RequestStore.getAllRequests().find((req) => req.id === requestId)
    if (!request || !request.quotedPrice) return null

    return RequestStore.updateRequest(requestId, {
      status: "accepted",
      finalPrice: request.quotedPrice,
    })
  },

  // Tourist declines quote
  declineQuote: (requestId: string): PlaceRequest | null => {
    return RequestStore.updateRequest(requestId, {
      status: "declined",
    })
  },

  // Guide accepts counter-offer
  acceptCounterOffer: (requestId: string): PlaceRequest | null => {
    const request = RequestStore.getAllRequests().find((req) => req.id === requestId)
    if (!request || !request.counterPrice) return null

    return RequestStore.updateRequest(requestId, {
      status: "accepted",
      finalPrice: request.counterPrice,
      quotedPrice: request.counterPrice,
    })
  },

  // Guide rejects counter-offer (keeps original price)
  rejectCounterOffer: (requestId: string): PlaceRequest | null => {
    const request = RequestStore.getAllRequests().find((req) => req.id === requestId)
    if (!request || !request.quotedPrice) return null

    return RequestStore.updateRequest(requestId, {
      status: "accepted",
      finalPrice: request.quotedPrice,
    })
  },

  // Tourist pays deposit
  payDeposit: (requestId: string): PlaceRequest | null => {
    const request = RequestStore.getAllRequests().find((req) => req.id === requestId)
    if (!request || !request.finalPrice) return null

    const depositAmount = Math.round(request.finalPrice * 0.15) // 15% deposit

    return RequestStore.updateRequest(requestId, {
      status: "deposit-paid",
      depositPaid: true,
      depositAmount,
    })
  },
}
