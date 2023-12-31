import { useState } from 'react'
import './App.css'

enum ListItemStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

enum ListItemFeatures {
  STATUS = 'STATUS',
  REPEAT = 'REPEAT',
  REMIND = 'REMIND',
}

interface ListItem {
  name: string
  description: string
  status: ListItemStatus
  items?: ListItem[]

}

interface List {
  name: string
  description: string
  items?: ListItem[]
}

function ListItem({ name, description, status }: ListItem) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{status}</p>
    </div>
  )
}

function List({ name, description, items }: List) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      {items && items.map((item, itemIndex) => (
        <ListItem
          key={itemIndex}
          name={item.name}
          description={item.description}
          status={item.status}
          items={item.items}
        />
      ))}
    </div>
  )
}

function App() {
  const [lists, setLists] = useState<List[]>([])

  const formSubmit = (e: any) => {
    e.preventDefault()
    const newList: List = {
      name: e.target.name.value,
      description: e.target.description.value,
    }
    setLists([...lists, newList])
  }

  const removeList = (index: number) => {
    const newLists = [...lists]
    newLists.splice(index, 1)
    setLists(newLists)
  }


  return (
    <div>
      <h1>Journey</h1>
      <div style={{display: 'flex'}}>
        <form onSubmit={formSubmit}>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="description" placeholder="Description" />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="lists">
          {lists.map((list, listIndex) => (
            <List
              key={listIndex}
              name={list.name}
              description={list.description}
              items={list.items}
            />
          ))}
        </div>
    </div>
  )
}

export default App
