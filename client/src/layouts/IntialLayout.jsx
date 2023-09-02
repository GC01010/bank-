import React from 'react'
import Header from '../components/Header'


const IntialLayout = ({children}) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default IntialLayout;