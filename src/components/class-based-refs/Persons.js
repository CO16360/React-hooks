import React, { Component } from 'react'
import Person from './Person'

export default class Persons extends Component {
    render() {
const p=["tom","dick","harry"]

        return (
            <div>
               { p.map(pr=> { return <Person name={pr} />})}
                
            </div>
        )
    }
}
