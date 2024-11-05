import React from "react"
interface ToggleButton{
    toggleFunction: () => void
    label: string
    check: boolean
}
export const ToggleButton : React.FC<ToggleButton>= (props) => {
    const {
        toggleFunction,
        label,
        check
    } = props
    return(
        <button
            className={`toggleButton ${check ? 'active' : ''}`}
            onClick={toggleFunction}
        >
        {label}
        </button>
    )
}