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
    name: string
    description?: string
    status?: Status
    items?: Item[]
    tags?: string[]

  }

  export type { Item, Status, Features }