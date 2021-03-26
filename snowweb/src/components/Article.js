import React from "react"

import { Link } from "react-router-dom"

import styled from "styled-components"

const TempThumb = styled(Link)`
    width: auto;
    display: flex;
    justify-content: center;
    align-itmes: center;
`

const ThumbImage = styled.img` 
    @media only screen and (min-width: 576px) {
        height: 130px;
        width: 100%;
    }

    @media only screen and (max-width: 575px) {
        height: 210px;
        width: 80%;
    }
`

const TempTitle = styled.div`
    text-align: center;
`

const Title = styled.div`
    font-size: 1.3rem;
`

function Article({id, title}) {
    return (
        <>
            <TempThumb to={`/article/${id}`}>
                <ThumbImage src={require(`../images/thumbnail/${id}.jpg`).default} alt={`${id}`}/>
            </TempThumb>
            <TempTitle>
                <Title>
                    {title}
                </Title>
            </TempTitle>
        </>
    )
}

export default Article

// export default ({id, title}) => {
//     return (
//         <>
//             <TempThumb to={`/article/${id}`}>
//                 <ThumbImage src={require(`../images/thumbnail/${id}.jpg`).default} alt={`${id}`}/>
//             </TempThumb>
//             <TempTitle>
//                 <Title>
//                     {title}
//                 </Title>
//             </TempTitle>
//         </>
//     )
// }