import React, { useState } from 'react'
import createRecord from '../../helpers/airtable'
import { Button, Form } from './elements'

export default ({ onSubmit, city }) => {
  const [plus, setPlus] = useState(false)
  const [plusOneName, setPlusOneName] = useState('')
  const [name, setName] = useState('')
  const [gh, setGH] = useState('')

  const createUser = () => {
    if (name && gh) {
      if (plus && !plusOneName) return

      createRecord({
        city: city,
        name: name,
        ghLink: gh
      })

      if (plus) {
        createRecord({
          city: city,
          name: plusOneName,
          ghLink: 'queerjs'
        })
      }
    }
  }

  return (
    <Form
      onSubmit={e => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <label htmlFor="name">
        Name
        <input
          required
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label htmlFor="gh">
        Github Username
        <input
          required
          id="gh"
          type="text"
          value={gh}
          onChange={e => setGH(e.target.value.trim())}
        />
      </label>
      <label
        htmlFor="plus-one"
        css={`
          display: flex;
        `}
      >
        <input
          id="plus-one"
          type="checkbox"
          value={plus}
          css={`
            width: auto !important;
            margin-right: 12px !important;
          `}
          onChange={e => setPlus(e.target.checked)}
        />
        <span>I am taking a plus one</span>
      </label>
      {plus && (
        <label htmlFor="plus-one-name">
          +1 Name
          <input
            required
            id="plus-one-name"
            type="text"
            value={plusOneName}
            onChange={e => setPlusOneName(e.target.value.trim())}
          />
        </label>
      )}

      <Button onClick={createUser}>I AM IN 🎉</Button>
    </Form>
  )
}
