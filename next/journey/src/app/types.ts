enum Status {
  backlog = "Backlog",
  upcoming = "Upcoming",
  inProgress = "In Progress",
  cancelled = "Cancelled",
  completed = "Completed",
}

  enum Features {
    STATUS = 'STATUS',
    REPEAT = 'REPEAT',
    REMIND = 'REMIND',
  }

  interface Item {
    id: string
    name: string
    description?: string
    status?: Status
    items?: Item[]
    tags?: string[]
    date?: Date | null
  }

  interface Tag {
    id: string
    name: string
  }

  export type { Item, Features, Tag }
  export { Status }