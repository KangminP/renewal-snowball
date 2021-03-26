import React, { useState } from "react"

import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"
import { useParams } from "react-router-dom"

import styled from "styled-components"

import { Container, Row } from "reactstrap"

import ReactPlayer from "react-player"

import Error from "../components/Error";
import Loading from "../components/Loading";

const VideoBox = styled(Row)`
    display: flex;
    justify-content: center;

    padding: 2rem 0 4rem 0;
`

const BtnBox = styled(Row)`
    display: flex;
    justify-content: center;

    padding-bottom: 3rem;
`

const TabBtn = styled.div`
    width: 15vw;
    height: 50px;
    line-height: 50px;
    border: 2px solid black;
    margin: 0 1rem 0 1rem;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;

    &:before {
        content: "";
        width: 100%;
        height: 100%;
        background-color: black;
        position: absolute;
        transition: all 0.3s ease;

        top: 0;
        left: -16vw;
    }

    &:hover:before {
        left: 0;
    }
`

const TabP = styled.div`
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: 2vmin;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
    margin: 0;

    &:hover {
        color: #ffff;
    }
`

const ContentBox = styled.div`
    overflow-y: scroll;
    height: 500px;
    margin-bottom: 4rem;

    &::-webkit-scrollbar {
        width: 12px;
        background: #ffffff;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3.5px;
        background-color: #ced4da;
    
        &:hover {
        background-color: #adb5bd;
        }
    }
    &::-webkit-scrollbar-track {
        background: #ffffff;
    }
`

const ContentLine = styled.div`
    text-align: center;
    margin-bottom: 1rem;
`

const ContentEng = styled.div`
    text-align: center;
    font-weight: bold;
`

const ContentKor = styled.div`
    text-align: center;
    margin-bottom: 1rem;
`

const content = [
    {
        "tab": "MIX",
    },
    {
        "tab": "ENG",
    },
    {
        "tab": "KOR",
    }
]

const useTabs = (initilTabs, allTabs) => {
    const [contentIdx, setContentIdx] = useState(initilTabs)
    return {
        contentItem: allTabs[contentIdx],
        contentChange: setContentIdx
    }
}

const GET_ARTICLE = gql`
    query getArticle($id: Int!) {
        article(id: $id) {
            id
            title
            video_url
            script
        }
    }
`

function Detail() {
    const { contentItem, contentChange } = useTabs(0, content);

    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_ARTICLE, {
        variables: { id: Number(id) }
    })

    if ( loading ) return <Loading />
    if ( error ) return <Error msg={error.message} />

    const script = data.article.script
    const temp_script = script.split(" / ");
    // console.log(temp_script)

    const original_ver = []
    const korean_ver = []
    for (let i=0; i<temp_script.length; i++){
        if ( i % 2 === 0) {
            original_ver.push(temp_script[i])
        } else {
            korean_ver.push(temp_script[i])
        }
    }
    // console.log(original_ver)
    // console.log(korean_ver)

    const mix = temp_script.map((senten, idx) => {
        if ( idx % 2 === 0 ) {
            return (
                <ContentEng key={idx}>{senten}</ContentEng>
            )
        } else {
            return (
                <ContentKor key={idx}>{senten}</ContentKor>
            )
        }
    })

    const original = original_ver.map((senten, idx) => (
        <ContentLine key={idx}>{senten}</ContentLine>
    ))

    const korean = korean_ver.map((senten, idx) => (
        <ContentLine key={idx}>{senten}</ContentLine>
    ))

    // for (let i=0; i<content.length; i++){
    //     if ( content[i].tab === "Together" ) {
    //         content[i]['content'] = mix
    //     } else if ( content[i].tab === "English") {
    //         content[i]['content'] = original
    //     } else if ( content[i].tab === "Korean") {
    //         content[i]['content'] = korean
    //     }
    // }
    content[0]['content'] = mix
    content[1]['content'] = original
    content[2]['content'] = korean

    return (
        <Container>
            {data?.article ? (
                <>
                    <br />
                    <VideoBox>
                        <ReactPlayer url={`${data.article.video_url}`} controls />
                    </VideoBox>
                    <BtnBox>
                    {content.map((section, idx) => (
                        <TabBtn key={idx} onClick={() => contentChange(idx)}>
                            <TabP key={idx}>{section.tab}</TabP>
                        </TabBtn>
                    ))}
                    </BtnBox>
                    <ContentBox>
                        {contentItem.content}
                    </ContentBox>
                    {/* <div>
                        {mix}
                    </div>
                    <div>
                        {original}
                    </div>
                    <div>
                        {korean}
                    </div> */}
                </>
            ) : (
                "No Detail ..."
            )}
        </Container>
    )
}

export default Detail

// export default () => {
//     const { id } = useParams()
//     const { loading, data } = useQuery(GET_ARTICLE, {
//         variables: { id: +id }
//     })
//     // console.log(data)

//     if (loading) {
//         return (
//             <h1>loading</h1>
//         )
//     }
//     if (!loading && data.article) {
//         return (
//             <div>
//                 <h1>{data.article.video_url}</h1>    
//                 <h1>{data.article.title}</h1>
//                 <p>{data.article.script}</p>
//             </div>
//         )
//     }
// }