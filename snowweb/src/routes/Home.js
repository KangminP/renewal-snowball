import React from "react"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/react-hooks"

import styled from "styled-components"

import { Container, Row, Col } from "reactstrap"

import main from "../images/main.jpg"
import mainsmall from "../images/mainsmall.png"

import Article from "../components/Article"
import Error from "../components/Error";
import Loading from "../components/Loading";

const MainHeader = styled.div`
    @media only screen and (min-width: 576px) {
        height: 400px;
        width: auto;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    @media only screen and (max-width: 575px) {
        height: 150px;
        width: auto;

        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const MainImage = styled.img`
    height: 75%;
    
    @media only screen and (min-width: 576px) {
        width: 100%;
    }

    @media only screen and (max-width: 575px) {
        display: none;
    }
`

const MainImageSmall = styled.img`
    height: 50%;
    
    @media only screen and (min-width: 576px) {
        display: none;
    }

    @media only screen and (max-width: 575px) {
        width: 80%;
    }
`

const MyCol = styled(Col)`
    margin-bottom: 2.5rem;
`

const GET_ARTICLES = gql`
    {
        articles {
            id
            title
        }
    }
`

function Home() {
    const { loading, error, data } = useQuery(GET_ARTICLES)
    const articles = data?.articles.length !== 0 ? data?.articles : null
    
    if ( loading ) return <Loading />
    if ( error ) return <Error msg={error.message} />;

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <MainHeader>
                            <MainImage src={main} alt="Main Image" />
                            <MainImageSmall src={mainsmall} alt="Main Image" />
                        </MainHeader>
                    </Col>
                </Row>
                <Row xs="1" sm="2" md="3" lg="4">
                    {articles?.map(article => (
                        <MyCol key={article.id}>
                            <Article id={article.id} title={article.title}/>
                        </MyCol>
                    )) ?? "No Article ..."}
                </Row>
            </Container>
        </>
    )
}

export default Home

// export default () => {
//     const { loading, data } = useQuery(GET_ARTICLES)
//     // console.log(data)
//     if (loading) {
//         return (
//             <h1>loading</h1>
//         )
//     }
//     if (!loading && data.articles) {
//         const articlelist = data.articles.map(article => 
//             <Article key={article.id} id={article.id} title={article.title} />
//         )
//         return <>{articlelist}</>
//     }
// }