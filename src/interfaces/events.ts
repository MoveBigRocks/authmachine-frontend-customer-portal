export interface EventInterface {
    id: string,
    type: string,
    createdAt: string,
    device: DeviceInterface
}

export interface RecentEventInterface {
    id: string,
    type: string,
    createdAt: string,
    user: {
        id: string,
        username: string
    },
    userIp: string
}

export interface DeviceInterface {
    id: string
    identifier: string,
    type: string,
    name: string,
    operationSystem: string,
    recentEvents: RecentEventInterface[]
}

export interface getEventsData {
    page?: number,
    pageSize?: number,
    eventType?: string,
    dateRange?: string[]
}