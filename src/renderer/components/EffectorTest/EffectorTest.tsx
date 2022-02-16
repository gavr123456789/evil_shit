import { Button, Space } from 'antd'
import {createStore, createEvent, createEffect} from 'effector'
import { useStore } from 'effector-react'
import { FC } from 'react'

// const login = createStore('guest')

// const loginSize = login.map((login) => login.length)

// const submitLoginSize = createEvent<number>()

// loginSize.watch((size) => {
//   submitLoginSize(size)
// })

// EFFECTOR
// создал стор
const $counderStore = createStore(0, {name: "counderStore"})

const counterValueChangedEvent = createEvent<number>("counterValueChangedEvent")

$counderStore
  .on(counterValueChangedEvent, (state, value) => {
    return state + value
  })


const $flagStore = createStore(false, {name: "flagStore"})
const $nones = createStore<Note[]>([], {name: "nones"})

// Async Effect
interface Note {
  name: string,
  id: number
}

async function loadNotes(): Promise<Note[]>{
  return [
    { id: Math.random(), name: "sas" }, { id: Math.random(), name: "sas" }, { id: Math.random(), name: "sas" }
  ];
}

const getNotesEffect = createEffect<void, Note[]>("get notes").use(async () => {
  return await loadNotes();
})



// евент
const invertFlagEvent = createEvent("invertFlagEvent")


// реакции

$nones
  .on(getNotesEffect.done, (old, sas) => [...old, ...sas.result])

$flagStore
  .on(invertFlagEvent, (state) => !state)


// RENDER

export const EffectorTest: FC = () => {
  // подключаем стор
  const input = useStore($counderStore)
  const flagStore = useStore($flagStore)
  const notes = useStore($nones)




  return (<>

    <Button onClick={_ => counterValueChangedEvent(input + 1)} style={{borderColor: flagStore ? "blue" :"red"}} >
      {input}
    </Button>
    <Space>
      {notes.map(x => (<Button>{x.name}</Button>))}
    </Space>
  </>)
}
