import { useParams } from "react-router-dom"
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import MiembrosUpdateBody from "./miembros-update-body";
import TableItemMiembros from './table-item-miembros'

export default function MiembrosUpdate() {

  const { id } = useParams()
  const [miembro, setMiembro] = useState(null)

  const token = JSON.parse(localStorage.getItem('userDetails'))

  async function getMiembroById(id) {
    const { data } = await axios.get(`http://localhost:3000/api/v1/secretario/miembros/get-miembro/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token.idToken
      },
    })

    return data
  }

  useEffect(() => {
    getMiembroById(id)
      .then((data) => {
        setMiembro(data);
      })
  }, [])


  if (miembro !== null) return (
    <MiembrosUpdateBody miembro={miembro} />
  )

  return null
}
