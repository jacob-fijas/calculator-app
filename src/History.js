import React from 'react'

const History = ({ history }) => (
    <div>
        {history.map((line, i) => (
            <div style={{ opacity: getOpacity(i) }}>
                {line}
            </div>
        ))}
    </div>
)

const getOpacity = (i) => {
    switch (i) {
        default:
        case 0:
            return 1
        case 1:
            return .8
        case 2:
            return .75
        case 3:
            return .7
        case 4:
            return .65
        case 5:
            return .6
        case 6:
            return .55
        case 7:
            return .5
        case 8:
            return .45
        case 9:
            return .4
    }
}

export default History