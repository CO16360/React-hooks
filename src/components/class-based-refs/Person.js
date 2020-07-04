import React, { Component, createRef } from 'react'
//*********TO DO----> LAST PERSON SHOULD AUTOMATICALLY RECEIVE FOCUS******************* */
export default class Person extends Component {

    constructor(props) {
        super(props)
        this.inputElementRef = React.createRef()   //16.3 or above  (METHOD-3)
    }

    componentDidMount() {
        //               METHOD-1
        //using regular dom selector  // not optimal
        // document.querySelector('input').focus();  // focus on first input
        //                METHOD-2
        //  this.inputElement.focus(); // works only in class based

        //                 METHOD-3  USING HOOKS
        this.inputElementRef.current.focus()     // current---> ref of current element
    }



    render() {


        return (
            <div style={{ padding: "20px", border: "2px solid grey" }}>

                {/* on any element we can add ref property */}
                <input
                    placeholder="enter here"

                    //            METHOD-2
                    // ref={(inputEl)=>{ this.inputElement=inputEl}}  // arument to function is reference to element we place it on
                    ref={this.inputElementRef}
                />



            </div>
        )
    }
}
