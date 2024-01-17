enum Status {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
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
  }

  interface Tag {
    id: string
    name: string
  }

  export type { Item, Status, Features, Tag }